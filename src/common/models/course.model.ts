export interface ICourse {
  id?: number;
  name: string;
  description: string;
  imagePath: string;
  introductionPath: string;
  categoryId: number;
  contents: { id: number; name: string }[];
  category: {
    id: string;
    name: string;
  };
}

export class Course implements ICourse {
  readonly id?: number;
  readonly name: string;
  readonly description: string;
  readonly imagePath: string;
  readonly introductionPath: string;
  readonly categoryId: number;
  readonly contents: { id: number; name: string }[];
  readonly category: {
    id: string;
    name: string;
  };

  constructor(json?: Partial<RemoveMethods<Course>>) {
    Object.assign(this, {
      ..._default,
      ...json,
    });
  }

  static fromJson = (json: { [key: string]: any }): Course => {
    return new Course({
      id: json["id"],
      name: json["name"],
      description: json["description"],
      imagePath: json["image_path"],
      introductionPath: json["introduction_path"],
      categoryId: json["category_id"],
      contents: json["contents"],
      category: { id: json["category"]["id"], name: json["category"]["name"] },
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

const _default: ICourse = {
  name: "",
  description: "",
  imagePath: "",
  introductionPath: "",
  categoryId: 0,
  category: {
    id: "",
    name: "",
  },
  contents: [],
};
