import {NestFactory} from "@nestjs/core";
import {ExpressAdapter} from "@nestjs/platform-express";
import  express from "express";
import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
import {AppModule} from "./app.module";


const expressServer = express();

const createFunction = async (expressInstance): Promise<void> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  await app.init();
};




export const api = functions
  .https.onRequest(async (request, response) => {
    await createFunction(expressServer);
    expressServer(request, response);
  });
//


export const bookModerator = functions.database.ref("/books/{messageId}")
  .onWrite(
    (change) => {
      const book = change.after.val();

      if (book.description === "") {
        console.log("Book description is empty: ", book);
        change.after.ref.update(
          {
            description: "Скоро здесь будет описание…",
          }
        );
      }
      return null;
    });
