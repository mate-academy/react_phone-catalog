import { NavLink } from 'react-router-dom';

import { Box } from '@shared/base/Box';
import { Text } from '@shared/base/Text';
import { formatNumberToCurrency } from '@shared/utils/currencyFormatters';

import styles from './ProductCard.module.scss';

interface ProductCardFeatureProps {
  title: string;
  value: string;
}

interface ProductCardProps {
  href: string;
  url: string;
  title: string;
  oldPrice: number;
  newPrice: number;
  features?: ProductCardFeatureProps[];
}

export const ProductCard: React.FC<ProductCardProps> = ({
  href,
  url,
  title,
  oldPrice,
  newPrice,
  features,
}) => (
  <Box className={styles.card}>
    <NavLink to={href} className={styles.imgLink}>
      <img src={url} />
    </NavLink>

    <Box className={styles.description}>
      <NavLink to={href} className={styles.titleLink}>
        <Text className={styles.title} variant="body" title={title}>
          {title}
        </Text>
      </NavLink>

      <Box className={styles.price}>
        <Text className={styles.new} variant="h3">
          {formatNumberToCurrency(newPrice)}
        </Text>

        {oldPrice && (
          <Text className={styles.old} variant="crossed-out">
            {formatNumberToCurrency(oldPrice)}
          </Text>
        )}
      </Box>
    </Box>

    {features && (
      <Box className={styles.feature}>
        {features
          .filter(({ value }) => !!value)
          .map(({ title: featureTitle, value }) => (
            <Box key={featureTitle} className={styles.featureRow}>
              <Text variant="small">{featureTitle}</Text>
              <Text variant="small">{value}</Text>
            </Box>
          ))}
      </Box>
    )}
  </Box>
);
