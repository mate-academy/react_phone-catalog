import { NavLink } from 'react-router-dom';

interface Props {
  path: string,
  type: string,
  text: string,
  amount: number,
}

export const CategoryNavLink:React.FC<Props> = ({
  path,
  type,
  text,
  amount,
}) => {
  return (
    <div className="category-nav__nav-link">
      <NavLink
        to={path}
        className={`category-nav__link-image category-nav__link-image--${type}`}
      >
        {}
      </NavLink>
      <NavLink
        to={path}
        className="category-nav__link-text"
      >
        {text}
      </NavLink>
      <div className="amount-subtitle">
        {amount}
        {' '}
        models
      </div>
    </div>
  );
};
