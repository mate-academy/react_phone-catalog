import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Dropdown.module.scss';
import { icons } from '../../shared/global/Icons';
import { getSearchWith } from '../../helpers/searchHelper';

type Props = {
  items: { name: string; title: string }[];
  params: string;
};

export const Dropdown: React.FC<Props> = ({ items, params }) => {
  const [expanded, setExpanded] = useState(false);
  const [searchParams] = useSearchParams();

  const currentValue = useMemo(
    () => searchParams.get(params) || items[0].name,
    [searchParams, items, params],
  );

  const selectedItem = useMemo(
    () => items.find(item => item.name === currentValue) || items[0],
    [items, currentValue],
  );

  useEffect(() => {
    if (!expanded) {
      return () => {};
    }

    const handleDocumentClick = () => {
      setExpanded(false);
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [expanded]);

  return (
    <div className={classNames(styles.dropdown, { [styles.active]: expanded })}>
      <button
        type="button"
        className={styles.dropdownBtn}
        onClick={e => {
          e.stopPropagation();
          setExpanded(current => !current);
        }}
      >
        <span className={styles.itemTitle}>
          {items.length ? selectedItem.title : ''}
        </span>
        <span className={styles.btnArrow}>{icons.arrowDown}</span>
      </button>

      <div className={styles.dropdownMenu}>
        {items.map(item => (
          <Link
            key={item.name}
            to={{
              search: getSearchWith(searchParams, {
                [params]: item.name,
                page: '1',
              }),
            }}
            className={classNames(styles.dropdownItem)}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};
