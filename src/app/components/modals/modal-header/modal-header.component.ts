import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'gp-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalHeaderComponent  {
  @Input() title!: string;


}
