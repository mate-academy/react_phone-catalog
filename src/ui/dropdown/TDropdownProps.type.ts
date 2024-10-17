import { TOptions } from '@utils/constants/optionsForSort';

export type TDropdownProps = {
  text: string;
  options: TOptions[];
  isDropdownOpen: boolean;
  small?: boolean;
  setIsDropdownOpen: () => void;
  closeDropdown: () => void;
  setItemPerPage?: (value: number) => void;
  setCurrentPage?: (value: number) => void;
  setSortBy?: (value: string) => void;
};
