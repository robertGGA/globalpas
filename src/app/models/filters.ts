export interface IFilters {
  name: string,
  genre: string,
  author: string[],
  lang: string[],
  description: string,
  pageCount: number
}

export interface IGenre {
  genre: string
}

export interface ILang {
  lang: string
}
