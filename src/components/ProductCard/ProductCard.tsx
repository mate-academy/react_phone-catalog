import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';

type Props = {
  product: Product
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const screen = product.screen.split(' ').join('').replace('inches', '"');
  const capacity = (
    +product.capacity.replace('MB', '') / 1000).toFixed(1).concat(' GB');
  const ram = (
    +product.ram.replace('MB', '') / 1000).toFixed(1).concat(' GB');

  return (
    // <div className="is-flex is-justify-content-center">
    <div className="card is-shadowless productCard pt-5">
      <div className="card-image is-flex is-justify-content-center">
        <figure className="image productCard__image">
          <img src={product.imageUrl} alt="Card" />
        </figure>
      </div>
      <div className="card-content">
        <div className="productCard__title">
          <Link
            className="has-text-dark"
            to={`/phones/${product.id}`}
          >
            {product.name}
          </Link>
        </div>
        <div className="is-flex productCard__price mb-2">
          {product.newPrice
            ? (
              <>
                <p className="py-2 has-text-weight-bold">{`$${product.newPrice}`}</p>
                <p className="has-text-grey-light py-2 productCard__old-price">{`$${product.price}`}</p>
              </>
            )
            : (
              <p className="py-2 has-text-weight-bold">{`$${product.price}`}</p>
            )}
        </div>
        <div className="is-flex is-justify-content-space-between">
          <p className="has-text-grey-light">screen</p>
          <p className="has-text-weight-semibold">
            {screen}
          </p>
        </div>
        <div className="is-flex is-justify-content-space-between">
          <p className="has-text-grey-light">capacity</p>
          <p className="has-text-weight-semibold">{capacity}</p>
        </div>
        <div className="is-flex is-justify-content-space-between mb-2">
          <p className="has-text-grey-light">RAM</p>
          <p className="has-text-weight-semibold">{ram}</p>
        </div>
        <p className="buttons">
          <button
            type="button"
            className="
                button
                card-footer-item
                has-background-dark
                has-text-light
              "
          >
            Add to cart
          </button>
          <button
            type="button"
            className="button"
          >
            <span className="icon is-small">
              <i className="fa-regular fa-heart" />
            </span>
          </button>
        </p>
      </div>
    </div>
    // </div>
  );
};
