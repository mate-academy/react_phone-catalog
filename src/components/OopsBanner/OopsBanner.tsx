import { Link, useLocation } from 'react-router-dom';
import './style.scss';

export const OopsBanner = () => {
  const { pathname } = useLocation();
  const page = pathname.slice(1);

  return (
    <div className="banner">
      <h2 className="banner__title">Oops!</h2>

      <p className="banner__text">
        Apologies for the inconvenience, but
        &nbsp;
        <span className="banner__pageName">
          {`${page}`}
        </span>
        &nbsp;
        are not available yet!
      </p>
      <p className="banner__textSecond">We appreciate Your understanding.</p>

      <p className="banner__textThird">
        Maybe you want to go back to
        &nbsp;
        <Link to="/" className="banner__link">Home Page</Link>
        &nbsp;
        ?
      </p>
    </div>
  );
};
