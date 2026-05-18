import { useEffect } from 'react';
import { ProductCard } from '../../components/ProductCard';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { HeadingLevel } from '../../types/HeadingLevel';
import { Title } from '../../components/Title';
import { useAppSelector } from '../../app/hooks';
import { Product } from '../../types/Product';

export const FavouritesPage = () => {
  const products = useAppSelector(state => state.favourite);
  const productsCount = products.length;

  useEffect(() => {}, []);

  return (
    <>
      <Breadcrumbs />
      <Title level={HeadingLevel.h2}>Favourites</Title>
      <p className="subtitle">{productsCount} models</p>
      <div className="products">
        {products.length === 0 ? (
          <p>No favourite products found.</p>
        ) : (
          products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </>
  );
};
