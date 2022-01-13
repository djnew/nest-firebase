import * as Firebase from "firebase-admin";
import * as functions from "firebase-functions";
Firebase.initializeApp(functions.config().firebase);

export const initializeDb = () => {
  return Firebase.database();
}
