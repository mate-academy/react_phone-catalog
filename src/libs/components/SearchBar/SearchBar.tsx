/* eslint-disable jsx-a11y/control-has-associated-label */

import { useState } from 'react';
import cn from 'classnames';

import { Icon } from '../Icon';
import './SearchBar.scss';

type Props = {
  className: string
};

export const SearchBar: React.FC<Props> = ({ className }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleReset = () => {
    if (value) {
      setValue('');
    }
  };

  return (
    <form
      className={cn('search-bar', className)}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={value}
        className="search-bar__input"
        placeholder="Search in phones..."
        onChange={handleChange}
      />

      <button
        type="button"
        className="search-bar__button"
        onClick={() => handleReset()}
      >
        <Icon
          iconName={!value ? 'search' : 'close'}
          classNames="search-bar__icon"
        />
      </button>
    </form>
  );
};
