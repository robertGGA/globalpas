import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, of} from "rxjs";
import {AuthorModel} from "@models/author-model";
import {IGenre, ILang} from "@models/filters";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  data = [
    {
      "id": 0,
      "name": "Белый"
    },
    {
      "id": 1,
      "name": "Достоевский"
    },
    {
      "id": 2,
      "name": "Пушкин"
    },
    {
      "id": 3,
      "name": "Тургенев"
    },
    {
      "id": 4,
      "name": "Толстой"
    },
    {
      "id": 5,
      "name": "Булгаков"
    },
    {
      "id": 6,
      "name": "Чехов"
    },
    {
      "id": 7,
      "name": "Гоголь"
    },
    {
      "id": 8,
      "name": "Есенин"
    },
    {
      "id": 9,
      "name": "Горький"
    },
    {
      "id": 10,
      "name": "Ремарк"
    },
    {
      "id": 11,
      "name": "Molina"
    },
    {
      "id": 12,
      "name": "Malone"
    }
  ]
  private authors$: BehaviorSubject<Array<AuthorModel>> = new BehaviorSubject<Array<AuthorModel>>(this.data);

  getAuthors(): Observable<Array<AuthorModel>> {
    return this.authors$.asObservable();
  }

  searchAuthors(name: string): Observable<Array<AuthorModel>> {
    return this.authors$.pipe(map(items => items.filter(item =>
        item.name.toLowerCase().includes(name.toLowerCase())
      )
    ));
  }

  removeAuthor(id: number) {
    this.authors$.next(this.authors$.getValue().filter(value => value.id !== id));
  }

  addAuthor(newAuthor: AuthorModel): void {
    const authors = this.authors$.getValue();
    if (authors.every(item => item.id !== newAuthor.id)) {
      authors.push(newAuthor)
      this.authors$.next(authors);
    }
  }

  changeAuthor(id: number, newName: string): void {
    this.authors$.next(this.authors$.getValue().map(item => {
      if (item.id === id) {
        return {
          id: id,
          name: newName
        }
      }
      return item;
    }));
  }

  getGenres(): Observable<Array<IGenre>> {
    return of([
      {
        "genre": "Фантастика"
      },
      {
        "genre": "Детектив"
      },
      {
        "genre": "Приключения"
      },
      {
        "genre": "Фэнтези"
      },
      {
        "genre": "Роман"
      },
      {
        "genre": "Классика"
      },
      {
        "genre": "Научная литература"
      },
      {
        "genre": "Исторический роман"
      },
      {
        "genre": "Юмористический роман"
      },
      {
        "genre": "Триллер"
      }
    ]);
  }

  getLangs(): Observable<Array<ILang>> {
    return of([
      {
        "lang": "Английский"
      },
      {
        "lang": "Испанский"
      },
      {
        "lang": "Французский"
      },
      {
        "lang": "Немецкий"
      },
      {
        "lang": "Итальянский"
      },
      {
        "lang": "Китайский"
      },
      {
        "lang": "Японский"
      },
      {
        "lang": "Русский"
      }
    ]);
  }

}
