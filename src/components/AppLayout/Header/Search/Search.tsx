import {useRef} from 'react';
import {IoSearch} from 'react-icons/io5';
import {useSearchParams} from 'react-router-dom';

import style from './Search.module.scss';

type Props = {
  category: string;
};

export const Search: React.FC<Props> = ({category}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue: string = event.target.value;

    newValue = newValue.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');

    const nextParams = new URLSearchParams(searchParams);

    if (newValue) {
      nextParams.set('query', newValue);
    } else {
      nextParams.delete('query');
    }

    nextParams.delete('page');
    setSearchParams(nextParams, {replace: true});
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={style.search}>
      <input
        ref={inputRef}
        className={style.search__input}
        type="text"
        aria-label={`Search in ${category}`}
        onChange={handleOnChange}
        value={searchParams.get('query') || ''}
        placeholder={`Search in ${category}...`}
      />
      <button
        type="button"
        className={style.search__button}
        onClick={handleClick}
        aria-label="Focus product search"
      >
        <IoSearch className={style.search__icon} />
      </button>
    </div>
  );
};
