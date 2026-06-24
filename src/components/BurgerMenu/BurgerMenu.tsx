import classNames from 'classnames';
import burgerMenu from './BurgerMenu.module.scss';
import { useEffect } from 'react';
import { PageNavigation } from '../PageNavigation';
import { NavigationLink, NavigationLinks } from '../NavigationLink';

type Props = {
  isOpened: boolean;
  onToggle: () => void;
};

export const BurgerMenu = ({ isOpened, onToggle }: Props) => {
  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpened]);

  return (
    <div
      className={classNames(burgerMenu.overlay, {
        [burgerMenu.overlayActive]: isOpened,
      })}
    >
      <div
        className={classNames(burgerMenu.menu, {
          [burgerMenu.menuActive]: isOpened,
        })}
      >
        <PageNavigation isBurgerMenu={true} onToggle={onToggle} />
        <nav className={burgerMenu.buttons}>
          <li className={classNames(burgerMenu.button)}>
            <NavigationLink
              navigationType={NavigationLinks.Favorite}
              handleClick={onToggle}
            />
          </li>
          <li className={classNames(burgerMenu.button)}>
            <NavigationLink
              navigationType={NavigationLinks.Cart}
              handleClick={onToggle}
            />
          </li>
        </nav>
      </div>
    </div>
  );
};
