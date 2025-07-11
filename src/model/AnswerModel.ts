export class AnswerModel {
  constructor(
    private _id: number,
    private _question_number: number,
    private _answer: string,
    private _is_correct: boolean
  ) {}

  get id(): number {
    return this._id;
  }

  get question_number(): number {
    return this._question_number;
  }
  set question_number(value: number) {
    this._question_number = value;
  }

  get answer(): string {
    return this._answer;
  }
  set answer(value: string) {
    this._answer = value;
  }

  get is_correct(): boolean {
    return this._is_correct;
  }
  set is_correct(value: boolean) {
    this._is_correct = value;
  }
}
