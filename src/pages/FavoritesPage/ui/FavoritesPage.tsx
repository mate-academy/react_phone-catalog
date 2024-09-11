import { useEffect, useState } from 'react';
import {
  LOCAL_STORAGE_FAVORITES,
  Product,
  ProductsList,
} from '../../../entities/Product';
import { PagePartTop } from '../../../features/PagePartTop';
import { Section } from '../../../shared/ui/Section';
import { getFavoriteProducts } from '../model/services/getFavoriteProducts';
import { TitlePagesEnum } from '../../../widgets/Header/model/types/header';

export default function FavoritesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [favoritesKeys, setFavoritesKeys] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setProducts(prev =>
      prev.filter(item => favoritesKeys.includes(item.itemId)),
    );
  }, [favoritesKeys]);

  useEffect(() => {
    setIsLoading(true);
    getFavoriteProducts()
      .then(items => setProducts(items))
      .finally(() => setIsLoading(false));

    const handleLocalStorageChange = (event: CustomEvent) => {
      const { key, value } = event.detail;

      if (key === LOCAL_STORAGE_FAVORITES) {
        setFavoritesKeys(value);
      }
    };

    window.addEventListener(
      'localStorageChange',
      handleLocalStorageChange as EventListener,
    );

    return () => {
      window.removeEventListener(
        'localStorageChange',
        handleLocalStorageChange as EventListener,
      );
    };
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
