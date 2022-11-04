import { useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { ProductList } from '../../components/ProductList/ProductList';
import { BackButton } from '../../components/BackButton';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const FavoritesPage = () => {
  const { favorites } = useAppSelector(state => state.favorites);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="ProductDetailsPage__nav">
        <Breadcrumbs />
      </div>

      <BackButton />

      <h1 className="ProductPage__title">
        Favorites
      </h1>

      <span className="text text--light">
        {`${favorites.length} models`}
      </span>
      <br />
      <br />

      <div data-cy="cardsContainer">
        <ProductList productList={favorites} />
      </div>
    </>
  );
};
