import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import styles from './Selector.module.scss';
import arrowDown from '../../img/icons/ArrowDown.svg';
import arrowUp from '../../img/icons/ArrowUp.svg';

type Props = {
  title: string,
  paramsKey: string,
  list: string[],
};

export const Selector: React.FC<Props> = ({ title, paramsKey, list }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const toggleSelector = () => {
    setIsOpen(prev => !prev);
  };

  const changeSelector: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const target = e.target as HTMLButtonElement;
    const params = new URLSearchParams(searchParams);

    params.set(paramsKey, target.textContent || '');

    setSearchParams(params);
    setIsOpen(false);
  };

  return (
    <div className={styles.selector}>
      <p className={`smallText ${styles.selectorTitle}`}>{title}</p>
      <button
        type="button"
        className={styles.selectorSelected}
        onClick={toggleSelector}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      >
        {searchParams.get(paramsKey) || list[0]}
        <img src={isOpen ? arrowUp : arrowDown} alt="arrow" />
      </button>
      {isOpen && (
        <div className={styles.selectorList}>
          {list.map(el => (
            <button
              key={el}
              type="button"
              onClick={changeSelector}
            >
              {el}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
