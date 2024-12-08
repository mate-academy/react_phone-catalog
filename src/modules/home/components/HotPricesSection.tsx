import { Box } from '@shared/base/Box';
import { ProductCard } from '@shared/components/ProductCard';
import { Slider } from '@shared/components/Slider';
import { useProductCoversQuery } from '@shared/hooks/useProductCoversQuery';
import { getHotProductsCovers } from '@shared/services/api';

export const HotPricesSection = () => {
  const { isLoading, isInitialLoading, products, onLoadNextProducts } =
    useProductCoversQuery({ queryFn: getHotProductsCovers });

  return (
    <Box variant="section">
      <Slider
        title="Hot prices"
        isLoading={isLoading}
        isInitialLoading={isInitialLoading}
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
            fromHref="/"
            features={[
              { title: 'Capacity', value: capacity },
              { title: 'Screen', value: screen },
              { title: 'RAM', value: ram },
            ]}
          />
        )}
      />
    </Box>
  );
};
