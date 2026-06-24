import classNames from 'classnames';
import styles from './Dropdown.module.scss';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
  name: string;
  className: string;
};

export const Dropdown: React.FC<Props> = ({ name, className }) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get(name);

  const title = name === 'sort' ? 'Sort by' : 'Items on page';

  const options = useMemo(() => {
    if (name === 'sort') {
      return [
        { value: 'age', label: 'Newest' },
        { value: 'title', label: 'Alphabetically' },
        { value: 'price', label: 'Cheapest' },
      ];
    }

    return [
      { value: 'all', label: 'All' },
      { value: '4', label: '4' },
      { value: '8', label: '8' },
      { value: '16', label: '16' },
    ];
  }, [name]);

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

  const chooseOption = (item: { value: string; label: string }) => {
    const params = new URLSearchParams(searchParams);

    if (item.value === options[0].value) {
      params.delete(name);
    } else {
      params.set(name, item.value);
    }

    params.delete('page');
    setSearchParams(params);
    setOpenDropdown(false);
  };

  const currentLabel =
    options.find(opt => opt.value === search)?.label || options[0].label;

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
        {currentLabel}
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
        {options.map(option => {
          return (
            <li
              key={option.value}
              className={classNames(styles.dropdown__item, {
                [styles['dropdown__item--active']]:
                  search === option.value ||
                  (!search && option.value === options[0].value),
              })}
              onClick={() => chooseOption(option)}
            >
              {option.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
