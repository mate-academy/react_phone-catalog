import { useGlobalData, useNavigationTracker } from '@features/index';
import { ItemsCounter } from '@shared/icons';
import { NavAriaLabels, RoutePath } from '@shared/types';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from '../../styles/buttonLink.module.scss';

type Props = {
  ariaName: NavAriaLabels;
  to: RoutePath;
  icon: React.ComponentType;
};

export const HeaderButtonNavLink: React.FC<Props> = ({
  ariaName,
  to,
  icon,
}) => {
  const { cartAmount, favAmount } = useGlobalData();
  const { trackLinkHandler } = useNavigationTracker();
  const IconComponent: React.ComponentType = icon;
  const amount = ariaName === NavAriaLabels.Cart ? cartAmount : favAmount;

  return (
    <NavLink
      to={to}
      aria-label={ariaName}
      className={({ isActive }) =>
        classNames([styles['nav-link']], {
          [styles['nav-link--is-active']]: isActive,
        })
      }
      onClick={e => trackLinkHandler(e, to)}
    >
      <IconComponent />
      {amount > 0 && <ItemsCounter amount={amount} />}
    </NavLink>
  );
};
