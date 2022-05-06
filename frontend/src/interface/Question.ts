export interface Question {
  _id?: string;
  questionText: string;
  choices: { text: string }[];
  answer: string;
  point: number;
  cpd: string;
  kd: string;
  questionBank?: string;
}
