import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'gp-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {

}
