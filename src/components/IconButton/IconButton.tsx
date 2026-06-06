import { Link, NavLink } from 'react-router-dom';
import styles from './IconButton.module.scss';
import classNames from 'classnames';

type Props = {
  badgeCount: number;
  path: string;
  icon: string;
  descriptions: string;
  variant: 'header' | 'mobileMenu';
};

export const IconButton: React.FC<Props> = ({
  badgeCount,
  path,
  icon,
  descriptions,
  variant,
}) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        classNames(styles.iconContainer, {
          [styles.active]: isActive,
          [styles.header]: variant === 'header',
          [styles.mobileMenu]: variant === 'mobileMenu',
        })
      }
    >
      <img src={icon} alt={descriptions} className={styles.imgSize} />

      {badgeCount > 0 && (
        <div
          className={classNames(styles.totalQuantityAndLikes, {
            [styles.badgeHeader]: variant === 'header',
            [styles.badgeMobile]: variant === 'mobileMenu',
          })}
        >
          {badgeCount}
        </div>
      )}
    </NavLink>
  );
};

export default IconButton;
