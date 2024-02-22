import { useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { StateStore } from '../../store/StoreContext';
import { getTrimmedProducts } from '../../helpers/getTrimmedProducts';
import { ICONS } from '../../images/icons/icons';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import './FavouritesPage.scss';

export const FavouritesPage = () => {
  const { localStorage } = useContext(StateStore);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const products = [...localStorage]
    .filter(product => !!product.addedToFavourites);

  const [trimmedProducts] = getTrimmedProducts(products, query);

  return (
    <div className="favouritesPage">
      <section className="favouritesPage__navigation">
        <Link to="/" className="favouritesPage__navigation--link">
          <img src={ICONS.home} alt="Home" />
        </Link>
        <img
          src={ICONS.arrowRightDisabled}
          alt="Arrow right"
        />
        <p className="smallText favouritesPage__navigation--path">
          Favourites
        </p>
      </section>

      {
        trimmedProducts.length
          ? (
            <>
              <section className="favouritesPage__header">
                <h1>Favourites</h1>

                <p className="smallText favouritesPage__header--counter">
                  {
                    trimmedProducts.length === 1
                      ? `${trimmedProducts.length} item`
                      : `${trimmedProducts.length} items`
                  }
                </p>
              </section>

              <section className="favouritesPage__content">
                <ProductsList products={trimmedProducts} />
              </section>
            </>
          ) : (
            <h1>{`You didn't add any product with '${query}' yet`}</h1>
          )
      }
    </div>
  );
};
