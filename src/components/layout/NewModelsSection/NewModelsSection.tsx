import { fetchAllProducts } from '@/api/products';
import { Carousel } from '@/components/ui/Carousel';
import { ProductCard } from '@/features/products/components/ProductCard';
import { getNewestModels } from '@/utils/getNewestModels';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export const NewModelsSection = () => {
  const { t } = useTranslation();

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', 'newest'],
    queryFn: fetchAllProducts,
    select: data => getNewestModels(data, 10),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Carousel title={t('titles.brandNew')}>
      {products?.map(product => (
        <ProductCard key={product.id} product={product} />
      )) ?? []}
    </Carousel>
  );
};
