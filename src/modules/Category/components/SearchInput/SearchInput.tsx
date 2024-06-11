import React, { FC, useEffect, useState } from 'react';

import { useDebounce } from '../../../../hooks/useDebounce';
import { HeaderSlot } from '../../../Layout/HeaderSlotContext';
import classes from './searchInput.module.scss';

type Props = {
  initialQuery: string;
  placeholder: string;
  setQuery: (newQuery: string) => void;
};

export const SearchInput: FC<Props> = ({
  initialQuery,
  placeholder,
  setQuery,
}) => {
  const [input, setInput] = useState(initialQuery);
  const debouncedSearch = useDebounce(setQuery, 300);

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
