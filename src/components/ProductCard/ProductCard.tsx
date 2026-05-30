import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { useCart, useFavourite } from '../../utils/useToggleItem';
import classNames from 'classnames';

type Props = {
  prod: Product;
  showDiscount: boolean;
};

export const ProductCard: React.FC<Props> = ({ prod, showDiscount }) => {
  const { isItem: like, toggleItem: toggleFavourite } = useFavourite(prod);
  const { isItem: inCart, toggleItem: toggleCart } = useCart(prod);
  const { name, fullPrice, price, image, screen, capacity, ram } = prod;

  return (
    <div className="productCard">
      <div className="productCard__box">
        <Link
          to={`/${prod.category}/${prod.itemId}`}
          className="productCard__link"
        >
          <img src={image} alt={name} className="productCard__img" />
          <p className="productCard__name">{name}</p>
        </Link>
        {showDiscount ? (
          <div className="productCard__price-box">
            <h3 className="productCard__price">{`$${price}`}</h3>
            <h3 className="productCard__price productCard__price--discount">{`$${fullPrice}`}</h3>
          </div>
        ) : (
          <h3 className="productCard__price">{`$${fullPrice}`}</h3>
        )}
        <ul className="productCard__details">
          <li className="productCard__key">
            Screen
            <span className="productCard__value">{screen}</span>
          </li>

          <li className="productCard__key">
            Capacity
            <span className="productCard__value">{capacity}</span>
          </li>

          <li className="productCard__key">
            RAM
            <span className="productCard__value">{ram}</span>
          </li>
        </ul>

        <div className="productCard__buttons">
          <button
            className={classNames('productCard__add', {
              'productCard__add--selected': inCart,
            })}
            onClick={toggleCart}
          >
            {inCart ? 'Added' : 'Add to cart'}
          </button>
          <button
            className="productCard__favourite icon icon__favourite"
            onClick={toggleFavourite}
          >
            <img
              src={
                like ? 'img/icons/select-heart.svg' : 'img/icons/heart-like.svg'
              }
              alt="favourites"
              className="icon__img"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
