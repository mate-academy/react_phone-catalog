import { ProductCard } from '../../components/ProductCard';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { HeadingLevel } from '../../types/HeadingLevel';
import { Title } from '../../components/Title';
import { useAppSelector } from '../../app/hooks';

export const FavouritesPage = () => {
  const products = useAppSelector(state => state.favourite);
  const productsCount = products.length;

  return (
    <>
      <Breadcrumbs />
      <Title level={HeadingLevel.h2}>Favourites</Title>
      <p className="subtitle">{productsCount} models</p>
      <div className="products">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </>
  );
};
