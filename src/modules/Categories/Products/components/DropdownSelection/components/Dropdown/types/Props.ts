export interface Props {
  searchParamStr: string;
  isFocused: boolean;
  enumValues: string[];
  searchParam: string | null;
  buttonValue: string;
  setFocusHandler: () => void;
}
