import classNames from 'classnames';
import { NavMenu } from '../NavMenu';
import { RightButtons } from '../RightButtons';
import s from './BurgerMenu.module.scss';
import { useContext } from 'react';
import { BurgerContext } from '../../../context/BurgerContext';

export const BurgerMenu = () => {
  const { burgerMenuActivate } = useContext(BurgerContext);

  return (
    <div
      className={classNames(s.burger, {
        [s.burger_enter]: burgerMenuActivate,
      })}
    >
      <NavMenu burgerMenu={true} />
      <RightButtons burgerMenu={true} />
    </div>
  );
};
