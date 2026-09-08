import { NavLink } from 'react-router-dom';
import styles from './LinkNavigate.module.scss';
import classNames from 'classnames';

type Props = {
  title: string;
  path: string;
};

export const LinkNavigate: React.FC<Props> = ({ title, path }) => {
  return (
    <>
      <NavLink
        to={path}
        className={({ isActive }) =>
          classNames(styles.linkNavigate, {
            [styles['linkNavigate--active']]: isActive,
          })
        }
      >
        <div className={styles.linkNavigate__text}>{title}</div>
      </NavLink>
    </>
  );
};
