import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './ProductNotFound.scss';

export const ProductNotFound = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { category } = useParams();

  return (
    <div className="product-not-found">
      <h2 className="product-not-found__title">Product was not found!</h2>

      <div className="product-not-found__container">
        <img
          src="img/product-not-found.png"
          alt="product-not-found"
          className="product-not-found__image"
        />
      </div>

      <button
        className="product-not-found__button"
        onClick={() => navigate({ search: state?.search })}
      >
        <i className="product-not-found__button-icon">&lt;</i>
        Back to {category}
      </button>
    </div>
  );
};
