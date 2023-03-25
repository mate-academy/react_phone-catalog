import './breadcrumbs.scss';
import { Link, useLocation } from 'react-router-dom';
import arrow from '../icons/arrow-disabled.svg';
import home from '../icons/home.svg';

export const Breadcrumbs = () => {
  const location = useLocation();

  const arrLink = location.pathname.split('/')
    .filter((e) => e !== '%' && e !== '#' && e)
    .map((e) => e.charAt(0).toUpperCase() + e.slice(1));

  return (
    <article data-cy="breadCrumbs" className="breadcrumb">
      <ul className="breadcrumb__list">
        <li className="breadcrumb__item">
          <Link
            className="breadcrumb__home-link"
            to="/"
          >
            <img
              className="breadcrumb__img-home"
              src={home}
              alt="home"
            />
          </Link>
        </li>

        {arrLink.map((el, index, arr) => (
          <li key={`${index + arr.length}`} className="breadcrumb__item">
            <img
              className="breadcrumb__img-arrow"
              src={arrow}
              alt="arrow"
            />

            {arr.length >= 1 && index === arr.length - 1 ? (
              <p className="breadcrumb__page breadcrumb__page--light">
                {el}
              </p>
            ) : (
              <Link
                to={`/${el.toLowerCase()}`}
                className="breadcrumb__page"
              >
                {el}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </article>
  );
};
