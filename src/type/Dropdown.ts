export interface Option {
  [key: string]: string
}

export interface DropdownIterface {
  name: string;
  options: Option,
  isOpen: boolean;
}
