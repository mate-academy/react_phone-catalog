import { Link } from 'react-router-dom';
import { Product } from '../../../../types/ProductCard';
import './ProductCard.scss';
import { useContext } from 'react';
import { CartContext } from '../../../../context/AppContext';
import classNames from 'classnames';
import { FavoritesContext } from '../../../../context/FavoritesContext';

type Props = {
  product: Product;
  hasDiscount?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  hasDiscount = false,
}) => {
  const { cartProducts, addToCart, removeFromCart } = useContext(CartContext);

  const { favoriteProducts, setFavoriteProducts } =
    useContext(FavoritesContext);

  const { name, price, screen, capacity, ram } = product;

  const image =
    'images' in product && Array.isArray(product.images)
      ? product.images[0]
      : product.image;

  const favoriteIconPath = favoriteProducts.some(
    (prod: Product) => prod.id === product.id,
  )
    ? './icons/heart-red.svg'
    : './icons/heart-black.svg';

  const isProductInCart = product.id in cartProducts;

  const handleAddToFavorites = (newFavoriteProduct: Product) => {
    if (favoriteProducts.some((prod: Product) => prod.id === product.id)) {
      setFavoriteProducts((currentFavorites: Product[]) => {
        return currentFavorites.filter(
          (prod: Product) => prod.id !== newFavoriteProduct.id,
        );
      });
    } else {
      setFavoriteProducts((currentFavorites: Product[]) => [
        ...currentFavorites,
        newFavoriteProduct,
      ]);
    }
  };

  return (
    <article className="product">
      <Link
        to={`/product/${product.itemId}`}
        className="product__image-wrapper"
      >
        <img
          src={image}
          className="product__image"
          alt="Image of the product"
        />
      </Link>
      <Link to={`/product/${product.itemId}`} className="product__name-wrapper">
        <h3 className="product__name">{name}</h3>
      </Link>
      <div className="product__price-wrapper">
        <p className="product__price">${price}</p>
        {hasDiscount && (
          <p className="product__price product__price--old">
            ${product.fullPrice}
          </p>
        )}
      </div>

      <hr className="product__divider" />

      <div className="details product__details">
        <div className="detail details__detail">
          <p className="detail__title">Screen</p>
          <p className="detail__info">{screen}</p>
        </div>
        <div className="detail details__detail">
          <p className="detail__title">Capacity</p>
          <p className="detail__info">{capacity}</p>
        </div>
        <div className="detail details__detail">
          <p className="detail__title">RAM</p>
          <p className="detail__info">{ram}</p>
        </div>
      </div>

      <div className="buttons">
        <button
          className={classNames('buttons__cart', {
            'buttons__cart--added': isProductInCart,
          })}
          onClick={() => {
            if (!isProductInCart) {
              addToCart(product);
            } else {
              removeFromCart(product.id);
            }
          }}
        >
          {isProductInCart ? 'In cart' : 'Add to cart'}
        </button>
        <button
          onClick={() => handleAddToFavorites(product)}
          className="favorite-button buttons__favorite"
        >
          <img
            className="favorite-button__icon"
            src={favoriteIconPath}
            alt="Heart icon image"
          />
        </button>
      </div>
    </article>
  );
};
