import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import styles from './TopBarActions.module.scss';
import { useMediaQuery } from 'react-responsive';
import HeartIco from '../Icons/Heart/Heart';
import CartIco from '../Icons/Cart/CartIco';
import { Link } from 'react-router-dom';
import { toggleMenu } from '../../features/settingsSlice';

interface Props {
  favouriteBtnClass: string;
  cardBtnClass: string;
}

const TopBarActions: React.FC<Props> = ({
  favouriteBtnClass,
  cardBtnClass,
}) => {
  const favourites = useAppSelector(state => state.favourite);
  const cart = useAppSelector(state => state.cart.cart);

  const dispatch = useAppDispatch();
  const isMenu = useAppSelector(state => state.store.isOpenMenu);
  const isMobile = useMediaQuery({ maxWidth: 640 });

  const cartCount = cart.reduce((acc, cur) => acc + cur.quantity, 0);
  const favCount = favourites.length;

  const handleClick = () => {
    dispatch(toggleMenu());
  };

  return (
    <div
      className={classNames(styles['top-bar__actions'], {
        [styles['top-bar__actions--mobile']]: isMenu && isMobile,
      })}
    >
      <Link
        to={'./favourites'}
        className={classNames(favouriteBtnClass)}
        onClick={handleClick}
      >
        <HeartIco counter={favCount} />
      </Link>
      <Link
        to={'./cart'}
        className={classNames(cardBtnClass)}
        onClick={handleClick}
      >
        <CartIco counter={cartCount} />
      </Link>
    </div>
  );
};

export default TopBarActions;
