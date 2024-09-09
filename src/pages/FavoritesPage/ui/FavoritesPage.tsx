import { useEffect, useState } from 'react';
import { Product, ProductsList } from '../../../entities/Product';
import { PagePartTop } from '../../../features/PagePartTop';
import { Section } from '../../../shared/ui/Section';
import { getFavoriteProducts } from '../model/services/getFavoriteProducts';
import { TitlePagesEnum } from '../../../widgets/Header/model/types/header';

export default function FavoritesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getFavoriteProducts()
      .then(items => setProducts(items))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Section firstSection lastSection>
      <PagePartTop
        title={TitlePagesEnum.favorites}
        productsCount={products.length}
      />
      <ProductsList isLoading={isLoading} products={products} />
    </Section>
  );
}
