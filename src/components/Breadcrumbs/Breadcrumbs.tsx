import { useLocation, Link } from 'react-router-dom';
import './style.scss';

const prepareCrumb = (crumb: string) => {
  return crumb
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};

export const Breadcrumbs = () => {
  const location = useLocation();

  let currentLink = '';
  const crumbs = location.pathname.split('/')
    .filter(crumb => crumb !== '')
    .map(crumb => {
      currentLink += `/${crumb}`;

      return (
        <Link
          className="crumb"
          key={crumb}
          to={currentLink}
        >
          <img
            className="crumb__icon"
            src="/icons/chevron-right.svg"
            alt="Arrow rigth"
          />
          <span className="crumb__text">{prepareCrumb(crumb)}</span>
        </Link>
      );
    });

  return (
    <div className="breadcrumbs">
      <Link
        className="crumb"
        to="/"
      >
        <img
          className="crumb__icon"
          src="/icons/home.svg"
          alt="home"
        />
      </Link>
      {crumbs}
    </div>
  );
};
