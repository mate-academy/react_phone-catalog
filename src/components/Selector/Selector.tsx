import { useEffect, useRef, useState } from 'react';
import { ItemsOnPage, SortKeys, SortMethod } from '../../types/SortMethod';
import './Selector.scss';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from '../SearchLink';

type Props = {
  selectItems: SortMethod[] | ItemsOnPage[];
  searchParam: 'sort' | 'itemsOnPage';
  children: React.ReactNode;
};

export const Selector: React.FC<Props> = ({
  selectItems,
  searchParam,
  children,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const block = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const selectedItems = searchParams.get(searchParam) || selectItems[0];

  const handleSelect = () => {
    setIsMenuOpen(false);
  };

  const getSearchValue = (item: SortMethod | ItemsOnPage) => {
    if (searchParam === 'sort') {
      const index = Object.values(SortMethod).indexOf(item as SortMethod);
      const key = Object.keys(SortMethod)[index];

      return key;
    }

    return item;
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (!block.current?.contains(target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div
      ref={block}
      className={classNames('selector', {
        selector__sort: searchParam === 'sort',
      })}
    >
      <p className="selector__description">{children}</p>

      <div className="selector__container">
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={classNames('selector__button', {
            'selector__button--open': isMenuOpen,
          })}
        >
          <span>
            {searchParam === 'sort'
              ? SortMethod[selectedItems as SortKeys] || SortMethod.age
              : selectedItems}
          </span>

          {isMenuOpen ? (
            <i className="icon icon--arrow-down"></i>
          ) : (
            <i className="icon icon--arrow-up"></i>
          )}
        </button>

        {isMenuOpen && (
          <ul className="selector__menu">
            {selectItems.map(item => (
              <li key={item}>
                <SearchLink
                  params={{
                    [searchParam]: getSearchValue(item),
                    page: '1',
                  }}
                  onClick={handleSelect}
                  type="button"
                  className={classNames('selector__item-button', {
                    'selector__item-button--selected': item === selectedItems,
                  })}
                >
                  {item}
                </SearchLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
