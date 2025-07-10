export interface Quiz {
  id: number;
  title: string;
  picture: string;
  slug: string;
}

export interface Question {
  id: number;
  quiz_id: number;
  question: string;
  number: number;
}

export interface Answer {
  id: number;
  question_id: number;
  answer: string;
  is_correct: boolean;
}
