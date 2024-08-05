import { memo, useContext, useEffect, useRef, useState } from 'react';
import './Dropdown.scss';
import classNames from 'classnames';
import { ItemsOnPage } from '../types/ItemsOnPage';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../../utils/getSearchWith';
import { SearchType } from '../types/SearchType';
import { SortTypes } from '../types/SortTypes';
import { StateContext } from '../../../utils/GlobalStateProvider';

type Props = {
  items: SortTypes[] | ItemsOnPage[];
  activeElem: SortTypes | ItemsOnPage;
  searchParam: SearchType;
};

// eslint-disable-next-line react/display-name
export const Dropdown: React.FC<Props> = memo(
  ({ items, activeElem, searchParam }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const { isDarkThemeOn } = useContext(StateContext);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const menuRef = useRef<any>(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setSearchWith = (params: any) => {
      const search = getSearchWith(params, searchParams);

      setSearchParams(search);
    };

    const handleSelection = (elem: SortTypes | ItemsOnPage) => {
      setIsDropDownOpen(false);

      if (elem === items[0]) {
        setSearchWith({ [searchParam]: null });

        return;
      }

      if (elem !== activeElem) {
        setSearchWith({ [searchParam]: elem });
      }
    };

    useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (!menuRef.current.contains(e.target)) {
          setIsDropDownOpen(false);
        }
      };

      document.addEventListener('mousedown', handler);

      return () => {
        document.removeEventListener('mousedown', handler);
      };
    }, []);

    return (
      <div
        className={classNames('dropdown', {
          'dropdown-white': !isDarkThemeOn,
        })}
        ref={menuRef}
      >
        <div
          className="dropdown__head"
          onClick={() => setIsDropDownOpen(prev => !prev)}
        >
          <p>{activeElem || items[0]}</p>

          <div
            className={classNames('dropdown__img-wrapper', {
              'dropdown__img-wrapper--active': isDropDownOpen,
            })}
          ></div>
        </div>
        <div
          ref={menuRef}
          className={classNames('dropdown__content', {
            'dropdown__content--active': isDropDownOpen,
          })}
        >
          {items.map((item, i) => (
            <div
              className={classNames('dropdown__item', {
                'dropdown__item--active': activeElem === item.toString(),
              })}
              onClick={() => handleSelection(item)}
              key={i}
            >
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    );
  },
);
