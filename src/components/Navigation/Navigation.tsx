import styles from './Navigation.module.scss';
import stylesIcon from '../../styles/icon.module.scss';
import { Link, useLocation, useParams } from 'react-router-dom';
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
  const { darkTheme } = useAppSelector(state => state.darkTheme);
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
    <div className={styles.navigation__container}>
      <Link
        to="/"
        className={`${styles.navigation__link} ${styles.navigation__link__home} ${stylesIcon.icon} ${darkTheme ? stylesIcon.icon__home__dark : stylesIcon.icon__home}`}
        onClick={() => dispatch(navigationSlice.actions.clearLinks())}
      ></Link>
      <nav className={styles.navigation}>
        <ul className={styles.navigation__list}>
          {links.map((link, index) => (
            <React.Fragment key={link}>
              <li className={styles.navigation__item}>
                <div
                  className={`${styles.navigation__separator} ${stylesIcon.icon}`}
                ></div>
              </li>
              <li key={link} className={styles.navigation__item}>
                {index === 0 ? (
                  <Link
                    to={`/${link}`}
                    className={classNames(styles.navigation__link, {
                      [styles.active]: index === links.length - 1,
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
                    className={classNames(styles.navigation__link, {
                      [styles.active]: index === links.length - 1,
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
