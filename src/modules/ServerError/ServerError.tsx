import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import { Box } from '@shared/base/Box';
import { Text } from '@shared/base/Text';

import styles from './ServerError.module.scss';

export const ServerError = () => (
  <Box className={cn('container', styles.container)}>
    <Box className={styles.content}>
      <Box className={styles.header}>
        <Text variant="h2"> Oops, something went wrong</Text>
        <NavLink to="/" className={styles.link}>
          Return to home page
        </NavLink>
      </Box>

      <img className={styles.image} src="img/product-not-found.png" alt="404" />
    </Box>
  </Box>
);
