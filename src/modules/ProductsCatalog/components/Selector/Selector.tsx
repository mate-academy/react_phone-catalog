import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import styles from './Selector.module.scss';
import { useSearchParams } from 'react-router-dom';
import { firstLetterCap } from '../../../../utils/utility';
import { SvgIcon } from '../../../../components/SvgIcon';

interface Props {
  title: string;
  type: string;
  items: { name: string; value: string }[];
  className?: string;
}

export const Selector: React.FC<Props> = ({
  title,
  type,
  items,
  className,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedValue =
    items.find(item => item.value === searchParams.get(type)) || items[0];

  const onChangeValue = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set(type, value);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handleDocumentClick = (evt: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(evt.target as Node)
    ) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    if (expanded) {
      document.addEventListener('click', handleDocumentClick);
    } else {
      document.removeEventListener('click', handleDocumentClick);
    }

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [expanded]);

  return (
    <div className={cn(styles.selector, className)}>
      <p className={styles.selector__title}>{title}</p>
      <div className={cn(styles.selector__dropdown)} ref={dropdownRef}>
        <div className={styles.selector__trigger}>
          <button
            type="button"
            className={styles.selector__btn}
            onClick={e => {
              e.stopPropagation();
              setExpanded(current => !current);
            }}
          >
            <span className={styles.selector__text}>
              {firstLetterCap(selectedValue.name)}
            </span>

            <span className={styles.selector__icon}>
              <SvgIcon type="arrow" />
            </span>
          </button>
        </div>

        <div
          className={cn(styles.selector__menu, {
            [styles['selector__menu--active']]: expanded,
          })}
          id="dropdown-menu"
          role="menu"
        >
          <div className={styles.selector__content}>
            {items.map(item => (
              <button
                className={cn(styles.selector__item, {
                  [styles['selector__item--active']]:
                    item.value === selectedValue.value,
                })}
                key={item.name}
                onClick={() => {
                  onChangeValue(item.value);
                  setExpanded(false);
                }}
              >
                {firstLetterCap(item.name)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
