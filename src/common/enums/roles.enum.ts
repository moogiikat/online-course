export class ERoles {
  static readonly SUPER_ADMIN = new ERoles(0, "super_admin", "GTN管理者");
  static readonly ADMIN = new ERoles(1, "admin", "管理者");
  static readonly VIEWER = new ERoles(2, "viewer", "一般ユーザー");

  private constructor(
    public readonly code: number,
    public readonly value: string,
    public readonly name: string
  ) {}

  static fromNumber(code: number): ERoles {
    const filtered = ERoles.toArray().filter((item) => item.code === code);
    return filtered.length !== 0 ? filtered[0] : ERoles.VIEWER;
  }

  static toArray(): ERoles[] {
    return [ERoles.SUPER_ADMIN, ERoles.ADMIN, ERoles.VIEWER];
  }
}
