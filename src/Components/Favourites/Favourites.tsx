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
          <h1 className={favourite.emptycardtitle}>
            You have no favourite products :)
          </h1>
          <div className={favourite.emptycardimage}></div>
        </>
      ) : (
        <div className={favourite.favourites}>
          <div className={favourite.breadcrumbs}>
            <Link className={favourite.breadcrumbs__home} to={'/home'} />
            <div className={favourite.breadcrumbs__text}> {'>'} Favourites</div>
          </div>
          <>
            <h1 className={favourite.title}>Favourite Products</h1>
            <h2
              className={favourite.amountofitems}
            >{`${favouriteItems.length} items`}</h2>

            <div className={favourite.content}>
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
