import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import { DefaultProps } from '@shared/types/common';

import styles from './NavigationLink.module.scss';

interface NavigationLinkProps extends DefaultProps {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  href: string;
}

export const NavigationLink: React.FC<NavigationLinkProps> = ({
  Icon,
  href,
  className,
  ...rest
}) => (
  <NavLink
    to={href}
    className={({ isActive }) =>
      cn(styles.navigationLink, className, {
        [styles.active]: isActive,
      })
    }
    {...rest}
  >
    <Icon />
  </NavLink>
);
