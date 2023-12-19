import { useContext, useMemo } from 'react';
import { Favourites } from '../components/Favourites/Favourites';
import { TechProductsContext } from '../stores/TechProductsContext';
import { BreadcrumbsMenu } from '../components/BreadcrumbsMenu/BreadcrumbsMenu';

export const FavouritesPage = () => {
  const {
    favouritesProducts,
    query,
  } = useContext(TechProductsContext);

  const filterFavouriteProducts = useMemo(() => {
    const filterTechProducts = query
      ? favouritesProducts.filter((product) => {
        return product.name.trim().toLowerCase()
          .includes(query.trim().toLowerCase());
      }) : favouritesProducts;

    return filterTechProducts;
  }, [favouritesProducts, query]);

  return (
    <section className="App__favourites favourites-page">
      <div className="container">
        <div className="favourites-pages__content">
          {
            !query && (
              <>
                <BreadcrumbsMenu
                  category="Favourites"
                />

                <h1 className="favourites-page__title">
                  Favourites
                </h1>
              </>
            )
          }

          {
            filterFavouriteProducts.length > 0
              ? <Favourites favoriteProd={filterFavouriteProducts} />
              : <h3>You have not favourite products</h3>
          }
        </div>
      </div>
    </section>
  );
};
