import React, { useContext, useEffect, useRef } from 'react';
import classNames from 'classnames';
import './Search.scss';
import { Images } from '../../../images';
import { CatalogContext } from '../../../context/CatalogContext';
import { useLocation } from 'react-router-dom';
import { isProductsPage } from '../../../utils/service';

type Props = {
  query: string;
  onQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearQuery: () => void;
};

export const Search: React.FC<Props> = ({
  query,
  onQueryChange,
  onClearQuery,
}) => {
  const { pathname } = useLocation();
  const { menuIsActive } = useContext(CatalogContext);
  const searchInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (searchInput.current) {
      searchInput.current.focus();
    }
  }, []);

  return (
    <section
      className={classNames('search', {
        search__visible: !menuIsActive && isProductsPage(pathname, false),
      })}
    >
      <input
        type="text"
        ref={searchInput}
        value={query}
        className="search__input"
        placeholder="Search"
        onChange={event => onQueryChange(event)}
      />

      <div className="search__button-container">
        <button className="search__button" onClick={onClearQuery}>
          {!query ? (
            <img src={Images.Button.Search} className="search__button--find" />
          ) : (
            <img src={Images.Button.Close} className="search__button--clear" />
          )}
        </button>
      </div>
    </section>
  );
};
