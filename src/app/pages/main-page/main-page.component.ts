import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BookService} from "@services/book.service";
import {map, Observable, startWith, switchMap, takeUntil} from "rxjs";
import {BookModel} from "@models/book-model";
import {DestroyService} from "@services/destroy.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ModalAuthorComponent} from "@components/modals/modal-author/modal-author.component";

@Component({
  selector: 'gp-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit {

  books$!: Observable<Array<BookModel>>;
  form: FormGroup
  toppings = ['Няшкин', 'Пуськин'];
  langs = ['English', 'Русский', 'Chinese']
  genres = ['Очистить', 'Детектив', 'Роман', 'Фантастика', 'Еще что-то', 'И еще что-то']

  constructor(private bookService: BookService,
              private destroy$: DestroyService,
              private fb: FormBuilder,
              public dialog: MatDialog) {
    this.form = fb.group({
      "name": [""],
      "author": [[]],
      "lang": [[]],
      "genre": [""],
    });
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
  }

  openAuthorModal() {
    this.dialog.open(ModalAuthorComponent)
  }

  openFilmModal() {

  }

}
