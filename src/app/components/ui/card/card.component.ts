import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ModalBookComponent} from "@components/modals/modal-book/modal-book.component";

@Component({
  selector: 'gp-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent {

  constructor(public dialog: MatDialog) {

  }

  openModal() {
    this.dialog.open(ModalBookComponent,
      {
        data: {},
        panelClass: 'modal'
      }
    )
  }

}
