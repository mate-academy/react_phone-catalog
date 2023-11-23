import './MenuMobile.scss';
import { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Logo from '../../icons/LOGO.svg';
import PageNavlink from '../PageNavLink/PageNavLink';
/*
    eslint-disable jsx-a11y/click-events-have-key-events,
    jsx-a11y/no-noninteractive-element-interactions
  */
const MenuMobile = () => {
  const [link, setLink] = useState(false);

  return (
    <div className={classNames('menu', {
      'menu--active': link,
    })}
    >
      <div className="menu__container">
        <div className="menu__top">
          <Link
            to="/"
            onClick={() => setLink(true)}
          >
            <img
              src={Logo}
              alt="logo"
              className="logo"
            />
          </Link>
          <div
            role="button"
            className="menu__close"
            onClick={() => setLink(true)}
            onKeyPress={() => {}}
            tabIndex={-1}
          >
            <button
              aria-label="menu__close"
              type="button"
              className="menu__close-button"
            />
          </div>
        </div>

        <div className="menu__content">
          <nav className="menu__content__nav">
            <li onClick={() => setLink(true)}>
              <PageNavlink to="/" text="Home" />
            </li>
            <li onClick={() => setLink(true)}>
              <PageNavlink to="phones" text="Phones" />
            </li>
            <li onClick={() => setLink(true)}>
              <PageNavlink to="tablets" text="Tablets" />
            </li>
            <li onClick={() => setLink(true)}>
              <PageNavlink to="accessories" text="Accessories" />
            </li>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MenuMobile;
