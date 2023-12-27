import { useContext } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ProductList } from '../../components/ProductList/ProductList';
import { ProductContext } from '../../helpers/ProductsContext';

export function FavoritesPage() {
  const { favorites } = useContext(ProductContext);

  return (
    <div className="outlet">
      <Breadcrumbs />

      <section className="outlet__content">
        <h1 className="outlet__title">Favorites</h1>
        <p className="outlet__subtitle">
          {`${favorites.length} items`}
        </p>

        <ProductList productsList={favorites} />
      </section>
    </div>
  );
}
