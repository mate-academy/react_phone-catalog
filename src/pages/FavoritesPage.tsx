import { useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { NavbarContext } from '../context/NavbarContext';

export const FavoritesPage = () => {
  const [searchParams] = useSearchParams();
  const { likedDevices } = useContext(NavbarContext);

  return (
    <div className="container container--min-h">
      <div className="favorites">
        <div className="devices__way-wrapper">
          <Link
            to={{
              pathname: '/',
              search: searchParams.toString(),
            }}
            className="devices__way devices__way-home"
          />
          <div className="devices__way devices__way-middle" />
          <div className="devices__way-devices">Favorites</div>
        </div>
        <h1 className="devices__title">Favorites</h1>
        <p className="favorites__amount">
          {`${likedDevices.length} items`}
        </p>

        {!!likedDevices.length && (
          <div className="favorites__card-wrapper">
            {likedDevices.map((device) => (
              <ProductCard product={device} />
            ))}
          </div>
        )}
        {!likedDevices.length && (
          <p className="cart-total__empty">There are no favorites devices</p>
        )}
      </div>
    </div>
  );
};
