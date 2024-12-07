import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

import { Box } from '@shared/base/Box';
import { EmptyProducts } from '@shared/components/EmptyProducts';
import {
  CARD_HEIGHT_DESKTOP,
  CARD_HEIGHT_MOBILE,
  CARD_HEIGHT_TABLET,
  ProductCard,
} from '@shared/components/ProductCard';
import { Skeleton } from '@shared/components/Skeleton';
import { useMedia } from '@shared/hooks/useMedia';
import { ProductModel } from '@shared/types/Product';

import styles from './ProductsCards.module.scss';
import {
  CARDS_SKELETON_QUANTITY_DESKTOP,
  CARDS_SKELETON_QUANTITY_MOBILE,
  CARDS_SKELETON_QUANTITY_TABLET,
} from './utils/constants';

interface ProductsCardsProps {
  products?: ProductModel[] | null;
  isLoading: boolean;
}

export const ProductsCards: React.FC<ProductsCardsProps> = ({
  products,
  isLoading,
}) => {
  const [searchParams] = useSearchParams();
  const { isDesktop, isTablet } = useMedia();

  const { height: skeletonHeight, quantity: skeletonQuantity } = useMemo(() => {
    if (isDesktop) {
      return {
        height: CARD_HEIGHT_DESKTOP,
        quantity: CARDS_SKELETON_QUANTITY_DESKTOP,
      };
    }

    if (isTablet) {
      return {
        height: CARD_HEIGHT_TABLET,
        quantity: CARDS_SKELETON_QUANTITY_TABLET,
      };
    }

    return {
      height: CARD_HEIGHT_MOBILE,
      quantity: CARDS_SKELETON_QUANTITY_MOBILE,
    };
  }, [isDesktop, isTablet]);

  if (isLoading) {
    return (
      <Skeleton
        quantity={skeletonQuantity}
        className={styles.skeleton}
        height={skeletonHeight}
      />
    );
  }

  if (!products || !products?.length) {
    return <EmptyProducts />;
  }

  return (
    <Box className={styles.cards} variant="section">
      {products.map(
        ({
          id,
          name,
          priceRegular,
          priceDiscount,
          images,
          capacity,
          screen,
          category,
          ram,
        }) => (
          <ProductCard
            key={id}
            className={styles.card}
            href={`${id}?category=${category}`}
            fromHref={`/products?category=${searchParams.get('category')}`}
            title={name}
            newPrice={priceDiscount}
            oldPrice={priceRegular}
            productId={id}
            url={images[0]}
            features={[
              {
                title: 'Screen',
                value: screen,
              },
              {
                title: 'Capacity',
                value: capacity,
              },
              {
                title: 'RAM',
                value: ram,
              },
            ]}
          />
        ),
      )}
    </Box>
  );
};
