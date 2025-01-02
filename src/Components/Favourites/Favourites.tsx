import { Link } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import favourite from './Favourites.module.scss';
import { Footer } from '../Footer/Footer';
import { useContext } from 'react';
import { CatalogContext } from '../CatalogProvider';
import { ProductCard } from '../ProductCard/ProductCard';
import classNames from 'classnames';

export const Favourites = () => {
  const { favouriteItems, themeSwitcher } = useContext(CatalogContext);

  return (
    <>
      <Navigation />
      {favouriteItems.length === 0 ? (
        <>
          <h1
            className={favourite.emptycardtitle}
            data-theme={themeSwitcher ? 'dark' : 'light'}
          >
            You have no favourite products :)
          </h1>
          <div className={favourite.emptycardimage}></div>
        </>
      ) : (
        <div
          className={favourite.favourites}
          data-theme={themeSwitcher ? 'dark' : 'light'}
        >
          <div className={favourite.breadcrumbs}>
            <Link
              className={classNames([favourite.breadcrumbs__home], {
                [favourite.breadcrumbs__homeONDARK]: themeSwitcher,
              })}
              to={'/home'}
            />
            <div className={favourite.breadcrumbs__text}> {'>'} Favourites</div>
          </div>
          <>
            <h1 className={favourite.title}>Favourite Products</h1>
            <h2
              className={favourite.amountofitems}
            >{`${favouriteItems.length} items`}</h2>
            <div className={favourite.content}>
              {favouriteItems.map(favouriteItem => {
                return (
                  <ProductCard key={favouriteItem.id} product={favouriteItem} />
                );
              })}
            </div>
          </>
        </div>
      )}

      <Footer />
    </>
  );
};
