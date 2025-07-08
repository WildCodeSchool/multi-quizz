export class AnswerModel {
  constructor(
    private _id: number,
    private _questionId: number,
    private _answer: string,
    private _is_correct: boolean
  ) {}

  get id(): number {
    return this._id;
  }

  get questionId(): number {
    return this._questionId;
  }
  set questionId(value: number) {
    this._questionId = value;
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
