export type DropdownProps = {
  label: string;
  selected: string;
  options: string[];
  onChange: (value: string) => void;
};
