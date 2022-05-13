import { Question } from "./Question";

export interface Result {
  _id?: string;
  fName: string;
  lName: string;
  examTitle: string;
  score: number;
  questions?: Question[];
}
