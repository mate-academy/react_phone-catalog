import style from './Actions.module.scss';
import cn from 'classnames';
import { StateContext } from './../../../hooks/SelectionState';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import cartIcon from './../../../../public/icon/Shopping bag (Cart).png';
import heartIcon from './../../../../public/icon/Vector (Stroke).png';

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
    <div className={style.action}>
      {actions.map(action => {
        const { name, icon, count } = action;

        return (
          <NavLink
            to={`/${name}`}
            key={name}
            className={({ isActive }) =>
              cn(style.action__link, {
                [style['action__link--active']]: isActive,
              })
            }
          >
            <img src={icons[icon]} className={style.action__image} />
            {!!count && <p className={style.action__count}>{count}</p>}
          </NavLink>
        );
      })}
    </div>
  );
};
