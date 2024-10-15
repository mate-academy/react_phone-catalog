import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './Actions.module.scss';

const actions = ['favourites', 'cart'];

interface Props {
  className?: string;
}

export const Actions: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      {actions.map(action => {
        return (
          <NavLink
            key={action}
            className={({ isActive }) =>
              cn(
                `${styles.actions__item} ${styles[`actions__item--${action}`]}`,
                { [styles['actions__item--active']]: isActive },
              )
            }
            to={`/${action}`}
          >
            <span className="visually-hidden">{action}</span>
          </NavLink>
        );
      })}
    </div>
  );
};
