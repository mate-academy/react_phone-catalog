import { Link, useLocation } from 'react-router-dom';
import { Product } from '../../../../types/Product';
import './ProductTop.scss';

interface Props {
  product: Product | null;
}

export const ProductTop: React.FC<Props> = ({ product }) => {
  const { state } = useLocation();

  if (product === null) {
    return null;
  }

  const from = state?.from ?? 'Home';

  return (
    <section className="product-top">
      <div className="product-top__content">
        <nav>
          <ul className="product-top__breadcrumb">
            <li>
              <Link className="product-top__breadcrumb-icon" to="/">
                <img src="/icons/icon-house.svg" alt="Icon House" />
              </Link>
            </li>

            <div className="product-top__breadcrumb-arrow-right"></div>

            <p className="product-top__breadcrumb-path-0">{from}</p>

            <div className="product-top__breadcrumb-arrow-right"></div>

            <p className="product-top__breadcrumb-path-1">{product.name}</p>
          </ul>
        </nav>

        <div className="product-top__back">
          <div className="product-top__back-arrow-left"></div>

          <Link to="/phones">
            <button className="product-top__back-button">Back</button>
          </Link>
        </div>

        <h1 className="product-top__h1">{product.name}</h1>
      </div>
    </section>
  );
};
