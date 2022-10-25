import { Link, useLocation } from 'react-router-dom';
import './UrlNavigation.scss';

export const UrlNavigation = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      <div className="page__urlNavigation UrlNavigation">
        <Link to="/" className="icon UrlNavigation__home" />
        <i className="icon UrlNavigation__arrowLeft" />
        <div className="UrlNavigation__name">
          {path[1].toUpperCase() + path.slice(2)}
        </div>
      </div>
    </>
  );
};
