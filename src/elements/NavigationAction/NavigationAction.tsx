import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import styles from './NavigationAction.module.scss';

type CommonProps = {
  children: React.ReactNode;
  badgeCount?: number;
};

type LinkProps = CommonProps & {
  as: 'link' | 'externalLink';
  onClick?: () => void;
  type: 'button' | 'text';
  to: string;
};

type ButtonProps = CommonProps & {
  as: 'button';
  onClick: () => void;
};

type Props = LinkProps | ButtonProps;

export const NavigationAction = ({ children, badgeCount, ...props }: Props) => {
  const { pathname } = useLocation();

  if (props.as === 'link') {
    return (
      <NavLink
        to={props.to}
        onClick={props.onClick}
        className={({ isActive }) =>
          classNames(styles.NavigationAction, {
            [styles['NavigationAction--button-link']]: props.type === 'button',
            [styles['NavigationAction--text']]: props.type === 'text',
            [styles['NavigationAction--active']]: isActive,
          })
        }
        state={{ pathname }}
      >
        <span className={styles.NavigationAction__iconWrapper}>
          {children}
          {!!badgeCount && (
            <span className={styles.NavigationAction__badge}>{badgeCount}</span>
          )}
        </span>
      </NavLink>
    );
  }

  if (props.as === 'externalLink') {
    return (
      <a
        href={props.to}
        rel="noopener noreferrer"
        target="_blank"
        className={classNames(styles.NavigationAction, {
          [styles['NavigationAction--text']]: props.type === 'text',
        })}
      >
        <span>{children}</span>
      </a>
    );
  }

  if (props.as === 'button') {
    return (
      <button
        type="button"
        onClick={props.onClick}
        className={classNames(
          styles.NavigationAction,
          styles['NavigationAction--button'],
          styles['NavigationAction--menu'],
        )}
      >
        {children}
      </button>
    );
  }

  return null;
};
