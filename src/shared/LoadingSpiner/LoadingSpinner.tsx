import React from 'react';
import s from './LoadingSpinner.module.scss';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className={s.spinner__wrapper}>
      <div className={s.spinner}></div>
    </div>
  );
};
