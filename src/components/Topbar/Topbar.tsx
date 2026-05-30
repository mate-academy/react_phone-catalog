import React, { useContext } from 'react';
import classNames from 'classnames';

import styles from './Topbar.module.scss';
import { Logo } from '../Logo';
import { MenuContext } from '../../context/MenuProvider';

type Props = {
  icon: string;
  classNameProp?: string;
};

export const Topbar: React.FC<Props> = ({ icon, classNameProp }) => {
  const { isMenuVisible, setIsMenuVisible } = useContext(MenuContext);

  const toggleMenu = () => setIsMenuVisible(!isMenuVisible);

  return (
    <div className={classNames(styles['top-bar'], classNameProp)}>
      <Logo />

      <div className={classNames(styles['top-bar__button'])}>
        <button className={`icon icon--${icon}`} onClick={toggleMenu} />
      </div>
    </div>
  );
};
