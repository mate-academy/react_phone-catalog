import { useContext } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { FavContext } from '../../components/contexts/FavContextProvider';
import { NoSearchResults } from '../../components/NoSearchResults';
import { ProductsList } from '../../components/ProductsList';
import { handleProductsFilter } from '../../helpers/calc/helper';
import './style.scss';

export const FavPage: React.FC = () => {
  const { favItems } = useContext(FavContext);
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const hasFavItems = favItems?.length !== 0 && favItems;
  const filteredProducts = handleProductsFilter(favItems || [], searchParams);
  const isFilteredProductsEmpty
    = filteredProducts.length === 0 && favItems?.length !== 0;

  return (
    <section className="fav-page">
      <Breadcrumbs pathes={[pathname]} />
      <h1 className="fav-page__title title title--large">
        Favourites
      </h1>
      <p className="fav-page__amount">
        {`${filteredProducts.length} items`}
      </p>
      {hasFavItems ? (
        <ProductsList products={filteredProducts} />
      ) : (
        <h2 className="title title--large">
          You don`t have favorites
        </h2>
      )}

      {isFilteredProductsEmpty && (
        <NoSearchResults />
      )}
    </section>
  );
};
