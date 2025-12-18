import React from 'react';
import styles from './Menu.module.scss';

type MenuProps = {
  onClose?: () => void;
};
const Menu: React.FC<MenuProps> = ({ onClose }) => {
  return (
    <div className={styles.menu__container}>
      <div onClick={onClose}>dsdfsdf</div>
      <div>213123123</div>
      <div>213123123</div>
      <div>213123123</div>
      <div>213123123</div>
      <div>213123123</div>
      <div>213123123</div>
      <div>213123123</div>
    </div>
  );
};

export default Menu;
