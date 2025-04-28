import styles from './Action.module.scss';
import cn from 'classnames';
import { StateContext } from '../../hooks/SelectionState';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import heartIcon from '../../../images/icons/Shopping bag.png';
import cartIcon from '../../../images/icons/Favourite.png';

interface Props {
  name: string;
  count: number;
  icon: 'heart' | 'cart';
}
export const Action = () => {
  const { favourites, cart } = useContext(StateContext);
  const icons = {
    heart: heartIcon,
    cart: cartIcon,
  };

  const actions: Props[] = [
    { name: 'favourites', count: favourites.length, icon: 'heart' },
    {
      name: 'cart',
      count: cart.reduce((count, a) => count + a.quantity, 0),
      icon: 'cart',
    },
  ];

  return (
    <div className={styles.action}>
      {actions.map(action => {
        const { name, icon, count } = action;

        return (
          <NavLink
            to={`/${name}`}
            key={name}
            className={({ isActive }) =>
              cn(styles.action__link, {
                [styles['action__link--active']]: isActive,
              })
            }
          >
            <img src={icons[icon]} className={styles.action__image} />
            {!!count && <p className={styles.action__count}>{count}</p>}
          </NavLink>
        );
      })}
    </div>
  );
};
