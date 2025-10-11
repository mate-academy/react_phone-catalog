import { NavLink, useLocation } from "react-router-dom";
import './breadcrumbs.scss';

const pageNames: Record<string, string> = {
  '/phones': 'Phones',
  '/tablets': 'Tablets',
  '/accessories': 'Accessories',
};

export const Breadcrumbs = () => {
  const location = useLocation();
  const name = pageNames[location.pathname];

  if (!name) return null;

  return (
    <div className="breadcrumbs">
      <NavLink to="/" className="breadcrumbs__home"></NavLink>
      <p className="breadcrumbs--arrow">&gt;</p>
      <p className="breadcrumbs__name">{name}</p>
    </div>
  );
};
