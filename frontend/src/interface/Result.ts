import { Question } from "./Question";

export interface Result {
  fName: string;
  lName: string;
  examTitle: string;
  score: number;
  questions?: Question[];
}
