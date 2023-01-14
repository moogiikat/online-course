type NonMethodKeys<T> = ({
  [P in keyof T]: T[P] extends Function ? never : P;
} & { [x: string]: never })[keyof T];
type RemoveMethods<T> = Pick<T, NonMethodKeys<T>>;
