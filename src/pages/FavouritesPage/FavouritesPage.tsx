import './FavouritesPage.scss';
import { useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductState } from '../../store/storeContext';
import { getPreparedProducts } from '../../helpers/getPreparedProducts';
import { ICONS } from '../../images/icons/Icons';
import { ProductsList } from '../../components/ProductsList/ProductsList';

export const FavouritesPage = () => {
  const { localStorage } = useContext(ProductState);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const products = [...localStorage].filter(
    product => !!product.addedToFavourites,
  );

  const [preparedProducts] = getPreparedProducts(products, query);

  return (
    <div className="favouritesPage">
      <section className="favouritesPage__navigation">
        <Link to="/" className="favouritesPage__navigation--link">
          <img src={ICONS.home} alt="Home" />
        </Link>

        <img src={ICONS.arrowRightDisabled} alt="arrow right" />

        <p className="smallText favouritesPage__navigation--path">Favourites</p>
      </section>

      {preparedProducts.length ? (
        <>
          <section className="favouritesPage__header">
            <h1>Favourites</h1>

            <p className="smallText favouritesPage__header--counter">
              {`${preparedProducts.length} items`}
            </p>
          </section>

          <section className="favouritesPage__content">
            <ProductsList products={preparedProducts} />
          </section>
        </>
      ) : (
        <h1>There no favourite products yet</h1>
      )}
    </div>
  );
};
