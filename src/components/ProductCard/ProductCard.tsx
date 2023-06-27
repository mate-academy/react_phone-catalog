import { Link } from 'react-router-dom';

import { Product } from '../../types/product';
import { PrimaryButton } from '../UI/PrimaryButton/PrimaryButton';
import { FavButton } from '../UI/FavButton/FavButton';
import './ProductCard.scss';
import { useCart } from '../../contexts/cartContext';

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const {
    image,
    name,
    price,
    screen,
    capacity,
    ram,
    fullPrice,
    itemId,
    category,
  } = product;
  const { addCartItem, cartItems } = useCart();
  const isInCart = cartItems.some(item => item.id === itemId);

  return (
    <div className="product-card">
      <Link to={`/${category}/${itemId}`} className="product-card__link">
        <img className="product-card__image" src={`_new/${image}`} alt={name} />

        <p className="product-card__name">{name}</p>
      </Link>
      <p className="product-card__price">
        {`$${price}`}
        {fullPrice - price > 0 && (
          <span className="product-card__price--strike">{`$${fullPrice}`}</span>
        )}
      </p>

      <table>
        <tbody className="product-card__specification-table">
          <tr className="product-card__table-row">
            <td className="product-card__details">Screen</td>
            <td>{screen}</td>
          </tr>
          <tr className="product-card__table-row">
            <td className="product-card__details">Capacity</td>
            <td>{capacity}</td>
          </tr>
          <tr className="product-card__table-row">
            <td className="product-card__details">RAM</td>
            <td>{ram}</td>
          </tr>
        </tbody>
      </table>

      <div className="product-card__controls">
        <PrimaryButton
          onClick={() => addCartItem(product)}
          width={176}
          height={40}
          isActive={isInCart}
        >
          Add to Cart
        </PrimaryButton>

        <FavButton size={40} />
      </div>
    </div>
  );
};
