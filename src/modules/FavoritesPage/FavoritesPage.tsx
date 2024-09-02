import { useContext } from 'react';
import { AppContext } from '../../AppContext';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductsList } from '../../components/ProductsList';

export const FavoritesPage = () => {
  const { favItems } = useContext(AppContext);

  return (
    <section className="favorites page">
      <div className="container">
        <Breadcrumbs className="favorites__breadcrumbs" />
        <h1 className="favorites__title page-title">Favourites</h1>
        {favItems.length > 0 ? (
          <>
            <p className="favorites__text">{`${favItems.length} items`}</p>
            <ProductsList products={favItems} />
          </>
        ) : (
          <span className="favorites__text">Your favorites is empty</span>
        )}
      </div>
    </section>
  );
};
