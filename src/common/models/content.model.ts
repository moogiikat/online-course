export interface IContent {
  id?: number;
  name: string;
  description: string;
  imagePath: string;
  introductionPath: string;
  categoryId: number;
}

export class Content implements IContent {
  readonly id?: number;
  readonly name: string;
  readonly description: string;
  readonly imagePath: string;
  readonly introductionPath: string;
  readonly categoryId: number;
  readonly contents: { id: number; name: string }[];

  constructor(json?: Partial<RemoveMethods<Content>>) {
    Object.assign(this, {
      ..._default,
      ...json,
    });
  }

  static fromJson = (json: { [key: string]: any }): Content => {
    return new Content({
      id: json["id"],
      name: json["name"],
      description: json["description"],
      imagePath: json["image_path"],
      introductionPath: json["introduction_path"],
      categoryId: json["category_id"],
      contents: json["contents"],
    });
  };
  public toJson = (): { [key: string]: any } => {
    return JSON.parse(
      JSON.stringify({
        name: this.name,
        description: this.description,
        introduction_path: this.introductionPath,
      })
    );
  };
}

const _default: IContent = {
  name: "",
  description: "",
  imagePath: "",
  introductionPath: "",
  categoryId: 0,
};
