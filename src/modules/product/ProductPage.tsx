import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';

import { Box } from '@shared/base/Box';
import { ProductCard } from '@shared/components/ProductCard';
import { Slider } from '@shared/components/Slider';
import { useProductCoversQuery } from '@shared/hooks/useProductCoversQuery';
import { getHotProductsCovers } from '@shared/services/api';

import { ProductAbout } from './components/ProductAbout';
import { ProductGallery } from './components/ProductGallery';
import { ProductHeader } from './components/ProductHeader';
import { ProductInfo } from './components/ProductInfo';
import { ProductTechSpecs } from './components/ProductTechSpecs';
import { useProductPage } from './hooks/useProductPage';
import styles from './ProductPage.module.scss';

export const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const { product, features, isLoading } = useProductPage();
  const {
    isLoading: isHotProductsLoading,
    isInitialLoading: isHotProductsInitialLoading,
    products,
    onLoadNextProducts,
  } = useProductCoversQuery({
    excludeId: product?.id,
    queryFn: getHotProductsCovers,
  });

  return (
    <Box className={cn('container', styles.page)}>
      <ProductHeader
        isLoading={isLoading}
        productId={product?.id}
        category={product?.category}
        productName={product?.name}
      />

      <Box className={styles.details}>
        <ProductGallery
          key={product?.id}
          images={product?.images}
          title={product?.name}
          className={styles.gallery}
          isLoading={isLoading}
        />

        <ProductInfo
          id={product?.id}
          className={styles.info}
          colors={product?.colorsAvailable}
          currentColor={product?.color}
          capacities={product?.capacityAvailable}
          currentCapacity={product?.capacity}
          newPrice={product?.priceDiscount}
          oldPrice={product?.priceRegular}
          isLoading={isLoading}
          productName={product?.name}
          features={features}
        />
      </Box>

      <Box className={styles.description}>
        <ProductAbout
          className={styles.about}
          description={product?.description}
          isLoading={isLoading}
        />

        <ProductTechSpecs
          className={styles.specs}
          isLoading={isLoading}
          {...product}
        />
      </Box>

      <Box className={styles.carousel}>
        <Slider
          title="You may also like"
          isLoading={isHotProductsLoading}
          isInitialLoading={isHotProductsInitialLoading}
          data={products}
          extractKey={({ id }) => id}
          onSlideChange={onLoadNextProducts}
          renderSlide={({
            name,
            image,
            fullPrice,
            price,
            capacity,
            screen,
            ram,
            category,
            itemId,
          }) => (
            <ProductCard
              href={`/products/${itemId}?category=${category}`}
              url={image}
              title={name}
              newPrice={price}
              oldPrice={fullPrice}
              productId={itemId}
              fromHref={`/products/${product?.id}?${new URLSearchParams(searchParams)}`}
              features={[
                { title: 'Capacity', value: capacity },
                { title: 'Screen', value: screen },
                { title: 'RAM', value: ram },
              ]}
            />
          )}
        />
      </Box>
    </Box>
  );
};
