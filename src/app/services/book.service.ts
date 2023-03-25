import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {BookModel} from "@models/book-model";
import {IFilters} from "@models/filters";
import {filterArrayByFields} from "../utils/findMatches";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private mockedVal: Array<BookModel> = [
    {
      id: 1,
      name: 'fsdfds',
      author: 'Няшкин',
      genre: 'Фантастика',
      year: 9999,
      lang: "eng",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget purus convallis risus pellentesque dignissim. Aenean eu augue suscipit, auctor dui sit amet, pretium lorem. Curabitur rhoncus, libero non malesuada porta, massa nibh accumsan erat, vitae cursus orci enim ut sapien. Vestibulum et lectus facilisis, dictum massa sed, aliquet ante. Suspendisse id laoreet ex, lacinia dignissim erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin ac pretium eros. Pellentesque at dapibus tellus. Suspendisse pulvinar felis sed sodales sollicitudin. Fusce porttitor ante in risus congue, id aliquam felis porttitor. In bibendum eu metus eu ornare. Suspendisse nec mauris ornare, aliquam velit ac, ullamcorper tortor. Aenean suscipit molestie ex ut mattis. Ut ac egestas metus, id euismod sapien. Sed eu velit a nulla congue molestie quis sit amet sapien. Sed quis urna laoreet, pulvinar lacus nec, scelerisque arcu.",
      pageCount: 100
    },
    {
      id: 2,
      name: 'Книга',
      author: 'Автор',
      genre: 'Детектив',
      year: 2001,
      lang: "eng",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget purus convallis risus pellentesque dignissim. Aenean eu augue suscipit, auctor dui sit amet, pretium lorem. Curabitur rhoncus, libero non malesuada porta, massa nibh accumsan erat, vitae cursus orci enim ut sapien. Vestibulum et lectus facilisis, dictum massa sed, aliquet ante. Suspendisse id laoreet ex, lacinia dignissim erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin ac pretium eros. Pellentesque at dapibus tellus. Suspendisse pulvinar felis sed sodales sollicitudin. Fusce porttitor ante in risus congue, id aliquam felis porttitor. In bibendum eu metus eu ornare. Suspendisse nec mauris ornare, aliquam velit ac, ullamcorper tortor. Aenean suscipit molestie ex ut mattis. Ut ac egestas metus, id euismod sapien. Sed eu velit a nulla congue molestie quis sit amet sapien. Sed quis urna laoreet, pulvinar lacus nec, scelerisque arcu.",
      pageCount: 100
    },
    {
      id: 3,
      name: 'Очередная книга',
      author: 'Пуськин',
      genre: 'Жанр',
      year: 2090,
      lang: "ru",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget purus convallis risus pellentesque dignissim. Aenean eu augue suscipit, auctor dui sit amet, pretium lorem. Curabitur rhoncus, libero non malesuada porta, massa nibh accumsan erat, vitae cursus orci enim ut sapien. Vestibulum et lectus facilisis, dictum massa sed, aliquet ante. Suspendisse id laoreet ex, lacinia dignissim erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin ac pretium eros. Pellentesque at dapibus tellus. Suspendisse pulvinar felis sed sodales sollicitudin. Fusce porttitor ante in risus congue, id aliquam felis porttitor. In bibendum eu metus eu ornare. Suspendisse nec mauris ornare, aliquam velit ac, ullamcorper tortor. Aenean suscipit molestie ex ut mattis. Ut ac egestas metus, id euismod sapien. Sed eu velit a nulla congue molestie quis sit amet sapien. Sed quis urna laoreet, pulvinar lacus nec, scelerisque arcu.",
      pageCount: 100
    },
    {
      id: 4,
      name: 'fsdfds',
      author: 'Fdfdf',
      genre: 'fdf',
      year: 4032,
      lang: "eng",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget purus convallis risus pellentesque dignissim. Aenean eu augue suscipit, auctor dui sit amet, pretium lorem. Curabitur rhoncus, libero non malesuada porta, massa nibh accumsan erat, vitae cursus orci enim ut sapien. Vestibulum et lectus facilisis, dictum massa sed, aliquet ante. Suspendisse id laoreet ex, lacinia dignissim erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin ac pretium eros. Pellentesque at dapibus tellus. Suspendisse pulvinar felis sed sodales sollicitudin. Fusce porttitor ante in risus congue, id aliquam felis porttitor. In bibendum eu metus eu ornare. Suspendisse nec mauris ornare, aliquam velit ac, ullamcorper tortor. Aenean suscipit molestie ex ut mattis. Ut ac egestas metus, id euismod sapien. Sed eu velit a nulla congue molestie quis sit amet sapien. Sed quis urna laoreet, pulvinar lacus nec, scelerisque arcu.",
      pageCount: 100
    },

  ]

  private books$: BehaviorSubject<Array<BookModel>> = new BehaviorSubject<Array<BookModel>>(this.mockedVal);

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

  addBook(book: BookModel): boolean {
    const prevData = this.books$.getValue();

    if (prevData.find(item => item.id === book.id && item.name === item.name)) {
      return false
    }
    prevData.push(book)
    this.books$.next(prevData);
    return true;
  }
}
