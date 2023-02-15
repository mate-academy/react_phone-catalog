import { Link, useLocation, useParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import './Breadcrumbs.scss';

type Props = {
  products?: Product[];
};

export const Breadcrumbs: React.FC<Props> = ({ products }) => {
  const location = useLocation();
  const { productId } = useParams();
  const activeProduct
    = products && products.find((element) => element.id === productId);

  return (
    <div className="breadcrumbs" data-cy="breadCrumbs">
      <Link to="/" className="breadcrumbs__link">
        <img src="../../img/home.svg" alt="home" className="icon" />
      </Link>

      <img
        src="../../img/arrowRightDisabled.svg"
        alt="arrowLeft"
      />

      {location.pathname === '/phones'
        && <p className="breadcrumbs__category">Phones</p>}

      {location.pathname === '/tablets'
        && <p className="breadcrumbs__category">Tablets</p>}

      {location.pathname === '/accessories'
        && <p className="breadcrumbs__category">Accessories</p>}

      {location.pathname === '/favourites'
        && <p className="breadcrumbs__category">Favourites</p>}

      {location.pathname.includes('/phones') && productId
        && (
          <Link to="/phones" className="breadcrumbs__category--link">
            Phones
          </Link>
        )}

      {location.pathname.includes('/tablets') && productId
        && (
          <Link to="/tablets" className="breadcrumbs__category--link">
            Tablets
          </Link>
        )}

      {location.pathname.includes('/accessories') && productId
        && (
          <Link to="/accessories" className="breadcrumbs__category--link">
            Accessories
          </Link>
        )}

      {productId && (
        <>
          <img
            src="../../img/arrowRightDisabled.svg"
            alt="arrowLeft"
          />

          <p className="breadcrumbs__activeProduct">
            {activeProduct && activeProduct.name}
          </p>
        </>
      )}
    </div>
  );
};
