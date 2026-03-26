import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Carousel } from '@/components/ui/Carousel/Carousel';
import { ProductCard } from '@/features/products/components/ProductCard';
import { fetchAllProducts } from '@/api/products';
import { fetchPhoneDetails } from '@/api/phoneDetails';
import { getHotPrices } from '@/utils/getHotPrices';

export const HotPricesSection = () => {
  const { t } = useTranslation();

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });

  const { data: details = [] } = useQuery({
    queryKey: ['productDetails'],
    queryFn: fetchPhoneDetails,
  });

  const hotProducts = getHotPrices(products, details, 10);

  return (
    <Carousel title={t('titles.hotPrices')}>
      {hotProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Carousel>
  );
};
