import { Link } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import './Favourites.module.scss';
import { Footer } from '../Footer/Footer';
import { useContext } from 'react';
import { CatalogContext } from '../CatalogProvider';
import { ProductCard } from '../ProductCard/ProductCard';
import { DiscountProduct } from '../OldProductCard/OldProductCard';

export const Favourites = () => {
  const { favouriteItems, favouriteOldItems } = useContext(CatalogContext);

  return (
    <>
      <Navigation />
      {favouriteItems.length === 0 && favouriteOldItems.length === 0 ? (
        <>
          <h1 className="favourites__empty-card--title">
            You have no favourite products :)
          </h1>
          <div className="favourites__empty-card--image"></div>
        </>
      ) : (
        <div className="favourites">
          <div className="favourites__breadcrumbs">
            <Link className="favourites__breadcrumbs--home" to={'/home'} />
            <div className="favourites__breadcrumbs--text">
              {' '}
              {'>'} Favourites
            </div>
          </div>
          {favouriteItems.length !== 0 && (
            <>
              <h1 className="favourites__title">Favourite Products</h1>
              <h2 className="favourites__amountofitems">{`${favouriteItems.length} items`}</h2>

              <div className="favourites__content">
                {favouriteItems.map(favouriteItem => (
                  <ProductCard key={favouriteItem.id} product={favouriteItem} />
                ))}
              </div>
            </>
          )}
          {favouriteOldItems.length !== 0 && (
            <>
              <h1 className="favourites__title">Favourite Old Products</h1>
              <h2 className="favourites__amountofitems">{`${favouriteOldItems.length} items`}</h2>
              <div className="favourites__content">
                {favouriteOldItems.map(oldItem => (
                  <DiscountProduct key={oldItem.id} discountProduct={oldItem} />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <Footer />
    </>
  );
};
