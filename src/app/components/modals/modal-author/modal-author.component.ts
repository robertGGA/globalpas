import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthorService} from "@services/author.service";
import {AuthorModel} from "@models/author-model";
import {DestroyService} from "@services/destroy.service";
import {debounceTime, startWith, switchMap, takeUntil, tap} from "rxjs";

@Component({
  selector: 'gp-modal-author',
  templateUrl: './modal-author.component.html',
  styleUrls: ['./modal-author.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalAuthorComponent implements OnInit {
  authors!: Array<AuthorModel>;
  form: FormGroup
  editableId: number = -1;

  constructor(private authorService: AuthorService,
              private destroy$: DestroyService,
              private cdr: ChangeDetectorRef,
              private fb: FormBuilder) {
    this.form = fb.group({
      'search': [''],
      'changedAuthor': ['']
    })
  }

  ngOnInit(): void {
    this.form.get('search')?.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        startWith(''),
        debounceTime(300),
        tap(() => {
          console.log('tapped')
          this.editableId = -1
        }),
        switchMap(value => this.authorService.searchAuthors(value)))
      .subscribe(value => {
        this.authors = value;
        this.cdr.markForCheck();
      })
  }

  chooseAuthor(id: number) {
    this.editableId = id;
  }

  submitAuthor(event: Event, id: number) {
    event.stopPropagation();
    this.authorService.changeAuthor(id, this.form.getRawValue().changedAuthor);
    this.form.reset({
      ...this.form.getRawValue(),
      changedAuthor: ''
    });

    this.editableId = -1;
  }

  removeAuthor(event: Event, id: number) {
    event.stopPropagation();
    this.authorService.removeAuthor(id);
  }

}
