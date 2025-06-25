import { AnswerModel } from "./answerModel";

export class QuestionModel {
  constructor(
    private _id: number,
    private _question: string,
    private _answers: AnswerModel[]
  ) {}

  get id(): number {
    return this._id;
  }

  get question(): string {
    return this._question;
  }
  set question(value: string) {
    this._question = value;
  }

  get answers(): AnswerModel[] {
    return this._answers;
  }
  set answers(value: AnswerModel[]) {
    this._answers = value;
  }
}
