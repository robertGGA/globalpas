import {ModalCreateBookComponent} from "@components/modals/modal-create-book/modal-create-book.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {BookService} from "@services/book.service";
import {AuthorService} from "@services/author.service";
import {MatDialogRef} from "@angular/material/dialog";

describe('ModalCreateBook', () => {
  let component: ModalCreateBookComponent;
  let fixture: ComponentFixture<ModalCreateBookComponent>;
  let fb: FormBuilder;
  const bookServiceSpyObj = jasmine.createSpyObj('BookService', ['addBook']);
  const authorServiceSpyObj = jasmine.createSpyObj('AuthorService', ['getAuthors', 'getGenres', 'getLangs']);
  const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['close']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ModalCreateBookComponent],
      providers: [
        { provide: BookService, useValue: bookServiceSpyObj },
        { provide: AuthorService, useValue: authorServiceSpyObj },
        { provide: MatDialogRef, useValue: dialogRefSpyObj },
      ],
    }).compileComponents();

    fb = TestBed.inject(FormBuilder);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateBookComponent);
    component = fixture.componentInstance;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
