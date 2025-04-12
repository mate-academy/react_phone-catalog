import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';
import styles from './TopBarActions.module.scss';
import { useMediaQuery } from 'react-responsive';
import HeartIco from '../Icons/Heart/Heart';
import CartIco from '../Icons/Cart/CartIco';
import { storage } from '../../app/localStorage';

interface Props {
  favouriteBtnClass: string;
  cardBtnClass: string;
}

const TopBarActions: React.FC<Props> = ({
  favouriteBtnClass,
  cardBtnClass,
}) => {
  const isMenu = useAppSelector(state => state.store.isOpenMenu);
  const isMobile = useMediaQuery({ maxWidth: 640 });

  const [favourites, setFavouritesCount] = useState(
    () => storage.getAllItems<string>('favourites')?.length || 0,
  );
  const [cart, setCartCount] = useState(
    () => storage.getAllItems<string>('cart')?.length || 0,
  );

  useEffect(() => {
    const handleStorageUpdate = (e: StorageEvent | CustomEvent) => {
      if (e instanceof StorageEvent) {
        if (e.key === 'favourites') {
          setFavouritesCount(storage.getAllItems('favourites')?.length || 0);
        }

        if (e.key === 'cart') {
          setCartCount(storage.getAllItems('cart')?.length || 0);
        }
      }

      if (e instanceof CustomEvent && e.type === 'localStorageChange') {
        const { key } = e.detail;

        if (key === 'favourites') {
          setFavouritesCount(prev =>
            e.detail.action === 'add' ? prev + 1 : prev - 1,
          );
        }

        if (key === 'cart') {
          setCartCount(prev =>
            e.detail.action === 'add' ? prev + 1 : prev - 1,
          );
        }
      }
    };

    window.addEventListener('storage', handleStorageUpdate);
    window.addEventListener(
      'localStorageChange',
      handleStorageUpdate as EventListener,
    );

    return () => {
      window.removeEventListener('storage', handleStorageUpdate);
      window.removeEventListener(
        'localStorageChange',
        handleStorageUpdate as EventListener,
      );
    };
  }, []);

  return (
    <div
      className={classNames(styles['top-bar__actions'], {
        [styles['top-bar__actions--mobile']]: isMenu && isMobile,
      })}
    >
      <a className={classNames(favouriteBtnClass)}>
        <HeartIco counter={favourites} />
      </a>
      <a className={classNames(cardBtnClass)}>
        <CartIco counter={cart} />
      </a>
    </div>
  );
};

export default TopBarActions;
