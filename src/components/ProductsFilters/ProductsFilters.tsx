import classNames from 'classnames';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SortTypes } from '../../types/SortTypes';
import { updateSearchParam } from '../../utils/searchHelper';
import styles from './ProductsFilters.module.scss';

interface Props {
  searchParams: URLSearchParams;
  sort: string;
  prePage: string;
}

export const ProductsFilters: React.FC<Props> = ({
  searchParams,
  sort,
  prePage,
}) => {
  const sortOptions = useMemo(
    () => [
      { value: SortTypes.Age, label: 'Newest' },
      { value: SortTypes.Title, label: 'Alphabetically' },
      { value: SortTypes.Price, label: 'Cheapest' },
    ],
    [],
  );

  const prePageOptions = useMemo(() => ['4', '8', '16', 'all'], []);

  const [isOpen, setIsOpen] = useState({
    sort: false,
    prePage: false,
  });
  const sortRef = useRef<HTMLDivElement>(null);
  const prePageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortRef.current &&
        !sortRef.current.contains(event.target as Node) &&
        prePageRef.current &&
        !prePageRef.current.contains(event.target as Node)
      ) {
        setIsOpen({ sort: false, prePage: false });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [triggers, setTriggers] = useState({
    sort: sortOptions[0].label,
    prePage: prePageOptions[3],
  });

  useMemo(() => {
    const currentSort =
      sortOptions.find(option => option.value === sort)?.label ||
      sortOptions[0].label;
    const currentPrePage =
      prePageOptions.find(option => option === prePage) || prePageOptions[3];

    setTriggers({
      sort: currentSort,
      prePage: currentPrePage,
    });
  }, [sort, prePage, prePageOptions, sortOptions]);

  return (
    <div className={classNames(styles.controls)}>
      <div
        className={classNames(
          styles.controls__control,
          styles['controls__control--sort'],
        )}
        ref={sortRef}
      >
        <p className={styles.controls__title}>Sort by</p>
        <div
          className={classNames(
            styles.controls__select,
            styles['controls__select--sort'],
          )}
          onClick={() =>
            setIsOpen({
              sort: !isOpen.sort,
              prePage: false,
            })
          }
        >
          <div
            className={classNames(styles.controls__trigger, {
              [styles['controls__trigger--active']]: isOpen.sort,
            })}
          >
            {triggers.sort}
          </div>
          {isOpen.sort && (
            <div className={styles.controls__options}>
              {sortOptions.map(option => (
                <Link
                  key={option.label}
                  className={styles.controls__link}
                  to={updateSearchParam(
                    'sort',
                    option.value,
                    SortTypes.Age,
                    searchParams,
                  )}
                >
                  {option.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={styles.controls__control} ref={prePageRef}>
        <p className={styles.controls__title}>Items on page</p>
        <div
          className={classNames(
            styles.controls__select,
            styles['controls__select--prePage'],
          )}
          onClick={() =>
            setIsOpen({
              prePage: !isOpen.prePage,
              sort: false,
            })
          }
        >
          <div
            className={classNames(styles.controls__trigger, {
              [styles['controls__trigger--active']]: isOpen.prePage,
            })}
          >
            {triggers.prePage}
          </div>
          {isOpen.prePage && (
            <div className={styles.controls__options}>
              {prePageOptions.map(option => (
                <Link
                  key={option}
                  className={styles.controls__link}
                  to={updateSearchParam('prePage', option, 'all', searchParams)}
                >
                  {option}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
