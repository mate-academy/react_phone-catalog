import React from 'react';
import style from './ButtonAdd.module.scss';

type Props = {
  title: string;
  onClick?: () => void;
};

export const ButtonAdd: React.FC<Props> = ({ title, onClick }) => {
  return (
    <button className={style.buttonAdd} onClick={onClick}>
      {title}
    </button>
  );
};
