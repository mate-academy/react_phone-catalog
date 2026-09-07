import React from 'react';
import style from './Icons.module.scss';
import { CloseIcon } from './CloseIcon';

interface Props {
  isOpen: boolean;
  onClick: () => void;
}

export const BurgerMenu: React.FC<Props> = ({ isOpen, onClick }) => {
  return (
    <div className={style.icon} onClick={onClick}>
      {isOpen ? <CloseIcon /> : <span className={style.icon__burger}></span>}
    </div>
  );
};
