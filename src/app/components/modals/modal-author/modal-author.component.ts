import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'gp-modal-author',
  templateUrl: './modal-author.component.html',
  styleUrls: ['./modal-author.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalAuthorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
