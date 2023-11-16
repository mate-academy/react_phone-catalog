import { useProducts } from '../../comonents/ProductContext';
import { ProductList } from '../../comonents/ProductList';
import { SortProducts } from '../../helpers/utils/sortProducts';
import { NoSearchResults } from '../../comonents/NoSearchResults';
import { BreadCrumbs } from '../../comonents/BreadCrumbs';

import '../../style/block/page.scss';

export const FavouritesPage = () => {
  const { favourites, query } = useProducts();
  const sortedFavourites = SortProducts(favourites, '', query);
  const { length } = favourites;

  const renderContext = () => {
    if (length === 0) {
      return 'You dont have any favourites';
    }

    if (query && sortedFavourites.length === 0) {
      return <NoSearchResults />;
    }

    return <ProductList productsForCurrentPage={sortedFavourites} />;
  };

  return (
    <section className="page">
      <BreadCrumbs linkName="Favourites" />

      <h1 className="text text--h1 page__title">
        Favourites
      </h1>

      {length > 0 && (
        <p className="text text--gray">
          {length === 1 ? (
            '1 item'
          ) : (
            `${length} items`
          )}
        </p>
      )}

      <div className="page__fav-container">
        {renderContext()}
      </div>
    </section>
  );
};
