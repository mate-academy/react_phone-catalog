import React from 'react';
import { Link } from 'react-router-dom';
import style from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <>
      <footer className={style.footer}>
        <Link to="/">
          <img src="img/Logo.png" alt="Logo" />
        </Link>
        <Link to="https://github.com/ogchy">
          <p>GitHub</p>
        </Link>
        <Link to="/">
          <p>Contacts</p>
        </Link>
        <Link to="/">
          <p>Rights</p>
        </Link>
      </footer>
    </>
  );
};
