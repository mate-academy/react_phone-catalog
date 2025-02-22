export interface Props<T extends string> {
  title: string;
  buttonValue: string;
  searchParam: string | null;
  searchParamStr: string;
  enumValues: T[];
  defaultEnumValue: T;
  setButtonValue: (value: T) => void;
}
