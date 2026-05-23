import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={s.notFound}>
      <h1 className={s.title}>Page not found</h1>
      <button className={s.backButton} onClick={() => navigate('/')}>
        Go to Home
      </button>
    </div>
  );
};
