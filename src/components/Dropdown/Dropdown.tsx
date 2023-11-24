import classNames from 'classnames';
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/searchHelper';
import { SelectedItem } from '../../types/SelectedItem';

type Props = {
  itemsList: SelectedItem[];
  value: string | number;
  filteredBy: string;
  callback: (item: SelectedItem) => void
};

export const Dropdown: React.FC<Props> = ({
  itemsList, value, filteredBy, callback,
}) => {
  const [isListShown, setListShown] = useState(false);
  const ulRef = useRef<HTMLUListElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [searchParams] = useSearchParams();

  const toggleList = () => {
    setListShown(!isListShown);
  };

  const handleUserClick = (item: SelectedItem) => () => {
    callback(item);
    toggleList();
  };

  const handleClick = useCallback(({ target }: MouseEvent) => {
    const node = ulRef?.current;
    const button = buttonRef?.current;

    if (node
        && target instanceof Node
        && !node.contains(target)
        && target !== button) {
      setListShown(false);
    }
  }, [isListShown, ulRef]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [handleClick]);

  return (
    <div className="dropdown">
      <button
        type="button"
        className={classNames(
          'dropdown__button',
          { 'dropdown__button--is-active': !!isListShown },
        )}
        onClick={toggleList}
        ref={buttonRef}
      >
        {value}
      </button>

      <ul
        className={classNames(
          'dropdown__list',
          { 'dropdown__list--is-active': !!isListShown },
        )}
        ref={ulRef}
      >
        {itemsList.map(item => (
          <li
            key={item.title}
            className="dropdown__item"
          >
            <Link
              to={filteredBy === 'perPage' ? ({
                search: getSearchWith(searchParams,
                  { page: '1', perPage: `${item.query}` }),
              })
                : ({
                  search: getSearchWith(searchParams,
                    { [filteredBy]: `${item.query}` }),
                })}
              onClick={handleUserClick(item)}
              className="dropdown__link"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
