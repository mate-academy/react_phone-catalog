import { useGlobalData } from '@app/appContext';
import { ItemsCounter } from '@shared/icons';
import { NavAriaLabels, RoutePath } from '@shared/types';
import { NavLink } from 'react-router-dom';

type Props = {
  ariaName: NavAriaLabels;
  to: RoutePath;
  icon: React.ComponentType;
};

export const HeaderUINavLink: React.FC<Props> = ({ ariaName, to, icon }) => {
  const { cartAmount, favAmount } = useGlobalData();
  const IconComponent: React.ComponentType = icon;
  const amount = ariaName === NavAriaLabels.Cart ? cartAmount : favAmount;

  return (
    <NavLink to={to} aria-label={ariaName}>
      <IconComponent />
      {amount > 0 && <ItemsCounter amount={amount} />}
    </NavLink>
  );
};
