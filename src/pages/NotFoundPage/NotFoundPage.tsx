import { Link } from 'react-router-dom';

import './index.scss';
import { ICONS } from '../../images';

export const NotFoundPage = () => {
  return (
    <div className="notFoundPage">
      <section className="notFoundPage__nav">
        <Link to="/" className="notFoundPage__nav__link">
          <img src={ICONS.home} alt="Home" />
        </Link>
        <img src={ICONS.arrowRightDisabled} alt="Arrow right" />
        <p className="notFoundPage__nav__path text">Undefined page</p>
      </section>

      <h1 className="notFoundPage__title">Page not found</h1>
    </div>
  );
};
