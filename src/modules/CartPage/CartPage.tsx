import list from '../../../public/api/products.json';
import { Container } from '../../components/Container/Container';
import { useAddedToCart } from '../../context/AddedToCartContext';
import style from './CartPage.module.scss';
import close from '../../../public/icons/Close.svg';
import plus from '../../../public/icons/Plus.svg';
import minus from '../../../public/icons/Minus.svg';

export const CartPage = () => {
  const { addedToCart, addToCart, increment, decrement } = useAddedToCart();
  const cartList = [...list].filter(item =>
    addedToCart.some(addedItem => String(addedItem.id) === String(item.id)),
  );
  const quantity: number = addedToCart.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const total = cartList.reduce((sum, item) => {
    const cartItem = addedToCart.find(
      addedItem => String(addedItem.id) === String(item.id),
    );

    return sum + item.price * (cartItem?.quantity || 0);
  }, 0);

  return (
    <Container>
      <div className={style.container}>
        <h1>Cart</h1>
        {addedToCart.length === 0 ? (
          <div>Your cart is empty</div>
        ) : (
          <div className={style.main}>
            <div className={style.cardsList}>
              {cartList.map(item => {
                const cartItem = addedToCart.find(
                  addedItem => String(addedItem.id) === String(item.id),
                );

                const handleDecrement = () => {
                  decrement({
                    ...item,
                    id: String(item.id),
                    quantity: 1,
                  });
                };

                return (
                  <div key={item.id} className={style.card}>
                    <img
                      className={style.cardButton}
                      src={close}
                      alt="close"
                      onClick={() => addToCart(String(item.id))}
                    />

                    <img
                      src={item.image}
                      alt="image"
                      className={style.cardImage}
                    />
                    <span className={style.cardName}>{item.name}</span>
                    <div className={style.cardQuantity}>
                      <button
                        className={style.cardButtons}
                        onClick={() =>
                          cartItem?.quantity === 1
                            ? addToCart(String(item.id))
                            : handleDecrement()
                        }
                      >
                        <img src={minus} alt="-" />
                      </button>
                      <div className={style.cardQuantityText}>
                        <span>{cartItem?.quantity}</span>
                      </div>
                      <button
                        className={style.cardButtons}
                        onClick={() =>
                          increment({
                            ...item,
                            id: String(item.id),
                            quantity: 1,
                          })
                        }
                      >
                        <img src={plus} alt="+" />
                      </button>
                    </div>
                    <span className={style.cardPrice}>${item.price}</span>
                  </div>
                );
              })}
            </div>
            <div className={style.totalBox}>
              <div className={style.totalText}>
                <div className={style.totalPrice}>${total}</div>
                <div className={style.totalQuantity}>
                  Total for {quantity} items
                </div>
              </div>
              <button className={style.totalButton}>Checkout</button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};
