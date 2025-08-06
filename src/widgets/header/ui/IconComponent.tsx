import { NavAriaLabels, RoutePath } from '@shared/types';
import { NavLink } from 'react-router-dom';

type Props = {
  ariaName: NavAriaLabels;
  to: RoutePath;
  icon: React.ComponentType;
};

export const UIButtonMenu: React.FC<Props> = ({ ariaName, to, icon }) => {
  const IconComponent: React.ComponentType = icon;

  return (
    <NavLink to={to} aria-label={ariaName}>
      <IconComponent />
    </NavLink>
  );
};
