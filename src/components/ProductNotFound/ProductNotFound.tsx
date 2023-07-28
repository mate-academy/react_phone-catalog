import { useNavigate } from 'react-router-dom';
import './ProductNotFound.scss';

export const ProductNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="product-not-found">
      <h1 className="product-not-found__title">
        Unfortunately, the product was not found
      </h1>
      <button
        type="button"
        className="no-results__button rectangular-button"
        onClick={() => navigate('/')}
      >
        Visit Home page
      </button>
    </div>
  );
};
