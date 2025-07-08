export class QuestionModel {
  constructor(
    private _id: number,
    private _question: string,
    private _quiz_id: number,
    private _number: number
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

  get quiz_id(): number {
    return this._quiz_id;
  }
  set quiz_id(value: number) {
    this._quiz_id = value;
  }

  get number(): number {
    return this._number;
  }
  set number(value: number) {
    this._number = value;
  }
}
