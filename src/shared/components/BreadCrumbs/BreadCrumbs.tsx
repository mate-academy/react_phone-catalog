import React from 'react';

import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import RightIcon from '@assets/images/icons/chevron-right-icon.svg?react';
import HomeIcon from '@assets/images/icons/home-icon.svg?react';

import { Box } from '@shared/base/Box';
import { Text } from '@shared/base/Text';
import { DefaultProps } from '@shared/types/common';

import styles from './BreadCrumbs.module.scss';

interface BreadCrumb {
  id: string;
  href: string;
  title: string;
}

interface BreadCrumbsProps extends DefaultProps {
  breadCrumbs: BreadCrumb[];
}

export const BreadCrumbs: React.FC<BreadCrumbsProps> = ({
  breadCrumbs,
  className,
  ...rest
}) => (
  <Box className={cn(styles.breadCrumbs, className)} {...rest}>
    <NavLink to="/" className={styles.homeLink}>
      <HomeIcon />
    </NavLink>

    {!!breadCrumbs.length && <RightIcon />}

    {breadCrumbs.map(({ id, href, title }, idx) => {
      if (idx === breadCrumbs.length - 1) {
        return (
          <Text key={id} className={styles.title} variant="small">
            {title}
          </Text>
        );
      }

      return (
        <React.Fragment key={id}>
          <NavLink to={href} className={styles.link}>
            <Text variant="small">{title}</Text>
          </NavLink>

          <RightIcon />
        </React.Fragment>
      );
    })}
  </Box>
);
