import './cartCard.scss';
import React from 'react';
import classNames from 'classnames';
import Cros from '../../images/icons/close.png';
import Minus from '../../images/icons/minus.png';
import MinusDisabled from '../../images/icons/minus disabled.png';
import Plus from '../../images/icons/plus.png';
// import { Phones } from '../../types/Phones';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as cartAction }
  from '../../features/cart/cartSlice';
import { Products } from '../../types/Products';

type CartCardProps = {
  cartCardData: Products,
};

export const CartCard: React.FC<CartCardProps> = ({ cartCardData }) => {
  const {
    name,
    // price,
    image,
    itemId,
  } = cartCardData;

  // const {
  //   removeFromCart,
  // } = useContext(CartContext);

  // increase or degreece count of item and price
  // const [productCount, setProductCount] = useState(1);

  // const handleIncrement = () => {
  //   setProductCount(productCount + 1);
  // };

  // const handleDecrement = () => {
  //   if (productCount > 1) {
  //     setProductCount(productCount - 1);
  //   }
  // };

  // const totalPrice = productCount * price;

  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart);

  const handleIncrement = (id: string) => {
    dispatch(cartAction.incrementItemCount(id));
  };

  const handleDecrement = (id: string) => {
    dispatch(cartAction.decrementItemCount(id));
  };

  const handleDeleteCard = (id: string) => {
    dispatch(cartAction.removeItem(id));
  };

  const correctCard
    = cart.cartItems.find(item => item.itemInCart.itemId === itemId);
  const productCount = correctCard?.itemCount || 0;
  let totalPrice;

  if (correctCard) {
    totalPrice = correctCard?.itemInCart.price * productCount;
  }

  return (
    <div className="cartProductCard">
      <button
        type="button"
        className="cartProductCard__cross"
        onClick={() => handleDeleteCard(itemId)}
      >
        <img
          src={Cros}
          alt="product cart"
          className="cartProductCard__crossImg"
        />
      </button>

      <div className="cartProductCard__imgContainer">
        <img
          src={`${image}`}
          alt="product cart"
          className="cartProductCard__img"
        />
      </div>

      <p className="cartProductCard__name">
        {name}
      </p>

      <div className="cartProductCard__btnContainer">
        <button
          type="button"
          className={classNames(
            'cartProductCard__btnContainer__btn',
            {
              'cartProductCard__btnContainer__btn--disabled':
                productCount === 1,
            },
          )}
          onClick={() => handleDecrement(itemId)}
          disabled={productCount === 1}
        >
          {productCount === 1 ? (
            <img src={MinusDisabled} alt="product cart" />
          ) : (
            <img src={Minus} alt="product cart" />
          )}

        </button>
        <p className="cartProductCard__btnContainer__number">
          {productCount}
        </p>
        <button
          type="button"
          className="cartProductCard__btnContainer__btn"
          onClick={() => handleIncrement(itemId)}
        >
          <img src={Plus} alt="product cart" />
        </button>
      </div>

      <h2 className="cartProductCard__price">
        {`$${totalPrice}`}
      </h2>
    </div>
  );
};
