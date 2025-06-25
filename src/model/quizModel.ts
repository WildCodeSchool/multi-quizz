import { QuestionModel } from "./questionModel";

export class QuizModel {
  constructor(
    private _id: number,
    private _title: string,
    private _questions: QuestionModel[]
  ) {}

  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }
  set title(value: string) {
    this._title = value;
  }

  get questions(): QuestionModel[] {
    return this._questions;
  }
  set questions(value: QuestionModel[]) {
    this._questions = value;
  }
}
