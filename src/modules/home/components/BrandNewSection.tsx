import { Box } from '@shared/base/Box';
import { ProductCard } from '@shared/components/ProductCard';
import { Slider } from '@shared/components/Slider';
import { useProductCoversQuery } from '@shared/hooks/useProductCoversQuery';
import { getBrandNewProductsCovers } from '@shared/services/api';

export const BrandNewSection = () => {
  const { isLoading, isInitialLoading, products, onLoadNextProducts } =
    useProductCoversQuery({ queryFn: getBrandNewProductsCovers });

  return (
    <Box variant="section">
      <Slider
        title="Brand new models"
        isLoading={isLoading}
        isInitialLoading={isInitialLoading}
        data={products}
        extractKey={({ id }) => id}
        onSlideChange={onLoadNextProducts}
        renderSlide={({
          name,
          image,
          category,
          fullPrice,
          price,
          capacity,
          screen,
          ram,
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
