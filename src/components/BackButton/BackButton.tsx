import React from 'react';
import style from './BackButton.module.scss';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { ArrowIconLeft } from '../Icons/ArrowIconLeft';

interface Props {
  className?: string;
}

export const BackButton: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();

  return (
    <button
      className={classNames(style.back_button, { className })}
      onClick={() => navigate(-1)}
    >
      <ArrowIconLeft active={true} />

      <span className={style.back_button__title}>Back</span>
    </button>
  );
};
