import { NavLink, useLocation } from 'react-router-dom';
import { Icon } from '../Icon';
import classNames from 'classnames';

type Props = {
  className?: string;
};

function capitalizeFirstLetter(str: string) {
  if (str.length === 0) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('breadcrumbs__link', { 'breadcrumbs__link--active': isActive });

export const Breadcrumbs: React.FC<Props> = ({ className = '' }) => {
  const category = useLocation().pathname.split('/').join('');

  return (
    <ul className={`breadcrumbs ${className}`.trim()}>
      <li className="breadcrumbs__item">
        <NavLink className="breadcrumbs__btn" to="/">
          <Icon iconName="icon-home" />
        </NavLink>
      </li>
      <Icon iconName="icon-arrow-right" />
      <li className="breadcrumbs__item">
        <NavLink className={getLinkClass} to={`/${category}`}>
          {capitalizeFirstLetter(`${category}`)}
        </NavLink>
      </li>
    </ul>
  );
};
