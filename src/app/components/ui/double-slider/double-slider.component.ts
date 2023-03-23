import {Component} from '@angular/core';
import {ControlValueAccessor} from "@angular/forms";

@Component({
  selector: 'gp-double-slider',
  templateUrl: './double-slider.component.html',
  styleUrls: ['./double-slider.component.sass']
})
export class DoubleSliderComponent implements ControlValueAccessor {

  constructor() {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
  }


}
