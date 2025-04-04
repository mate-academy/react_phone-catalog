import React from 'react';
import classNames from 'classnames';
import favouriteIcon from '../../assets/img/tools/favourite_ico.svg';
import cardIcon from '../../assets/img/tools/card_ico.svg';
import { useAppSelector } from '../../app/hooks';
import styles from './TopBarActions.module.scss';
import { useMediaQuery } from 'react-responsive';

interface Props {
  favouriteBtnClass: string;
  cardBtnClass: string;
}

const TopBarActions: React.FC<Props> = ({
  favouriteBtnClass,
  cardBtnClass,
}) => {
  const isMenu = useAppSelector(state => state.menu.isOpenMenu);
  const isMobile = useMediaQuery({ maxWidth: 640 });

  return (
    <div
      className={classNames(styles['top-bar__actions'], {
        [styles['top-bar__actions--mobile']]: isMenu && isMobile,
      })}
    >
      <a className={classNames(favouriteBtnClass)}>
        <img src={favouriteIcon} alt="favourite" />
      </a>
      <a className={classNames(cardBtnClass)}>
        <img src={cardIcon} alt="card" />
      </a>
    </div>
  );
};

export default TopBarActions;
