import { useGlobalData } from '@app/appContext';
import { ItemsCounter } from '@shared/icons';
import { NavAriaLabels, RoutePath } from '@shared/types';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  ariaName: NavAriaLabels;
  to: RoutePath;
  icon: React.ComponentType;
  className: string;
};

export const HeaderButtonNavLink: React.FC<Props> = ({
  ariaName,
  to,
  icon,
  className,
}) => {
  const { cartAmount, favAmount } = useGlobalData();
  const IconComponent: React.ComponentType = icon;
  const amount = ariaName === NavAriaLabels.Cart ? cartAmount : favAmount;

  return (
    <NavLink
      to={to}
      aria-label={ariaName}
      className={({ isActive }) => classNames({ [`${className}`]: isActive })}
    >
      <IconComponent />
      {amount > 0 && <ItemsCounter amount={amount} />}
    </NavLink>
  );
};
