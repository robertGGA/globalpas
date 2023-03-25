import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, of} from "rxjs";
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
      author: 'Гоголь',
      genre: 'Фантастика',
      lang: "Китайский",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget purus convallis risus pellentesque dignissim. Aenean eu augue suscipit, auctor dui sit amet, pretium lorem. Curabitur rhoncus, libero non malesuada porta, massa nibh accumsan erat, vitae cursus orci enim ut sapien. Vestibulum et lectus facilisis, dictum massa sed, aliquet ante. Suspendisse id laoreet ex, lacinia dignissim erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin ac pretium eros. Pellentesque at dapibus tellus. Suspendisse pulvinar felis sed sodales sollicitudin. Fusce porttitor ante in risus congue, id aliquam felis porttitor. In bibendum eu metus eu ornare. Suspendisse nec mauris ornare, aliquam velit ac, ullamcorper tortor. Aenean suscipit molestie ex ut mattis. Ut ac egestas metus, id euismod sapien. Sed eu velit a nulla congue molestie quis sit amet sapien. Sed quis urna laoreet, pulvinar lacus nec, scelerisque arcu.",
      pageCount: 100
    },
    {
      id: 2,
      name: 'Книга',
      author: 'Чехов',
      genre: 'Детектив',
      lang: "Французский",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget purus convallis risus pellentesque dignissim. Aenean eu augue suscipit, auctor dui sit amet, pretium lorem. Curabitur rhoncus, libero non malesuada porta, massa nibh accumsan erat, vitae cursus orci enim ut sapien. Vestibulum et lectus facilisis, dictum massa sed, aliquet ante. Suspendisse id laoreet ex, lacinia dignissim erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin ac pretium eros. Pellentesque at dapibus tellus. Suspendisse pulvinar felis sed sodales sollicitudin. Fusce porttitor ante in risus congue, id aliquam felis porttitor. In bibendum eu metus eu ornare. Suspendisse nec mauris ornare, aliquam velit ac, ullamcorper tortor. Aenean suscipit molestie ex ut mattis. Ut ac egestas metus, id euismod sapien. Sed eu velit a nulla congue molestie quis sit amet sapien. Sed quis urna laoreet, pulvinar lacus nec, scelerisque arcu.",
      pageCount: 100
    },
    {
      id: 3,
      name: 'Очередная книга',
      author: 'Толстой',
      genre: 'Жанр',
      lang: "Немецкий",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget purus convallis risus pellentesque dignissim. Aenean eu augue suscipit, auctor dui sit amet, pretium lorem. Curabitur rhoncus, libero non malesuada porta, massa nibh accumsan erat, vitae cursus orci enim ut sapien. Vestibulum et lectus facilisis, dictum massa sed, aliquet ante. Suspendisse id laoreet ex, lacinia dignissim erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin ac pretium eros. Pellentesque at dapibus tellus. Suspendisse pulvinar felis sed sodales sollicitudin. Fusce porttitor ante in risus congue, id aliquam felis porttitor. In bibendum eu metus eu ornare. Suspendisse nec mauris ornare, aliquam velit ac, ullamcorper tortor. Aenean suscipit molestie ex ut mattis. Ut ac egestas metus, id euismod sapien. Sed eu velit a nulla congue molestie quis sit amet sapien. Sed quis urna laoreet, pulvinar lacus nec, scelerisque arcu.",
      pageCount: 100
    },
    {
      id: 4,
      name: 'fsdfds',
      author: 'Fdfdf',
      genre: 'fdf',
      lang: "Английский",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget purus convallis risus pellentesque dignissim. Aenean eu augue suscipit, auctor dui sit amet, pretium lorem. Curabitur rhoncus, libero non malesuada porta, massa nibh accumsan erat, vitae cursus orci enim ut sapien. Vestibulum et lectus facilisis, dictum massa sed, aliquet ante. Suspendisse id laoreet ex, lacinia dignissim erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin ac pretium eros. Pellentesque at dapibus tellus. Suspendisse pulvinar felis sed sodales sollicitudin. Fusce porttitor ante in risus congue, id aliquam felis porttitor. In bibendum eu metus eu ornare. Suspendisse nec mauris ornare, aliquam velit ac, ullamcorper tortor. Aenean suscipit molestie ex ut mattis. Ut ac egestas metus, id euismod sapien. Sed eu velit a nulla congue molestie quis sit amet sapien. Sed quis urna laoreet, pulvinar lacus nec, scelerisque arcu.",
      pageCount: 100
    },
    {
      "id": 5,
      "name": "Три товарища",
      "genre": "Роман",
      "author": "Ремарк",
      "lang": "Русский",
      "description": "Роман о жизни трех немецких друзей в Германии в 1920-е годы",
      "pageCount": 528
    },
    {
      "id": 6,
      "name": "Мастер и Маргарита",
      "genre": "Роман",
      "author": "Булгаков",
      "lang": "Русский",
      "description": "Роман о дьяволе, который приезжает в Москву в начале 1930-х годов",
      "pageCount": 480
    },
    {
      "id": 7,
      "name": "Война и мир",
      "genre": "Юмористический роман",
      "author": "Толстой",
      "lang": "Русский",
      "description": "Роман о событиях во время Отечественной войны 1812 года",
      "pageCount": 1300
    }

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
