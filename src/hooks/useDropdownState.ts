import { useState } from 'react';

import { SORT_BY } from '@utils/types/SORT_BY.enum';

export const useDropdownState = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    [SORT_BY.properties]: false,
    [SORT_BY.page]: false,
  });

  const toggleDropdown = (type: SORT_BY) => {
    setIsDropdownOpen(prev => ({
      [SORT_BY.properties]: false,
      [SORT_BY.page]: false,
      [type]: !prev[type],
    }));
  };

  const closeDropdown = (type: SORT_BY) => {
    setIsDropdownOpen(prev => ({
      ...prev,
      [type]: false,
    }));
  };

  return {
    isDropdownOpen,
    toggleDropdown,
    closeDropdown,
  };
};
