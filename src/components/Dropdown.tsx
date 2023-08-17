import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

const sortByCategories = [
  'Default',
  'Newest',
  'Lowest Price',
  'Highest Price',
];

const itemsOnPage = [8, 12, 16, 24];

type Props = {
  type: string,
};

export const Dropdown:React.FC<Props> = ({
  type,
}) => {
  const isSortBy = type === 'sortBy';

  const [searchParams] = useSearchParams();
  const params = isSortBy
    ? searchParams.get(type) || 'Default'
    : parseInt(searchParams.get(type) || '12', 10);

  const title = isSortBy ? 'Sort By' : 'Items on page';
  const category = isSortBy ? sortByCategories : itemsOnPage;

  const [isDropdownOpened, setDropdownOpened] = useState<boolean>(false);

  const selectRef = useRef(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (event.target !== selectRef.current && isDropdownOpened) {
      setDropdownOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpened]);

  return (
    <div className="phones__header__dropdown">
      <p className="text__small">{title}</p>
      <div className="dropdown">
        <button
          type="button"
          className="dropdown__button"
          onClick={() => setDropdownOpened(state => !state)}
        >
          <span>{params}</span>
          <span className={classNames(
            'icon icon--dropdown',
            'dropdown__button__arrow', {
              active: isDropdownOpened,
            },
          )}
          />
        </button>

        <div className="dropdown" id="dropdown-menu" role="menu">
          <div
            className={classNames('dropdown__content', {
              active: isDropdownOpened,
            })}
          >
            {category.map(item => (
              <SearchLink
                className="link-style text__body dropdown__item"
                key={item}
                params={{ [type]: String(item) }}
                onClick={() => setDropdownOpened(false)}
              >
                {item}
              </SearchLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
