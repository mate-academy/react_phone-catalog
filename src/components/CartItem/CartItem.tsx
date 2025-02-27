import './CartItem.scss';
import { useAppDispatch } from '../../app/hooks';
import { CartProduct } from '../../types/CartProduct';
import { cartSlice } from '../../features/cartSlice';

type Props = {
  item: CartProduct;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="cart-item">
      <div className="cart-item__top">
        <button
          className="cart-item__close icon icon--close-grey"
          onClick={() => dispatch(cartSlice.actions.removeGood(item))}
        ></button>
        <div className="cart-item__img-box">
          <img
            className="cart-item__img"
            src={`${item.images[0]}`}
            alt={`img ${item.name}`}
          />
        </div>
        <p className="cart-item__title">{item.name}</p>
      </div>
      <div className="cart-item__bottom">
        <div className="cart-item__counter">
          <button
            // eslint-disable-next-line max-len
            className="cart-item__counter__button--minus icon icon--minus button"
            onClick={() =>
              dispatch(
                cartSlice.actions.updateGood({
                  ...item,
                  quantity: item.quantity - 1,
                }),
              )
            }
            disabled={item.quantity === 1}
          ></button>
          <p className="cart-item__counter__value">{item?.quantity}</p>
          <button
            className="cart-item__counter__button--plus icon icon--plus button"
            onClick={() =>
              dispatch(
                cartSlice.actions.updateGood({
                  ...item,
                  quantity: item.quantity + 1,
                }),
              )
            }
          ></button>
        </div>
        <h3 className="cart-item__price">{`$${item.priceDiscount * item?.quantity}`}</h3>
      </div>
    </div>
  );
};
