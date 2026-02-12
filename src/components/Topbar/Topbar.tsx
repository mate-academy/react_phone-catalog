import styles from './Topbar.module.scss';
import { Logo } from '../Logo';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { MenuContext } from '../../context/MenuProvider';

interface Props {
  icon: string;
  classNameProp?: string;
}

export const Topbar: React.FC<Props> = ({ icon, classNameProp }) => {
  const { isVisibleMenu, setIsVisibleMenu } = useContext(MenuContext);

  const toggleMenu = () => setIsVisibleMenu(!isVisibleMenu);

  return (
    <div className={classNames(styles['top-bar'], classNameProp)}>
      <Logo />

      <div className={classNames(styles['top-bar__button'])}>
        <button
          className={`icon icon--${icon}`}
          type="button"
          onClick={toggleMenu}
        ></button>
      </div>
    </div>
  );
};
