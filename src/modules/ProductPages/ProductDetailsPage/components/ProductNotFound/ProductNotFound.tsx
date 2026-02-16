import { Link, useNavigate } from 'react-router-dom';
import './ProductNotFound.scss';

export const ProductNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="product-not-found">
      <div className="product-not-found__content">
        <img
          src="../../public/img/page-not-found.png"
          alt="Product not found"
          className="product-not-found__image"
        />

        <h1 className="product-not-found__title">Product not found</h1>
        <p className="product-not-found__message">
          The product you are looking for doesn&apos;t exist or has been
          removed.
        </p>
        <div className="product-not-found__actions">
          <Link to="/" className="product-not-found__button">
            Go to Home Page
          </Link>
          <button
            onClick={() => navigate(-1)}
            className=" product-not-found__button product-not-found__button--secondary"
          >
            <img src="img/chevron-right.svg" alt="" />
            Back
          </button>
        </div>
      </div>
    </div>
  );
};
