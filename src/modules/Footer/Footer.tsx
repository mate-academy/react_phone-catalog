import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export const Footer = () => {
  const [clickOnLogoBar, setClickOnLogoBar] = useState(false);

  useEffect(() => {
    localStorage.setItem('clickOnLogoBar', JSON.stringify(clickOnLogoBar));
  }, [clickOnLogoBar]);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const checkClickOnLogoBar = () => {
    if (clickOnLogoBar === true) {
      setClickOnLogoBar(false);
    } else {
      setClickOnLogoBar(true);
    }
  };

  return (
    <footer
      data-cy="footer"
      className="footer is-fixed-top has-shadow"
      role="footer"
      aria-label="main footer"
    >
      <ul className="footer__brand">
        <NavLink
          className="footer__link__logo"
          to="/"
          onClick={() => {
            setClickOnLogoBar(true);
            checkClickOnLogoBar();
          }}
        >
          <img src="./img/navbar/Logo.png" alt="logo-gadgets" />
        </NavLink>

        {['github', 'contacts', 'rights'].map((item, index) => (
          <li className="footer__item" key={index}>
            <NavLink
              className={({ isActive }) =>
                classNames('footer__link', {
                  'has-background-grey-lighter': isActive,
                })
              }
              to={
                item === 'github'
                  ? 'https://github.com/vikaruda?tab=repositories'
                  : `/${item}`
              }
              target={item === 'github' ? '_blank' : undefined}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="footer__right">
        <NavLink
          aria-current="page"
          className={({ isActive }) =>
            classNames('footer__link', {
              'has-background-grey-lighter': isActive,
            })
          }
          to="/top"
        >
          Back to top
        </NavLink>
        <button className="footer__button" onClick={scrollTop}></button>
      </div>
    </footer>
  );
};
