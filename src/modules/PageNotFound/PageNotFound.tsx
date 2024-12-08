import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import { Box } from '@shared/base/Box';
import { Text } from '@shared/base/Text';

import styles from './PageNotFound.module.scss';

export const PageNotFound = () => {
  return (
    <Box className={cn('container', styles.container)}>
      <Box className={styles.content}>
        <Box className={styles.header}>
          <Text variant="h2">This page doesn&apos;t exist</Text>
          <NavLink to="/" className={styles.link}>
            Return to home page
          </NavLink>
        </Box>

        <img className={styles.image} src="img/page-not-found.png" alt="404" />
      </Box>
    </Box>
  );
};
