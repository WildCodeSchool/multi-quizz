export class QuizModel {
  constructor(
    private _id: number,
    private _title: string,
    private _picture: string,
    private _slug: string
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

  get picture(): string {
    return this._picture;
  }
  set picture(value: string) {
    this._picture = value;
  }

  get slug(): string {
    return this._slug;
  }
  set slug(value: string) {
    this._slug = value;
  }
}
