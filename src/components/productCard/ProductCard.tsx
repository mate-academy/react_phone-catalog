import { useContext } from 'react';
import './ProductCard.scss';
import { Link, useLocation } from 'react-router-dom';
import { ProductsContext } from '../../context/ProductsContext';
import { Product } from '../../types/Product';
import { getNewId } from '../../services/utils/getNewId';

type Props = {
  image: string;
  name: string;
  price: number;
  fullPrice: number;
  screen: string;
  capacity: string;
  ram: string;
  product: Product;
  newModels?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  image,
  name,
  price,
  fullPrice,
  screen,
  capacity,
  ram,
  product,
  newModels,
}) => {
  const location = useLocation();

  const context = useContext(ProductsContext);
  const { favorites, addFavorites, deleteFromFavorites } = context;
  const { cart, addCart, deleteFromCart } = context;

  const handlerAddToFavorites = () => {
    if (favorites.includes(product)) {
      deleteFromFavorites(product);
    } else {
      addFavorites(product);
    }
  };

  const handlerAddToCart = () => {
    const cartProduct = cart.find(item => item.product.id === product.id);

    if (cartProduct) {
      deleteFromCart(cartProduct.id);
    } else {
      const newProduct = {
        id: getNewId(cart),
        product,
        quantity: 1,
      };

      addCart(newProduct);
    }
  };

  return (
    <article data-cy="cardsContainer">
      <div className="card">
        <div className="card__image-container">
          <Link
            to={`../${product.category}/${product.itemId}`}
            state={{
              location,
            }}
          >
            <img src={`./${image}`} alt="product" className="card__image" />
          </Link>
        </div>
        <div className="card__content">
          <div className="card__title-container">
            <p className="card__title">{name}</p>
          </div>

          <div className="card__prices">
            <p className="card__price">{`$${price}`}</p>
            {!newModels && (
              <p className="card__full-price">{`$${fullPrice}`}</p>
            )}
          </div>

          <div className="card__divider" />

          <div className="card__spec">
            <p className="card__spec-name">Screen</p>
            <p className="card__spec-value">{screen}</p>
          </div>

          <div className="card__spec">
            <p className="card__spec-name">Capacity</p>
            <p className="card__spec-value">{capacity}</p>
          </div>

          <div className="card__spec">
            <p className="card__spec-name">RAM</p>
            <p className="card__spec-value">{ram}</p>
          </div>

          <div className="card__actions">
            {cart.some(item => item.product.id === product.id) ? (
              <button
                type="button"
                onClick={handlerAddToCart}
                className="card__button card__button--added"
              >
                <span />
                <span />
                <span />
                <span />
                Added to cart
              </button>
            ) : (
              <button
                type="button"
                onClick={handlerAddToCart}
                className="card__button card__button--add"
              >
                <span />
                <span />
                <span />
                <span />
                Add to cart
              </button>
            )}

            {favorites.includes(product) ? (
              <button
                type="button"
                onClick={handlerAddToFavorites}
                className="card__button card__button--favorite-red"
              >
                <span />
                <span />
                <span />
                <span />
                {}
              </button>
            ) : (
              <button
                type="button"
                onClick={handlerAddToFavorites}
                className="card__button card__button--favorite-white"
              >
                <span />
                <span />
                <span />
                <span />
                {}
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
