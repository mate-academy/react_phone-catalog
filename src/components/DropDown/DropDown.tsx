import classNames from 'classnames';
import styles from './DropDown.module.scss';
import { useEffect, useRef, useState } from 'react';
import Arrow from '../Icons/Arrow/Arrow';
import { ArrowDirection } from '../../types/arrowDirection';

type Props = {
  title?: string;
  startValue: string;
  classSelector?: string;
  classOption?: string;
  onChange?: (value: string) => void;
  options: string[];
};

export const DropDown: React.FC<Props> = ({
  title = '',
  startValue,
  classSelector = '',
  classOption = '',
  onChange = () => {},
  options,
}) => {
  const [value, setValue] = useState(startValue);
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    };

    document.addEventListener('click', close);

    return () => {
      document.removeEventListener('click', close);
    };
  }, []);

  useEffect(() => {
    if (options.includes(startValue)) {
      setValue(startValue);
    } else {
      setValue('');
    }
  }, [options, startValue]);

  const handleClick = () => {
    setIsActive(prev => !prev);
  };

  const handleSelect = (option: string) => {
    setValue(option);
    onChange(option);
    setIsActive(false);
  };

  return (
    <div
      className={classNames(styles.DropDown, classSelector)}
      ref={containerRef}
    >
      <p className={styles.DropDown__title}>{title}</p>
      <div className={styles.DropDown__selector} onClick={handleClick}>
        {value}
        <Arrow
          direction={ArrowDirection.down}
          className={classNames({
            [styles.isActive]: isActive,
          })}
        />
      </div>
      <ul
        className={classNames(styles.DropDown__list, classOption, {
          [styles.DropDown__list_active]: isActive,
        })}
      >
        {options.map(option => (
          <li
            key={option}
            className={classNames(styles.DropDown__item, {
              [styles.DropDown__item_active]: value === option,
            })}
            onClick={() => handleSelect(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};
