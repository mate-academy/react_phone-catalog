import React, { FC, useEffect, useState } from 'react';

import { useDebounce } from '../../../../hooks/useDebounce';
import { HeaderSlot } from '../../../Layout/HeaderSlotContext';
import classes from './searchInput.module.scss';
import { useSearchQuery } from '../../hooks/useSearchQuery';

type Props = {
  placeholder: string;
};

export const SearchInput: FC<Props> = ({ placeholder }) => {
  const [searchQuery, setSearchQuery] = useSearchQuery();
  const [input, setInput] = useState(searchQuery);
  const debouncedSearch = useDebounce(setSearchQuery, 300);

  useEffect(() => {
    debouncedSearch(input);
  }, [debouncedSearch, input]);

  return (
    <HeaderSlot>
      <input
        type="text"
        value={input}
        onChange={event => setInput(event.target.value)}
        className={classes.searchInput}
        placeholder={placeholder}
      />
    </HeaderSlot>
  );
};
