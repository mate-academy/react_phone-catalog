import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { LOCAL_URL } from '../../api/apiProducts';
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { FavouritesContext } from '../../contexts/favouritesContext';
import { Button } from '../Button';
import cn from 'classnames';
import './ProductsCard.scss';

type Props = {
  product: Product;
  transform: number;
};

export const ProductsCard: React.FC<Props> = ({ product, transform }) => {
  const {
    id,
    image,
    name,
    price,
    fullPrice,
    category,
    itemId,
    screen,
    capacity,
    ram,
  } = product;

  const { favourites, addToFavourites } = useContext(FavouritesContext);
  const { cart, addToCart, deleteProduct } = useContext(CartContext);

  const isDiscount = price !== fullPrice;
  const isFavourite = favourites.some(item => item.id === id);
  const hasInCart = cart.some(item => item.id === id);

  const handleAddToCart = () => {
    if (!hasInCart) {
      addToCart(product);
    } else {
      deleteProduct(id);
    }
  };

  const handleAddToFavourite = () => {
    addToFavourites(product);
  };

  const transformStyle = {
    transform: `translateX(${transform}px)`,
  };

  return (
    <div className="product-card">
      <div className="product-card__container" style={transformStyle}>
        <Link
          to={`/${category}/${itemId}`}
          className="product-card__image-container"
        >
          <img
            src={`${LOCAL_URL}/${image}`}
            alt={name}
            className="product-card__image"
          />
        </Link>
        <Link to={`/${category}/${itemId}`} className="product-card__title">
          {name}
        </Link>

        <p className="product-card__price-container">
          <span className="product-card__price">${price}</span>

          {isDiscount && (
            <span className="product-card__fullprice">${fullPrice}</span>
          )}
        </p>

        <ul className="product-card__desc">
          <li className="product-card__desc--item">
            <p className="product-card__desc--title">Screen</p>
            <p className="product-card__desc--value">{screen}</p>
          </li>

          <li className="product-card__desc--item">
            <p className="product-card__desc--title">Capacity</p>
            <p className="product-card__desc--value">{capacity}</p>
          </li>

          <li className="product-card__desc--item">
            <p className="product-card__desc--title">RAM</p>
            <p className="product-card__desc--value">{ram}</p>
          </li>
        </ul>

        <div className="product-card__buttons">
          <Button selected={hasInCart} onClick={handleAddToCart}>
            {hasInCart ? 'Added' : 'Add to cart'}
          </Button>
          <Button icon="favourite" onClick={handleAddToFavourite}>
            <i
              className={cn('icon icon--favourite', {
                'icon--favourite--selected': isFavourite,
              })}
            ></i>
          </Button>
        </div>
      </div>
    </div>
  );
};
