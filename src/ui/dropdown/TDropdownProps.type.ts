import { TOptions } from '@utils/constants/optionsForSort';

export type TDropdownProps = {
  name: string;
  options: TOptions[];
  isDropdownOpen: boolean;
  small?: boolean;
  initialPerPage: number;
  toggleDropdown: () => void;
  closeDropdown: () => void;
  setItemPerPage?: (value: number) => void;
  setCurrentPage?: (value: number) => void;
};
