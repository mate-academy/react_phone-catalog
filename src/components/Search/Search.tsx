import { FC, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Button } from '../Button/Button';

import './Search.scss';

type Props = {
  currentPage: string;
  isSearchClicked: boolean;
  onSearchClicked: (isSearchClicked: boolean) => void;
  isSearchBoxExpanded: boolean;
};

export const Search: FC<Props> = ({
  currentPage,
  isSearchClicked,
  onSearchClicked,
  isSearchBoxExpanded,
}) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        onSearchClicked(true);
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isSearchClicked) {
        onSearchClicked(true);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isSearchClicked]);

  return (
    <form
      className="search header__top-actions--search"
      ref={formRef}
    >
      <input
        type="text"
        className={classNames(
          'search__input',
          { 'search__input--hidden': isSearchClicked && !isSearchBoxExpanded },
        )}
        placeholder={`Search in ${currentPage}...`}
      />

      <Button
        content="icon"
        iconType="search"
        className="search"
        event={() => onSearchClicked(!isSearchClicked)}
      />

      {/* <button type="button" className="search__button">
        <Icon type="close" />
      </button> */}
    </form>
  );
};
