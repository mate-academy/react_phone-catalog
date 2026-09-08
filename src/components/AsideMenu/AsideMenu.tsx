import React from 'react';
import { Navigation } from '../Navigation';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { useMediaQuery } from 'react-responsive';
import TopBarActions from '../TopBarActions/TopBarActions';
import styles from './AsideMenu.module.scss';

const AsideMenu = () => {
  const isMenu = useAppSelector(state => state.store.isOpenMenu);
  const isTablet = useMediaQuery({ minWidth: 639 });

  if (isTablet) {
    return;
  }

  return (
    <aside
      className={classNames('page__menu', {
        'page__menu--active': isMenu,
      })}
    >
      <Navigation />

      <TopBarActions
        favouriteBtnClass={classNames(
          styles['bottom-action'],
          styles['bottom-action--favourite'],
        )}
        cardBtnClass={classNames(
          styles['bottom-action'],
          styles['bottom-action--card'],
        )}
      />
    </aside>
  );
};

export default AsideMenu;
