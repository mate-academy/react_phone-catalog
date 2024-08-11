import { useEffect, useRef, useState } from 'react';
import styles from './Filter.module.scss';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearch } from '../../../data/searchHelper';

export interface FilterType {
  title: string;
  param: string;
  list: string[];
  values: string[];
  paramName: string;
}

export const Filter: React.FC<FilterType> = ({
  title,
  param,
  list,
  values,
  paramName,
}) => {
  const [params] = useSearchParams();
  const refFilter = useRef<HTMLDivElement>(null);
  const refList = useRef<HTMLAnchorElement>(null);

  const [menuStyles, setMenuStyles] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (refList.current && isOpen) {
      refList.current.focus();
    }

    if (refFilter.current) {
      setMenuStyles({
        width: `${refFilter.current.clientWidth}px`,
        opacity: isOpen ? 1 : 0,
        maxHeight: isOpen ? 'max-content' : 0,
        overflow: isOpen ? 'auto' : 'hidden',
      });
    }
  }, [params, isOpen]);

  return (
    <div
      className={styles.filter}
      ref={refFilter}
      tabIndex={0}
      onBlur={() => {
        setTimeout(() => setIsOpen(false), 500);
      }}
    >
      <h3 className={styles.filter__sort}>{title}</h3>

      <div
        className={styles.filter__group}
        onClick={() => {
          setIsOpen(prev => !prev);
        }}
      >
        <p className={styles.filter__title}>
          {param ? values[list.findIndex(l => l === param)] : values[0]}
        </p>

        <span
          className={classNames(styles['filter__arrow-down'], {
            [styles['filter__arrow-down--open']]: isOpen,
          })}
        ></span>
      </div>

      <ul className={styles.filter__drowdown} style={menuStyles}>
        {list.map((item, ind) => {
          return (
            <li
              key={item + ind}
              className={classNames(styles.filter__item, {
                [styles['filter__item--hidden']]: param === item,
              })}
            >
              <Link
                to={`?${getSearch(params, { [paramName]: item })}`}
                className={styles.filter__link}
                onClick={() => setIsOpen(false)}
              >
                {values[ind]}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
