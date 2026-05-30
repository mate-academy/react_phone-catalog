import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './Dropdown.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useUpdateSearchParams } from '../../hooks/useUpdateSearchParams';
import { SearchLabelsType } from '../../types/SearchLabelsType';

interface Props<T extends string> {
  className?: string;
  title: string;
  values: T[];
  searchLabel: SearchLabelsType;
  defaultValue?: T;
}

export const Dropdown = <T extends string>({
  title,
  values,
  defaultValue,
  searchLabel,
  className = '',
  ...props
}: Props<T>) => {
  const [searchParams] = useSearchParams();
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const updateSearch = useUpdateSearchParams();
  const paramsKey = searchParams.get(searchLabel);
  const validDefault = defaultValue !== undefined ? defaultValue : values[0];
  const initialLabel = paramsKey ? paramsKey : validDefault;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={classNames(className, styles.dropdown)} {...props}>
      <label
        className={classNames('small-text', styles['dropdown-label'])}
        htmlFor="dropdown-trigger"
      >
        {title}
      </label>

      <div ref={dropdownRef} className={styles['dropdown-content']}>
        <div
          id="dropdown-trigger"
          onClick={() => setShowMenu(prev => !prev)}
          className={classNames(styles['dropdown-trigger'], {
            [styles['is-open']]: showMenu,
          })}
        >
          <span className="button-text">{initialLabel}</span>
          <span
            className={classNames(
              'icon',
              'icon--arrow-bottom',
              styles['dropdown-icon'],
              { [styles['is-open']]: showMenu },
            )}
          />
        </div>

        <div
          className={classNames(styles['dropdown-menu'], {
            [styles['is-open']]: showMenu,
          })}
          role="menu"
        >
          <ul className={styles['dropdown-content']}>
            {values.map(option => (
              <li
                className={classNames('body-text', styles['dropdown-item'], {
                  [styles['is-active']]: initialLabel === option,
                })}
                key={option}
                onClick={() => {
                  if (option !== validDefault) {
                    updateSearch({ [searchLabel]: option.toString() });
                  } else {
                    updateSearch({ [searchLabel]: null });
                  }

                  setShowMenu(false);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
