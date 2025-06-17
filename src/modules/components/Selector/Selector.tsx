/* eslint-disable @typescript-eslint/indent */
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { SearchLink } from '@components/SearchLink';
import arrowDown from '@img/icons/arrow-down.svg';
import arrowUp from '@img/icons/arrow-up.svg';
import styles from './Selector.module.scss';

export interface SelectOption<T extends string | number> {
  value: T;
  label: string;
}

type Props = {
  id: string;
  label: string;
  initialSelectorType: string | number;
  options: SelectOption<T>[];
  selector: string;
  onChange: (event: string) => void;
  setCurrentSelector: (selector: string) => void;
};

export const Selector: React.FC<Props> = ({
  id,
  label,
  options,
  initialSelectorType,
  selector,
  onChange,
  setCurrentSelector,
}) => {
  const isSortBy = label === 'Sort by';
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [visibleSelectorLabel, setVisibleSelectorLabel] = useState<
    number | string
  >(initialSelectorType);

  useEffect(() => {
    setVisibleSelectorLabel(initialSelectorType);
  }, [initialSelectorType]);

  const serchFilter = (filterType: string) => {
    return {
      sort: filterType,
    };
  };

  const searchItemPerPage = (itemsPerPage: string) => {
    return {
      perPage: itemsPerPage,
    };
  };

  useEffect(() => {
    if (selector !== id) {
      setIsOpen(false);
    }
  }, [selector, id]);

  return (
    <div className={styles.selector}>
      <label htmlFor={id} className={styles.selector__title}>
        {label}
      </label>
      <div
        className={classNames(styles.selector__button, {
          [styles['selector__button--border']]: isOpen,
          [styles.sortBy]: id === 'sortBy',
          [styles.pageSelector]: id === 'pageSelector',
        })}
        id={id.toString()}
        onClick={() => {
          if (selector === id && isOpen) {
            setIsOpen(false);
            setCurrentSelector('');
          } else {
            setIsOpen(true);
            setCurrentSelector(id);
          }
        }}
      >
        <span className={styles.selector__value}>{visibleSelectorLabel}</span>
        <img
          className={styles.selector__icon}
          src={!isOpen ? arrowDown : arrowUp}
          alt={!isOpen ? 'Arrow-down' : 'Arrow-up'}
        />
      </div>
      {isOpen && selector === id && (
        <ul className={styles.selector__options}>
          {isSortBy
            ? options.map((option, index) => (
                <li
                  className={styles.selector__item}
                  key={index}
                  onClick={() => {
                    onChange(option.value);
                    setVisibleSelectorLabel(option.label);
                    setIsOpen(false);
                  }}
                >
                  <SearchLink
                    params={serchFilter(option.value)}
                    className={styles.selector__link}
                  >
                    {option.label}
                  </SearchLink>
                </li>
              ))
            : options.map((option, index) => (
                <li
                  className={styles.selector__item}
                  key={index}
                  onClick={() => {
                    onChange(option.value);
                    setVisibleSelectorLabel(option.label);
                    setIsOpen(false);
                  }}
                >
                  <SearchLink
                    params={searchItemPerPage(option.value)}
                    className={styles.selector__link}
                  >
                    {option.label}
                  </SearchLink>
                </li>
              ))}
        </ul>
      )}
    </div>
  );
};
