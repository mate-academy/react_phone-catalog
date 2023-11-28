import { Link, useLocation } from 'react-router-dom';
import './breadcrumbs.scss';
import HomeIcon from '../../images/icons/Home.svg';
import ArrowRight from '../../images/icons/Arrow_right_crums.svg';

export const Breadcrumbs = () => {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <>
      <div className="breadcrumbs">
        {pathnames.length > 0 && (
          <Link to="/">
            <img
              src={HomeIcon}
              alt="Home icon"
            />
          </Link>
        )}
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <div className="breadcrumbs__container" key={routeTo}>
              <img
                src={ArrowRight}
                alt="Home icon"
              />

              <span className="breadcrumbs__pageName">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </span>
            </div>

          ) : (
            <Link key={routeTo} to={routeTo}>
              /
              {name}
            </Link>
          );
        })}
      </div>
    </>
  );
};
