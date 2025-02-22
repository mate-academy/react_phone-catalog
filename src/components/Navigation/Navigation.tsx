import { Link } from 'react-router-dom';
import './Navigation.scss';
import { translate } from '../../utils/translate';
import React, { useContext } from 'react';
import { LangContext } from '../../context/LangContext';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { capitalize } from '../../utils/capitalize';
import { navigationSlice } from '../../features/navigationSlice';

export const Navigation = () => {
  const { lang } = useContext(LangContext);
  const { links } = useAppSelector(state => state.navigation);
  const dispatch = useAppDispatch();

  return (
    <div className="navigation__container">
      <Link
        to="/"
        className="navigation__link icon icon--home"
        onClick={() => dispatch(navigationSlice.actions.clearLinks())}
      ></Link>
      <nav className="navigation">
        <ul className="navigation__list">
          {links.map(link => (
            <React.Fragment key={link}>
              <li className="navigation__item">
                <div className="navigation__separator icon"></div>
              </li>
              <li key={link} className="navigation__item">
                <Link to={`/${link}`} className="navigation__link">
                  {capitalize(translate(`link.${link}`, lang))}
                </Link>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </nav>
    </div>
  );
};
