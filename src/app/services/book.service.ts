import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, of} from "rxjs";
import {BookModel} from "@models/book-model";
import {IFilters} from "@models/filters";
import {filterArrayByFields} from "../utils/findMatches";
import {mockedBooks} from "../mocks/books";

@Injectable({
  providedIn: 'root'
})
export class BookService {


  private books$: BehaviorSubject<Array<BookModel>> = new BehaviorSubject<Array<BookModel>>(mockedBooks);

  constructor() {
  }

  getBooks(): Observable<Array<BookModel>> {
    return this.books$.asObservable();
  }

  getFilteredBooks(filters: IFilters): Observable<Array<BookModel>> {
    return this.books$
      .pipe(
        map(book => filterArrayByFields(book, filters))
      );
  }

  setBooks(value: Array<BookModel>): void {
    this.books$.next(value);
  }

  getBookById(id: number): BookModel | undefined {
    return this.books$.getValue().find(book => book.id === id);
  }

  addBook(book: BookModel): Observable<boolean> {
    const prevData = this.books$.getValue();

    if (prevData.find(item => item.id === book.id && item.name === item.name)) {
      return of(false);
    }
    book.id = prevData.length + 1;
    prevData.push(book);
    this.books$.next(prevData);
    console.log(book);
    return of(true);
  }
}
