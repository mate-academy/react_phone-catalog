export interface DropDownProps<T> {
  title: string;
  defaultSelectedOption: T;
  selectOptions: T[];
  onSubmit: (option: T) => void;
}
