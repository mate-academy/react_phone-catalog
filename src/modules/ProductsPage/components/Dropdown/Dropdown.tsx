import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';

import styles from './Dropdown.module.scss';

import { Arrow } from '@components/Arrow';
import { ArrowType } from '@sTypes/ArrowType';

import { SearchLink } from '../SearchLink';
import { getSearchParam } from '@ProductsPage/utils/getSearchParam';

type Props = {
  name: string;
  description: string;
  reset?: string[];

  options: [string, string][];
  defaultValue?: string;
};

export const Dropdown: React.FC<Props> = React.memo(function Dropdown({
  name,
  description,
  reset = [],

  options,
  defaultValue = options[0][1],
}) {
  const [params] = useSearchParams();
  const [isOpened, setIsOpened] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const selected = getSearchParam(name, params, options, defaultValue);

  useEffect(() => {
    if (!isOpened) {
      return;
    }

    const handleDocumentClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpened(false);
      }
    };

    const handleDocumentTouch = (event: TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpened(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('touchstart', handleDocumentTouch);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('touchstart', handleDocumentTouch);
    };
  }, [isOpened]);

  return (
    <div
      aria-label={description}
      ref={dropdownRef}
      className={classNames(styles.dropdown, {
        [styles['dropdown--opened']]: isOpened,
      })}
    >
      <div className={styles.dropdown__description}>{description}</div>

      <div
        className={styles.dropdown__selected}
        onClick={() => setIsOpened(prev => !prev)}
      >
        {selected}

        <Arrow
          type={ArrowType.down}
          hideBorders
          secondary
          small
          ariaHidden
          className={styles.dropdown__arrow}
        />
      </div>

      <div className={styles.dropdown__options}>
        {options.map(([key, value]) => (
          <SearchLink
            key={value}
            params={Object.assign(
              { [name]: value === defaultValue ? null : key },
              ...reset.map(resetValue => ({ [resetValue]: null })),
            )}
            className={styles.dropdown__option}
            onClick={() => setIsOpened(false)}
          >
            {value}
          </SearchLink>
        ))}
      </div>
    </div>
  );
});
