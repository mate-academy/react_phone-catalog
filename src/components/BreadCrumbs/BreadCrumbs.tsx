import { useLocation } from 'react-router-dom';

const normalizePathname = (pathname: string) => {
  const path = pathname.slice(1);

  return path.slice(0, 1).toUpperCase() + path.slice(1);
};

export const BreadCrumbs = () => {
  const { pathname } = useLocation();

  return (
    <div className="breadcrumbs">
      <div className="breadcrumbs__img">
        <img src="new/img/icons/home.svg" alt="home-icon" />
      </div>
      <div className="breadcrumbs__arrow">
        <img src="new/img/icons/arrow-right.svg" alt="arrow-right" />
      </div>
      <div className="breadcrumbs__path">
        <p>{normalizePathname(pathname)}</p>
      </div>

    </div>
  );
};
