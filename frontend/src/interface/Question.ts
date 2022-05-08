export interface Question {
  _id?: string;
  questionText: string;
  choices: { text: string }[];
  answer: string;
  point: number;
  cpd: string;
  kd: string;
  image?: string;
  questionBank?: string;
  userAnswer?: string;
}
