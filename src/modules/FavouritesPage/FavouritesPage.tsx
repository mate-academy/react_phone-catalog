import { useContext } from 'react';
import { FavContext } from '../shared/context/FavContext';
import { Main } from '../../components/Main/Main';
import { ProductGrid } from '../../components/ProductGrid';
import { PageTop } from '../../components/PageTop';
import { ErrorContent } from '../../components/ErrorContent/ErrorContent';

export const FavouritesPage = () => {
  const { favouritesProducts } = useContext(FavContext);

  return (
    <Main className="favourites">
      <PageTop
        titleText="Favourites"
        titleLevel={1}
        modelsAmount={favouritesProducts.length}
        itemsContent={'items'}
      />

      {favouritesProducts.length === 0 ? (
        <ErrorContent
          loading={false}
          error={false}
          products={0}
          category="favourites yet"
        />
      ) : (
        <ProductGrid products={favouritesProducts} />
      )}
    </Main>
  );
};
