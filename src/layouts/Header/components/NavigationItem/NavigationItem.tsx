import React from 'react';

import cn from 'classnames';
import { NavLink, useSearchParams } from 'react-router-dom';

import { ListItem } from '@shared/base/ListItem';
import { Text } from '@shared/base/Text';

import styles from './NavigationItem.module.scss';

interface NavigationItemProps {
  queryName: string;
  link?: {
    className?: string;
  };
  className?: string;
  href: string;
  title: string;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  className,
  href,
  title,
  queryName,
  link,
}) => {
  const [searchParams] = useSearchParams();

  const categoryParam = searchParams.get('category');

  return (
    <ListItem className={className}>
      <NavLink
        to={href}
        className={({ isActive }) => {
          const isActivePage = categoryParam
            ? categoryParam === queryName
            : isActive;

          return cn(styles.link, link?.className, {
            [styles.active]: isActivePage,
          });
        }}
      >
        <Text variant="uppercase" className={styles.text}>
          {title}
        </Text>
      </NavLink>
    </ListItem>
  );
};
