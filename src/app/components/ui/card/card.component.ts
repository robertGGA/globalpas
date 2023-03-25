import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ModalBookComponent} from "@components/modals/modal-book/modal-book.component";
import {BookModel} from "@models/book-model";

@Component({
  selector: 'gp-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {

  @Input() book!: BookModel

  constructor(public dialog: MatDialog) {
  }

  openModal() {
    this.dialog.open(ModalBookComponent,
      {
        data: {book: this.book},
        panelClass: 'modal'
      }
    )
  }

}
