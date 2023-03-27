import {BookService} from "@services/book.service";
import {TestBed} from "@angular/core/testing";
import {BookModel} from "@models/book-model";
import {mockedBooks} from "../mocks/books";
import {of} from "rxjs";

describe('book service', () => {
  let service: BookService;
  beforeEach(() => {
    service = new BookService();
  });

  it('should create a new instance of book service', () => {
    expect(service).toBeTruthy()
  })

  it('should return all books', () => {
    spyOn(service, 'getBooks').and.returnValue(of(mockedBooks));

    service.getBooks().subscribe(books => {
      expect(books).toEqual(mockedBooks);
    });
  });

  it('should add a book', async () => {
    const bookService = TestBed.get(BookService);
    const newBook: BookModel = {
      id: 100,
      name: 'Новая книга',
      author: 'Пушкин',
      genre: 'Классика',
      lang: 'Русский',
      description: 'Описание новой книги',
      pageCount: 200
    };

    await bookService.addBook(newBook).toPromise();
    const books = await bookService.getBooks().toPromise();
    expect(books).toContain(newBook);
  });
})
