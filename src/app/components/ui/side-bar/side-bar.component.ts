import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'gp-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.sass']
})
export class SideBarComponent implements OnInit {
  form: FormGroup
  toppings = ['Няшкин', 'Пуськин'];
  langs = ['English', 'Русский', 'Chinese']
  genres = ['Детектив', 'Роман', 'Фантастика', 'Еще что-то', 'И еще что-то']

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      "desc": [""],
      "authors": [[]],
      "lang": [[]],
      "genre": [""],
      "from": [0],
      "to": [100]
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(val => {
      console.log(val);
    })
  }

}
