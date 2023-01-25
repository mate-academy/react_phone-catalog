export interface DropMenu {
  title: string;
  options: string[];
  handleChange: (e?: any) => void;
  defaultValue?: string;
}
