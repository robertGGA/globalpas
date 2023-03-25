import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {BookModel} from "@models/book-model";
type ModalData = {
  book: BookModel
}
@Component({
  selector: 'gp-modal-book',
  templateUrl: './modal-book.component.html',
  styleUrls: ['./modal-book.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalBookComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ModalData,) { }

  ngOnInit(): void {
    console.log(this.data.book);
  }

}
