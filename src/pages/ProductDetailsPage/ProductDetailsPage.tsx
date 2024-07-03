import { Link } from 'react-router-dom';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import './ProductDetailsPage.scss';

export const ProductDetailsPage = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="product-details">
          <div className="product-details__active">
            <Link to="/" className="product-details__active--link">
              <svg className="icon icon-home">
                <use href="/img/icons.svg#icon-home"></use>
              </svg>
            </Link>
            <div className="product-details__active--arrow">
              <svg className="icon icon-arrow-right">
                <use href="/img/icons.svg#icon-arrow-right"></use>
              </svg>
            </div>
            <Link to="/phones" className="product-details__active--cat">
              Phones
            </Link>
            <div className="product-details__active--arrow">
              <svg className="icon icon-arrow-right">
                <use href="/img/icons.svg#icon-arrow-right"></use>
              </svg>
            </div>
            <Link to="/phones" className="product-details__active--name">
              Phones
            </Link>
          </div>

          <div className="product-details__back">
            <div className="product-details__back--arrow">
              <svg className="icon icon-arrow-left">
                <use href="/img/icons.svg#icon-arrow-left"></use>
              </svg>
            </div>
            <Link to="/" className="product-details__back--text">
              Back
            </Link>
          </div>
          <h2 className="product-details__title">
            Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
          </h2>
        </div>
      </div>
      <Footer />
    </>
  );
};
