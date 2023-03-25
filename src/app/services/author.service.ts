import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {AuthorModel} from "@models/author-model";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  data = [
    {
      "id": 0,
      "name": "Marshall"
    },
    {
      "id": 1,
      "name": "Stark"
    },
    {
      "id": 2,
      "name": "Cannon"
    },
    {
      "id": 3, "name": "Mcintosh"
    },
    {
      "id": 4,
      "name": "Randolph"
    },
    {
      "id": 5, "name": "Obrien"
    },
    {
      "id": 6,
      "name": "Little"
    },
    {
      "id": 7,
      "name": "Charles"
    },
    {
      "id": 8,
      "name": "Hanson"
    },
    {
      "id": 9,
      "name": "Wade"
    },
    {
      "id": 10,
      "name": "Raymond"
    },
    {
      "id": 11, "name": "Molina"
    },
    {
      "id": 12, "name": "Malone"
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

}
