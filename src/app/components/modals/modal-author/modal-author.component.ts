import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthorService} from "@services/author.service";
import {AuthorModel} from "@models/author-model";
import {DestroyService} from "@services/destroy.service";
import {debounceTime, startWith, switchMap, takeUntil} from "rxjs";

@Component({
  selector: 'gp-modal-author',
  templateUrl: './modal-author.component.html',
  styleUrls: ['./modal-author.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalAuthorComponent implements OnInit {
  authors!: Array<AuthorModel>;
  form: FormGroup

  constructor(private authorService: AuthorService,
              private destroy$: DestroyService,
              private cdr: ChangeDetectorRef,
              private fb: FormBuilder) {
    this.form = fb.group({
      'search': ['']
    })
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        startWith({search: ''}),
        debounceTime(300),
        switchMap(value => this.authorService.searchAuthors(value.search)))
      .subscribe(value => {
        this.authors = value;
        this.cdr.markForCheck();
      })
  }

  chooseAuthor(id: number) {
    console.log(id);
  }

  removeAuthor(event: Event, id: number) {
    event.stopPropagation();
    this.authorService.removeAuthor(id);
  }

}
