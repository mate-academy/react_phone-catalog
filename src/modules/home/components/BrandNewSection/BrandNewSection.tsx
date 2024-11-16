import { useEffect, useState } from 'react';

import { Box } from '@shared/base/Box';
import { ProductCard } from '@shared/components/ProductCard';
import { Slider } from '@shared/components/Slider';
import { usePagination } from '@shared/hooks/usePagination';
import { ProductModel } from '@shared/models/Product';
import { getBrandNewProducts } from '@shared/services/api';

export const BrandNewSection = () => {
  const { page, updatePagination, onNextPage } = usePagination();

  const [data, setData] = useState<ProductModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getBrandNewProducts(page).then(({ data: newData, ...paginationData }) => {
      setData(prev => [...prev, ...newData]);
      updatePagination(paginationData);
      setIsLoading(false);
    });
  }, [page]);

  return (
    <Box variant="section">
      <Slider
        isLoading={isLoading}
        data={data}
        extractKey={({ id }) => id}
        onSwiperReachEnd={onNextPage}
        renderSlide={({
          name,
          image,
          fullPrice,
          price,
          capacity,
          screen,
          ram,
        }) => (
          <ProductCard
            href="/"
            url={image}
            title={name}
            newPrice={price}
            oldPrice={fullPrice}
            features={[
              { title: 'Capacity', value: capacity },
              { title: 'Screen', value: screen },
              { title: 'Ram', value: ram },
            ]}
          />
        )}
      />
    </Box>
  );
};
