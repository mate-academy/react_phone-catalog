import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { Icon } from '../Icon/Icon';

import styles from './Actions.module.scss';

type Props = {
  variant?: 'header' | 'menu';
  onActionClick?: () => void;
};

export const Actions: React.FC<Props> = ({
  variant = 'header',
  onActionClick,
}) => {
  const { getTotalCount } = useCart();
  const { favorites } = useFavorites();

  const actions = [
    { name: 'favourites', icon: 'heart', count: favorites.length },
    { name: 'cart', icon: 'cart', count: getTotalCount() },
  ];

  return (
    <div className={cn(styles.actions, styles[`actions--${variant}`])}>
      {actions.map(({ name, icon, count }) => (
        <NavLink
          key={name}
          to={`/${name}`}
          className={({ isActive }) =>
            cn(styles['actions__icon-container'], {
              [styles['actions__icon-container--active']]: isActive,
              [styles[`actions__icon-container--${variant}`]]: variant,
            })
          }
          onClick={onActionClick}
        >
          <div className={styles['actions__icon-wrapper']}>
            <Icon name={icon} />

            {count > 0 && (
              <span className={styles.actions__counter}>{count}</span>
            )}
          </div>
        </NavLink>
      ))}
    </div>
  );
};
