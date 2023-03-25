import {Component, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BookService} from "@services/book.service";
import {BookModel} from "@models/book-model";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'gp-modal-create-book',
  templateUrl: './modal-create-book.component.html',
  styleUrls: ['./modal-create-book.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalCreateBookComponent {
  form: FormGroup
  toppings = ['Няшкин', 'Пуськин'];
  langs = ['English', 'Русский', 'Chinese']
  genres = ['Очистить', 'Детектив', 'Роман', 'Фантастика', 'Еще что-то', 'И еще что-то']

  constructor(private fb: FormBuilder,
              private bookService: BookService,
              private dialogRef: MatDialogRef<ModalCreateBookComponent>) {
    this.form = fb.group({
      'name': ['', Validators.required],
      'author': ['', Validators.required],
      'description': ['', Validators.required],
      'genre': ['', Validators.required],
      'pageCount': [0, Validators.required],
      'lang': ['', Validators.required],
    });
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

}
