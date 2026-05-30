//hooks
import { useEffect, useRef, useState } from 'react';

//styles
import styles from './Select.module.scss';

//assets
import arrowDown from './assets/icons/Chevron (Arrow Down).svg';

//services
import classNames from 'classnames';

type Props = {
  label: string;
  options: { label: string; value: string }[];
  value: string;
  setter(value: string): void;
};

export const Select: React.FC<Props> = ({ label, options, value, setter }) => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuIsOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setMenuIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const chosen = options.find(el => el.value === value)?.label;

  return (
    <div className={styles.select} ref={selectRef}>
      <p className={styles.label}>{label}</p>

      <button
        onClick={() => setMenuIsOpen(prev => !prev)}
        className={classNames(styles.valueZone, {
          [styles['valueZone--selected']]: menuIsOpen,
        })}
      >
        {chosen}
        <img src={arrowDown} alt="arrowDown" className={styles.arrow} />
      </button>

      <ul
        className={classNames(styles.list, {
          [styles['list--open']]: menuIsOpen,
        })}
      >
        {options.map(el => (
          <li key={el.value} className={styles.li}>
            <button
              className={styles.option}
              onClick={() => {
                setter(el.value);
                setMenuIsOpen(false);
              }}
            >
              {el.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
