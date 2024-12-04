import { Link } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import favourite from './Favourites.module.scss';
import { Footer } from '../Footer/Footer';
import { useContext } from 'react';
import { CatalogContext } from '../CatalogProvider';
import { ProductCard } from '../ProductCard/ProductCard';

export const Favourites = () => {
  const { favouriteItems } = useContext(CatalogContext);

  return (
    <>
      <Navigation />
      {favouriteItems.length === 0 ? (
        <>
          <h1 className={favourite.favourites__emptycardtitle}>
            You have no favourite products :)
          </h1>
          <div className={favourite.favourites__emptycardimage}></div>
        </>
      ) : (
        <div className={favourite.favourites}>
          <div className={favourite.favourites__breadcrumbs}>
            <Link
              className={favourite.favourites__breadcrumbshome}
              to={'/home'}
            />
            <div className={favourite.favourites__breadcrumbstext}>
              {' '}
              {'>'} Favourites
            </div>
          </div>
          <>
            <h1 className={favourite.favourites__title}>Favourite Products</h1>
            <h2
              className={favourite.favourites__amountofitems}
            >{`${favouriteItems.length} items`}</h2>

            <div className={favourite.favourites__content}>
              {favouriteItems.map(favouriteItem => (
                <ProductCard key={favouriteItem.id} product={favouriteItem} />
              ))}
            </div>
          </>
        </div>
      )}

      <Footer />
    </>
  );
};
