import classNames from 'classnames';
import { Nav } from '../Nav';
import styles from './BurgerMenu.module.scss';
import { useEffect } from 'react';
import { FavoritesButton } from '../FavoritesButton';
import { CartButton } from '../CartButton';

interface Props {
  className?: string;
  isOpen: boolean;
}

export const BurgerMenu = ({ isOpen, className }: Props) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div
      className={classNames(
        styles.burgerMenu,
        { [styles.isOpen]: isOpen },
        className,
      )}
    >
      <Nav />

      <div className={styles.buttons}>
        <FavoritesButton className={styles.link} />
        <CartButton className={styles.link} />
      </div>
    </div>
  );
};
