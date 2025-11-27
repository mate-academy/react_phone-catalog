import { useNavigate } from 'react-router-dom';
import scss from './ProductNotFound.module.scss';

export const ProductNotFound = () => {
  const navigate = useNavigate();

  return (
    <section className={scss.productNotFound}>
      <h2>Product was not found</h2>
      <img
        src="/img/product-not-found.png"
        className={scss.productNotFound__image}
        alt="Product not found"
      ></img>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className={scss.productNotFound__button}
      >
        Go back to previous page
      </button>
    </section>
  );
};
