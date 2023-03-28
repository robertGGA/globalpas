import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BookService} from "@services/book.service";
import {map, Observable, startWith, switchMap, takeUntil} from "rxjs";
import {BookModel} from "@models/book-model";
import {DestroyService} from "@services/destroy.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ModalCreateBookComponent} from "@components/modals/modal-create-book/modal-create-book.component";
import {ModalAuthorComponent} from "@components/modals/modal-author/modal-author.component";
import {AuthorService} from "@services/author.service";
import {AuthorModel} from "@models/author-model";
import {IGenre, ILang} from "@models/filters";

@Component({
  selector: 'gp-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit {

  books$!: Observable<Array<BookModel>>;
  form: FormGroup
  authors!: Array<AuthorModel>;
  langs!: Array<ILang>
  genres!: Array<IGenre>

  constructor(private bookService: BookService,
              private authorService: AuthorService,
              private destroy$: DestroyService,
              private fb: FormBuilder,
              public dialog: MatDialog,
              private cdr: ChangeDetectorRef) {
    this.form = fb.group({
      name: [""],
      author: [[]],
      lang: [[]],
      genre: [""],
      from: [0, [Validators.max(10000), Validators.min(0)]],
      to: [10000]
    });

    this.form.controls['to'].setValidators([Validators.max(10000), Validators.min(this.form.getRawValue().from)]);

    this.initForms();
  }

  ngOnInit(): void {
    this.books$ = this.form.valueChanges
      .pipe(takeUntil(this.destroy$),
        startWith(this.form.getRawValue),
        map(value => {
          if (value.genre === 'Очистить') {
            this.form.patchValue({
              ...this.form.value,
              name: this.form.get('name')?.value,
              genre: ''
            }, {emitEvent: false});

            return {
              ...value,
              genre: ''
            }
          }
          return value;
        }),
        switchMap(inputs => this.bookService.getFilteredBooks(inputs))
      );

    this.authorService.getAuthors().pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.authors = value;
      this.cdr.markForCheck();
    })
  }

  initForms() {
    this.authorService.getGenres().pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.genres = value;
      this.genres.unshift({"genre": 'Очистить'});
      this.cdr.markForCheck();
    })

    this.authorService.getLangs().pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.langs = value;
      this.cdr.markForCheck();
    })
  }

  openAuthorModal() {
    this.dialog.open(ModalAuthorComponent)
  }

  openBookModal() {
    this.dialog.open(ModalCreateBookComponent);
  }

}
