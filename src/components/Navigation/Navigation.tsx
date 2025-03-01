import { Link, useLocation, useParams } from 'react-router-dom';
import './Navigation.scss';
import { translate } from '../../utils/translate';
import React, { useContext, useEffect } from 'react';
import { LangContext } from '../../context/LangContext';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { capitalize } from '../../utils/capitalize';
import { navigationSlice } from '../../features/navigationSlice';
import classNames from 'classnames';

export const Navigation = () => {
  const { phones } = useAppSelector(state => state.phones);
  const { tablets } = useAppSelector(state => state.tablets);
  const { accessories } = useAppSelector(state => state.accessories);
  const { lang } = useContext(LangContext);
  const { links } = useAppSelector(state => state.navigation);
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      const itemById =
        phones.find(product => product.id === id) ||
        tablets.find(product => product.id === id) ||
        accessories.find(product => product.id === id);

      dispatch(navigationSlice.actions.clearLinks());
      dispatch(navigationSlice.actions.addLink(`${itemById?.category}`));
      dispatch(navigationSlice.actions.addLink(`${itemById?.name}`));
    } else {
      dispatch(navigationSlice.actions.clearLinks());
      dispatch(
        navigationSlice.actions.addLink(`${location.pathname.slice(1)}`),
      );
    }
  }, [id]);

  return (
    <div className="navigation__container">
      <Link
        to="/"
        className="navigation__link navigation__link--home icon icon--home"
        onClick={() => dispatch(navigationSlice.actions.clearLinks())}
      ></Link>
      <nav className="navigation">
        <ul className="navigation__list">
          {links.map((link, index) => (
            <React.Fragment key={link}>
              <li className="navigation__item">
                <div className="navigation__separator icon"></div>
              </li>
              <li key={link} className="navigation__item">
                {index === 0 ? (
                  <Link
                    to={`/${link}`}
                    className={classNames('navigation__link', {
                      'is-active': index === links.length - 1,
                    })}
                    onClick={() =>
                      dispatch(
                        navigationSlice.actions.removeGood(
                          `${links[links.length - 1]}`,
                        ),
                      )
                    }
                  >
                    {capitalize(translate(`link.${link}`, lang))}
                  </Link>
                ) : (
                  <Link
                    to={`/${link}`}
                    className={classNames('navigation__link', {
                      'is-active': index === links.length - 1,
                    })}
                  >
                    {link}
                  </Link>
                )}
              </li>
            </React.Fragment>
          ))}
        </ul>
      </nav>
    </div>
  );
};
