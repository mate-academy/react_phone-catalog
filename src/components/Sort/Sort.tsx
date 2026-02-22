import { useEffect, useRef, useState } from 'react';
import styles from './Sort.module.scss';
import arrow from '../../../public/img/icons/arrow.svg';
import { useParams } from 'react-router-dom';

type Option<T> = {
  value: T;
  label: string;
};

interface SortProps<T> {
  options: Option<T>[];
  onChange: (value: T) => void;
  title: string;
  selectedValue: T;
}

export const Sort = <T extends string | number>({
  options,
  onChange,
  title,
  selectedValue,
}: SortProps<T>) => {
  const { category } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [category]);

  const handleOptionClick = (obj: Option<T>) => {
    onChange(obj.value);
    setIsOpen(false);
  };

  return (
    <div className={styles.block}>
      <div className={styles.title}>{title}</div>
      <div className={styles.container} ref={sortRef}>
        <div
          className={`${styles.trigger} ${isOpen ? styles.open : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedValue}</span>
          <img
            src={arrow}
            alt="Arrow"
            className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}
          />
        </div>
        {isOpen && (
          <ul className={styles.menu}>
            {options.map(option => (
              <li
                key={option.value}
                className={styles.item}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
