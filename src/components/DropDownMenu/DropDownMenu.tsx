import React, { useEffect, useRef, useState } from 'react';
import styles from './DropDownMenu.module.scss';
import classNames from 'classnames';
import { SortType } from '../../types/SortType';

type Props = {
  title: string;
  variant: string;
  sortVariables: SortType[];
  updateParams: (variant: string, val: string) => void;
  selectedValue: string;
};

export const DropDownMenu: React.FC<Props> = ({
  title,
  variant,
  sortVariables,
  updateParams,
  selectedValue,
}) => {
  // const [selectedValue, setSelectedValue] = useState<string>(
  //   sortVariables[0].label,
  // );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentValue =
    sortVariables.find(item => item.value === selectedValue)?.label ||
    sortVariables[0].label;

  const handleOpenMenu = () => {
    setIsOpen(prev => !prev);
  };

  const handleValueChange = (value: string) => {
    const sortVariant = variant === 'perPage' ? 'perPage' : 'sort';

    setIsOpen(false);
    updateParams(sortVariant, value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  return (
    <div className={styles.dropDown} ref={containerRef}>
      <label className={styles.title}>{title}</label>

      <div
        onClick={handleOpenMenu}
        className={classNames(styles.input, styles[variant])}
      >
        <div className={styles.value}>{currentValue}</div>
        <span className={styles.arrowDown}>
          <img src="./img/icons/Chevron (Arrow Down).svg" alt="arrow down" />
        </span>
      </div>

      {isOpen && (
        <div className={styles.sortOptions}>
          {sortVariables.map(item => {
            return (
              <div
                key={item.value}
                className={styles.item}
                onClick={() => handleValueChange(item.value)}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;
