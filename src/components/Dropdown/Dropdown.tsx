import classNames from 'classnames';
import styles from './Dropdown.module.scss';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ItemsOnPage, SortBy } from '../../types/SortBy';

type Props = {
  name: string;
  className: string;
};

export const Dropdown: React.FC<Props> = ({ name, className }) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get(name);

  const title = name === 'sort' ? 'Sort by' : 'Items on page';
  const options = useMemo(
    () =>
      name === 'sort' ? Object.values(SortBy) : Object.values(ItemsOnPage),
    [name],
  );

  const fieldRef = useRef<HTMLDivElement | null>(null);
  const optionListRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        fieldRef.current &&
        optionListRef.current &&
        !optionListRef.current.contains(event.target as Node) &&
        !fieldRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  const showOptionList = () => {
    setOpenDropdown(!openDropdown);
  };

  const chooseOption = (item: string) => {
    const params = new URLSearchParams(searchParams);

    if (item === options[0]) {
      params.delete(name);
    } else {
      params.set(name, item);
    }

    params.delete('page');
    setSearchParams(params);
    setOpenDropdown(false);
  };

  return (
    <div className={classNames(styles.dropdown, className)}>
      <span className={styles.dropdown__title}>{title}</span>

      <div
        ref={fieldRef}
        className={classNames(styles.dropdown__field, {
          [styles['dropdown__field--focus']]: openDropdown,
        })}
        onClick={showOptionList}
      >
        {search ? search : options[0]}
        <span
          className={classNames('icon', 'icon--arrow', {
            'icon--arrow--down': !openDropdown,
          })}
        ></span>
      </div>

      <ul
        ref={optionListRef}
        className={classNames(styles.dropdown__list, {
          [styles['dropdown__list--show']]: openDropdown,
        })}
      >
        {options.map((item, index) => {
          return (
            <li
              key={index}
              className={classNames(styles.dropdown__item, {
                [styles['dropdown__item--active']]:
                  search === item || (!search && index === 0),
              })}
              onClick={() => chooseOption(item)}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
