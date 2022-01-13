import { IBookRepository } from "src/books/repositories/i-book.repository";
import { BookModel } from "src/books/entities/book.entity";
import { CreateBookDto } from "src/books/dto/create-book.dto";
import { UpdateBookDto } from "src/books/dto/update-book.dto";
import {initializeDb} from "../../firebase";



export class BooksFireStoreRepository implements IBookRepository {
  private db;
  constructor() {
    this.db = initializeDb();
  }

  async create(createBookDto: CreateBookDto): Promise<BookModel | false> {
    const books = this.db.ref("books");
    try {
      const res = await books.push(createBookDto);
      const doc = await books.child(res.key).get();
      if (!doc.val()) {
        return false;
      } else {
        return doc.val() as BookModel;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async findAll(): Promise<BookModel[]> {
    const snapshot = await this.db.ref("books").get();
    const allDoc = {};
    snapshot.forEach((doc) => {
      allDoc[doc.key] = doc.val();
    });
    return allDoc as BookModel[];
  }

  async findOne(id: string): Promise<BookModel | false> {
    try {
      const book = await this.db.ref("books").child(id).get();
      if (!book.val()) {
        return false;
      } else {
        return book.val() as BookModel;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.db.ref("books").child(id).remove();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async update(
    id: string,
    updateBookDto: UpdateBookDto,
  ): Promise<BookModel | false> {
    try {
      await this.db.ref("books").child(id).update(updateBookDto);
      const doc = await this.db.ref("books").child(id).get();
      return doc.val() ?? false;
    } catch (e) {
      return false;
    }
  }
}
