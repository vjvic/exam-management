import { Question } from "./Question";

export interface Exam {
  _id?: string;
  title: string;
  description: string;
  timeLimit: number;
  dateAndTime: { from: Date | null; to: Date | null };
  code: string;
  questions: Question[];
  users?: string[];
}
