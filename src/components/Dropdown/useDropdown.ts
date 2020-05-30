import { useCallback, useEffect, useState } from 'react';
import { useSearch } from '../_hooks/useSearch';
import { DROPDOWN_HEADINGS } from '../../common/constants';

export const useDropdown = (list: OptionType[], heading: string) => {
  const [isListOpen, setListOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState(list[0].option);

  const close = useCallback(() => setListOpen(false), [setListOpen]);
  const { search, history } = useSearch();

  useEffect(() => {
    if (isListOpen) {
      window.addEventListener('click', close);
    } else {
      window.removeEventListener('click', close);
    }
  }, [isListOpen, close]);

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
