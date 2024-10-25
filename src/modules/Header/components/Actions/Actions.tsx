import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './Actions.module.scss';
import { useContext } from 'react';
import { StateContext } from '../../../../contex/State';

interface Props {
  className?: string;
}

export const Actions: React.FC<Props> = ({ className }) => {
  const { favourites, cart } = useContext(StateContext);

  const actions = [
    { name: 'favourites', count: favourites.length },
    { name: 'cart', count: cart.length },
  ];

  return (
    <div className={className}>
      {actions.map(action => {
        const { name, count } = action;

        return (
          <NavLink
            key={name}
            className={({ isActive }) =>
              cn(
                `${styles.actions__item} ${styles[`actions__item--${name}`]}`,
                { [styles['actions__item--active']]: isActive },
              )
            }
            to={`/${name}`}
          >
            {!!count && <p className={styles.actions__count}>{count}</p>}
            <span className="visually-hidden">{name}</span>
          </NavLink>
        );
      })}
    </div>
  );
};
