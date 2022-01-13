
export interface BookModel {
  id?: string;
  title: string;
  description: string;
  authors: string;
  favorite: string;
  fileCover?: string;
  fileName?: string;
  fileBook?: string;
}
export type BookDocument = Book & Document;

export class Book implements BookModel {
  id: string;
  title: string;
  authors: string;
  description: string;
  favorite: string;
  fileCover: string;
  fileName: string;
  fileBook: string;
}


