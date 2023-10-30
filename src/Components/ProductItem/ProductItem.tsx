import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Heart } from '../../SVG/Heart/Heart';
import { Phone } from '../../types/Phone';
import { useLikes } from '../../hooks/useLikes';
import { useCart } from '../../hooks/useCart';
import { usersChoiceContext } from '../../context/UsersChoiceContext';
import './ProductItem.scss';

type Props = {
  info: Phone;
};

export const ProductItem: React.FC<Props> = (
  {
    info,
  },
) => {
  const { addToLiked, removeFromLiked } = useLikes();
  const { addToCart, removeFromCart } = useCart();
  const { likedGadgetsID, inCartID } = useContext(usersChoiceContext);
  const liked = likedGadgetsID.includes(info.id);
  const inCheckOut = inCartID.includes(info.id);

  return (
    <div className="ProductItem">
      <Link
        to={`/${info.type}s/${info.id}`}
        className="ProductItem__imageWrapper"
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }}
      >
        <img
          src={info.imageUrl}
          alt="phone"
          className="ProductItem__image"
        />
      </Link>
      <Link
        to={`/${info.type}s/${info.id}`}
        className="ProductItem__name"
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }}
      >
        {info.name}
      </Link>
      <div className="ProductItem__price">
        {
          info.discount !== 0 ? (
            <>
              <h3 className="ProductItem__discounted">
                {`$${info.price - info.discount}`}
              </h3>
              <h3 className="ProductItem__original">
                {`$${info.price}`}
              </h3>
            </>
          ) : (
            <h3 className="ProductItem__discounted">
              {`$${info.price}`}
            </h3>
          )
        }
      </div>
      <div className="ProductItem__description">
        <h3 className="ProductItem__category">
          Screen
        </h3>
        <h3 className="ProductItem__specifications">
          {info.screen}
        </h3>
      </div>
      <div className="ProductItem__description">
        <h3 className="ProductItem__category">
          Capacity
        </h3>
        <h3 className="ProductItem__specifications">
          {info.capacity}
        </h3>
      </div>
      <div className="ProductItem__description">
        <h3 className="ProductItem__category">
          RAM
        </h3>
        <h3 className="ProductItem__specifications">
          {info.ram}
        </h3>
      </div>
      <div className="ProductItem__actions">
        <button
          type="button"
          className={`ProductItem__cardBtn ${inCheckOut && 'Checkout'}`}
          onClick={() => {
            if (!inCheckOut) {
              addToCart(info);
            } else {
              removeFromCart(info.id);
            }
          }}
        >
          {!inCheckOut ? 'Add to cart' : 'Selected'}
        </button>
        <button
          type="button"
          className="ProductItem__liked"
          onClick={() => {
            if (!liked) {
              addToLiked(info);
            } else {
              removeFromLiked(info.id);
            }
          }}
        >
          <Heart liked={liked} />
        </button>
      </div>
    </div>
  );
};
