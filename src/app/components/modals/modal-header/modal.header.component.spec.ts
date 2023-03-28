import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ModalHeaderComponent} from "@components/modals/modal-header/modal-header.component";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";


describe('ModalHeaderComponent', () => {
  let component: ModalHeaderComponent;
  let fixture: ComponentFixture<ModalHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ModalHeaderComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.title = 'Title'
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title from @Input', () => {
    component.title = 'Test Title'
    expect(component.title).toBe('Test Title')
  })
});
