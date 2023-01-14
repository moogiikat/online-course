import { Course } from "./course.model";

export interface ICategory {
  id?: number;
  name: string;
  courses: Course[];
}

export class Category implements ICategory {
  readonly id?: number;
  readonly name: string;
  readonly courses: Course[];

  constructor(json?: Partial<RemoveMethods<Category>>) {
    Object.assign(this, {
      ..._default,
      ...json,
    });
  }

  static fromJson = (json: { [key: string]: any }): Category => {
    const c: any[] = json["courses"];

    return new Category({
      id: json["id"],
      name: json["name"],
      courses: c.map((course) => Course.fromJson(course)),
    });
  };
}

const _default: ICategory = {
  name: "",
  courses: [],
};
