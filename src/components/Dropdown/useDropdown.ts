import { useCallback, useEffect, useState } from 'react';
import { DROPDOWN_HEADINGS } from '../../common/constants';
import { useRouter } from '../_hooks/useRouter';

export const useDropdown = (list: OptionType[], heading: string) => {
  const [isListOpen, setListOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState(list[0].option);

  const closeDropdown = useCallback(() => setListOpen(false), []);
  const { search, history } = useRouter();

  useEffect(() => {
    if (isListOpen) {
      window.addEventListener('click', closeDropdown);
    } else {
      window.removeEventListener('click', closeDropdown);
    }
  }, [isListOpen, closeDropdown]);

  const toggleList = useCallback(() => setListOpen(!isListOpen), [isListOpen]);

  const handleSort = useCallback((option: string) => {
    setSelectedOption(option);

    if (heading === DROPDOWN_HEADINGS.sortBy) {
      search.set('sortBy', option.split(' ').join('-'));
    }

    if (heading === DROPDOWN_HEADINGS.perPage) {
      if (option === 'All') {
        search.set('perPage', option);
      }

      search.set('perPage', option);
    }

    search.delete('page');

    history.push({ search: search.toString() });
  }, [history, search, heading]);

  return {
    toggleList,
    selectedOption,
    isListOpen,
    handleSort,
  };
};
