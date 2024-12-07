import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import { Box } from '@shared/base/Box';
import { Text } from '@shared/base/Text';
import { formatNumberToCurrency } from '@shared/utils/currencyFormatters';

import styles from './ProductCard.module.scss';
import { AddToCartBtn } from '../AddToCartBtn';
import { FavoritesButton } from '../FavoritesButton';

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
  productId: string;
  className?: string;
  fromHref?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  href,
  url,
  title,
  oldPrice,
  newPrice,
  productId,
  features,
  className,
  fromHref,
}) => (
  <Box className={cn(styles.card, className)}>
    <NavLink to={href} className={styles.imgLink} state={{ from: fromHref }}>
      <img src={url} />
    </NavLink>

    <Box className={styles.description}>
      <NavLink
        to={href}
        className={styles.titleLink}
        state={{ from: fromHref }}
      >
        <Text className={styles.title} variant="body" title={title}>
          {title}
        </Text>
      </NavLink>

      <Box className={styles.price}>
        {newPrice && (
          <Text variant="h3">{formatNumberToCurrency(newPrice)}</Text>
        )}

        {oldPrice && (
          <Text
            className={styles.old}
            variant={newPrice ? 'crossed-out' : 'h3'}
          >
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

    <Box className={styles.buttons}>
      <AddToCartBtn
        className={styles.addToCartBtn}
        productId={productId}
        title={title}
      />

      <FavoritesButton productId={productId} title={title} />
    </Box>
  </Box>
);
