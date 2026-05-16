import React from 'react';
import { Link } from 'react-router-dom';
import style from './NoFoundPage.module.scss';

export const NoFoundPage: React.FC = () => (
  <div className={style.container}>
    <img
      src="img/page-not-found.png"
      alt="page not found"
      className={style.img}
    />
    <p>
      <Link to="/" className={style.goHome}>
        Go Home
      </Link>
    </p>
  </div>
);
