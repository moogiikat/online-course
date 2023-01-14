import jwt_decode, { JwtPayload } from "jwt-decode";
type TJwtToken = JwtPayload & { token: string };
export class JwtToken implements TJwtToken {
  readonly token: string = "";
  readonly iss?: string;
  readonly sub?: string;
  readonly aud?: string[] | string;
  readonly exp?: number;
  readonly nbf?: number;
  readonly iat?: number;
  readonly jti?: string;
  constructor(partial?: Partial<TJwtToken>) {
    Object.assign(this, partial);
  }
  public copyWith = (modification: Partial<TJwtToken>) => {
    return JwtToken.fromMap({
      ...this.toMap(),
      ...modification,
    });
  };
  static fromMap = (map?: Partial<TJwtToken>): JwtToken => {
    return new JwtToken(map);
  };
  public toMap = (): TJwtToken => {
    return JSON.parse(
      JSON.stringify(this, (_, value) => {
        if (value === "") {
          return undefined;
        }
        return value;
      })
    );
  };
  // TODO: validate json
  static fromString = (token: string): JwtToken => {
    const decodedToken = jwt_decode<JwtPayload>(token);
    return JwtToken.fromMap({
      token,
      ...decodedToken,
    });
  };
}
