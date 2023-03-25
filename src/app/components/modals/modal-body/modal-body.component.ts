import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'gp-modal-body',
  templateUrl: './modal-body.component.html',
  styleUrls: ['./modal-body.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalBodyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
