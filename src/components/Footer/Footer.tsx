import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useAppSelector } from '../../utils/store';

type Props = {
  id: string;
};

export const Footer: React.FC<Props> = ({ id }) => {
  const theme = useAppSelector(state => state.theme);

  return (
    <footer className="footer">
      <div className="footer__logo__wrapper">
        <div className="footer__logo">
          <a
            href="#home"
            className={cn('footer__logo__image', {
              'is-dark': theme === 'dark',
            })}
          ></a>
        </div>
      </div>

      <nav className="footer__nav">
        <ul className="footer__nav__list">
          <li>
            <Link
              to="https://indigo04.github.io/react_phone-catalog/"
              className="nav__link"
            >
              Github
            </Link>
          </li>
          <li>
            <Link to="/contacts" className="nav__link">
              Contacts
            </Link>
          </li>
          <li>
            <Link to="/rights" className="nav__link">
              Rights
            </Link>
          </li>
        </ul>
      </nav>

      <div className="back">
        <a href="#home" className="back__text">
          Back to top
        </a>
        <div className="arrow__button">
          <a className="up__arrow button" href={`#${id}`}></a>
        </div>
      </div>
    </footer>
  );
};
