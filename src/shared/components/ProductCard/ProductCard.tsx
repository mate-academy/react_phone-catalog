import { NavLink } from 'react-router-dom';

import { Box } from '@shared/base/Box';
import { Text } from '@shared/base/Text';

import styles from './ProductCard.module.scss';

export const ProductCard = () => {
  return (
    <Box className={styles.card}>
      <NavLink to="/" className={styles.link}>
        <img src="/public/img/phones/apple-iphone-14/midnight/00.webp" />
      </NavLink>

      <Box className={styles.description}>
        <Text className={styles.title} variant="body">
          Apple iPhone Xs 64GB Silver (iMT9G2FS/A)
        </Text>

        <Box className={styles.price}>
          <Text className={styles.new} variant="h3">
            $799
          </Text>

          <Text className={styles.old} variant="crossed-out">
            $899
          </Text>
        </Box>
      </Box>

      <Box className={styles.feature}>
        <Box className={styles.featureRow}>
          <Text variant="small">Screen</Text>
          <Text variant="small">5.8 Oled</Text>
        </Box>

        <Box className={styles.featureRow}>
          <Text variant="small">Screen</Text>
          <Text variant="small">5.8 Oled</Text>
        </Box>

        <Box className={styles.featureRow}>
          <Text variant="small">Screen</Text>
          <Text variant="small">5.8 Oled</Text>
        </Box>
      </Box>
    </Box>
  );
};
