import {IFilters} from "@models/filters";
import {BookModel} from "@models/book-model";

export function filterArrayByFields(array: BookModel[], filter: IFilters): BookModel[] {

  return array.filter(obj => {
    return Object.keys(filter).every(filterKeys => {

      if (filterKeys === 'name') {
        return obj[filterKeys as keyof BookModel].toString().toLowerCase()
          .concat(obj['description'].toString().toLowerCase())
          .includes(filter[filterKeys as keyof IFilters].toString().toLowerCase())
      }

      if (typeof filter[filterKeys as keyof IFilters] === 'object' && filter[filterKeys as keyof IFilters].toString().length) {
        return filter[filterKeys as keyof IFilters].toString().toLowerCase()
          .includes(obj[filterKeys as keyof BookModel].toString().toLowerCase())
      }
      return obj[filterKeys as keyof BookModel].toString().toLowerCase()
        .includes(filter[filterKeys as keyof IFilters].toString().toLowerCase())
    });
  });
}
