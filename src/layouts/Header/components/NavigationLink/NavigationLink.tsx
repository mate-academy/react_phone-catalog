import { useMemo } from 'react';

import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import { Box } from '@shared/base/Box';
import { DefaultProps } from '@shared/types/common';

import styles from './NavigationLink.module.scss';

interface NavigationLinkProps extends DefaultProps {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  href: string;
  counter?: number;
}

const MAX_ALLOWED_COUNTER_VALUE = 99;

export const NavigationLink: React.FC<NavigationLinkProps> = ({
  Icon,
  href,
  className,
  counter,
  ...rest
}) => {
  const transformedCounter = useMemo(() => {
    if (!counter) {
      return null;
    }

    if (counter > MAX_ALLOWED_COUNTER_VALUE) {
      return MAX_ALLOWED_COUNTER_VALUE;
    }

    return counter;
  }, [counter]);

  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        cn(styles.navigationLink, className, {
          [styles.active]: isActive,
        })
      }
      {...rest}
    >
      <Box className={styles.iconContainer}>
        {transformedCounter && (
          <Box className={styles.counter}>{transformedCounter}</Box>
        )}

        <Icon />
      </Box>
    </NavLink>
  );
};
