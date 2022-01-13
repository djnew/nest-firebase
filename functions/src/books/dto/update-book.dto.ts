import { PartialType } from "@nestjs/mapped-types";
import { CreateBookDto } from "./create-book.dto";

export class UpdateBookDto extends PartialType(CreateBookDto) {
  authors: string;
  description: string;
  favorite: string;
  fileBook: string;
  fileCover: string;
  fileName: string;
  title: string;
}
