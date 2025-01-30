import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './Actions.module.scss';
import { useContext } from 'react';
import { StateContext } from '../../../../contex/State';
import { SvgIcon } from '../../../../components/SvgIcon';

interface Props {
  className?: string;
}

interface Action {
  name: string;
  count: number;
  icon: 'heart' | 'cart';
}

export const Actions: React.FC<Props> = ({ className }) => {
  const { favourites, cart } = useContext(StateContext);

  const actions: Action[] = [
    { name: 'favourites', count: favourites.length, icon: 'heart' },
    {
      name: 'cart',
      count: cart.reduce((count, p) => count + p.quantity, 0),
      icon: 'cart',
    },
  ];

  return (
    <div className={className}>
      {actions.map(action => {
        const { name, count, icon } = action;

        return (
          <NavLink
            key={name}
            className={({ isActive }) =>
              cn(styles.actions__item, {
                [styles['actions__item--active']]: isActive,
              })
            }
            to={`/${name}`}
          >
            <SvgIcon type={icon} />
            {!!count && <p className={styles.actions__count}>{count}</p>}
            <span className="visually-hidden">{name}</span>
          </NavLink>
        );
      })}
    </div>
  );
};
