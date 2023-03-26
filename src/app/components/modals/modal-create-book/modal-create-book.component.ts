import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BookService} from "@services/book.service";
import {BookModel} from "@models/book-model";
import {MatDialogRef} from "@angular/material/dialog";
import {Observable, takeUntil} from "rxjs";
import {AuthorService} from "@services/author.service";
import {IGenre, ILang} from "@models/filters";
import {AuthorModel} from "@models/author-model";
import {DestroyService} from "@services/destroy.service";

@Component({
  selector: 'gp-modal-create-book',
  templateUrl: './modal-create-book.component.html',
  styleUrls: ['./modal-create-book.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalCreateBookComponent {
  form: FormGroup
  authors$!: Observable<Array<AuthorModel>>
  langs!: Array<ILang>;
  genres!: Array<IGenre>;

  constructor(private fb: FormBuilder,
              private bookService: BookService,
              private authorService: AuthorService,
              private cdr: ChangeDetectorRef,
              private destroy$: DestroyService,
              private dialogRef: MatDialogRef<ModalCreateBookComponent>) {
    this.form = fb.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      description: [''],
      genre: ['', Validators.required],
      pageCount: [0, Validators.required],
      lang: ['', Validators.required],
    });
    this.authors$ =  this.authorService.getAuthors();

    // this.form.hasError()

    this.initForms();
  }

  submit() {
    this.bookService.addBook(this.form.getRawValue() as BookModel).subscribe(value => {
      if (value) {
        this.dialogRef.close();
      } else {
        alert('Произошла ошибка');
      }
    })
  }

  private initForms() {
    this.authorService.getGenres().pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.genres = value;
      this.cdr.markForCheck();
    })

    this.authorService.getLangs().pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.langs = value;
      this.cdr.markForCheck();
    })
  }

}
