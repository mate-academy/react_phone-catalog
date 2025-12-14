import { useState } from 'react';
import styles from './Buttons.module.scss';

export const Buttons = () => {
  const [isActive, setIsActive] = useState(false);

  const hasInShopingCart = false;

  const handleClickHeart = () => {
    setIsActive(prev => !prev);
  };

  return (
    <div className={styles.buttons}>
      <button
        className={hasInShopingCart ? styles.button__added : styles.button}
      >
        {hasInShopingCart ? 'Added' : 'Add to cart'}
      </button>

      <div className={styles.button__heart} onClick={handleClickHeart}>
        <div className={isActive ? styles.heart__active : styles.heart}></div>
      </div>
    </div>
  );
};
