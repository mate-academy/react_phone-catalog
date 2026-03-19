import { NavLink } from 'react-router-dom';
import { Icon } from '../Icon';
import style from './IconNavLink.module.scss';
import { IconName } from '../../constants/icons';

type Props = {
  to: string;
  iconName: IconName;
  className: string | ((props: { isActive: boolean }) => string);
  onClick?: () => void;
  ariaLabel: string;
  qty?: number;
};
export const IconNavLink: React.FC<Props> = props => {
  const { to, iconName, className, onClick, ariaLabel, qty = 0 } = props;

  return (
    <NavLink
      className={className}
      to={to}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <div className={style.navIconContent}>
        <Icon name={iconName} />
        {qty > 0 && <p className={style.qty}>{qty}</p>}
      </div>
    </NavLink>
  );
};
