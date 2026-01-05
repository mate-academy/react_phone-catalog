import { useNavigate } from 'react-router-dom';
import { Icon } from '../../components/ui/Icon/Icon';
import './CartPage.scss';
import { Button } from '../../components/ui/Button/Button';
import { useAppState, useDispatch } from '../../store/Store';
import { useCart } from '../../hooks/useCart';

export default function CartPage() {
  const navigate = useNavigate();
  const { cartItems, products } = useAppState();
  const dispatch = useDispatch();

  const { totalCount } = useCart();

  // 1. Взять все cartItems
  // 2. Найти по каждому картайтемся продукт вернуть его цену
  // 3. умножить цену на кол-во quantity, и все сплюсовать

  const totalCostCart = cartItems.reduce((sum, item) => {
    const product = products.find(p => p.itemId === item.id);

    if (!product) {
      return 0;
    }

    return sum + product?.price * item.quantity;
  }, 0);

  const goBack = () => {
    navigate(-1);
  };

  const deleteItemFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const changeQuantity = (productId: string, quantity: number) => {
    dispatch({
      type: 'UPDATE_CART_QUANTITY',
      payload: { id: productId, quantity },
    });
  };

  return (
    <div className="CartPage">
      <div className="CartPage__back" onClick={() => goBack()}>
        <Icon name="arrow-left" />
        <button className="CartPage__backbtn">Back</button>
      </div>

      <h1 className="CartPage__title">Cart</h1>

      <div className="CartPage__wrapper">
        <div className="CartPage__list">
          {cartItems.map(item => {
            const product = products.find(p => p.itemId === item.id);

            if (!product) {
              return null;
            }

            return (
              <div className="CartPage__item" key={item.id}>
                <div className="CartPage__row">
                  <div className="CartPage__item-delete">
                    <Button
                      variant="icon"
                      onClick={() => deleteItemFromCart(product.itemId)}
                    >
                      <Icon name="close" />
                    </Button>
                  </div>

                  <div className="CartPage__item-photo">
                    <img src={product.image} alt={product.name} />
                  </div>

                  <div className="CartPage__item-title">{product.name}</div>
                </div>
                <div className="CartPage__row">
                  <div className="CartPage__quantity-btns">
                    <Button
                      variant="square"
                      disabled={item.quantity === 1}
                      onClick={() => changeQuantity(item.id, item.quantity - 1)}
                    >
                      <Icon name="minus" />
                    </Button>
                    <div className="CartPage__quantity-number">
                      {item.quantity}
                    </div>
                    <Button
                      variant="square"
                      onClick={() => changeQuantity(item.id, item.quantity + 1)}
                    >
                      <Icon name="plus" />
                    </Button>
                  </div>
                  <div className="CartPage__quantity-price">
                    ${product.price * item.quantity}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="CartPage__checkout">
          <div className="CartPage__checkout-fullprice">${totalCostCart}</div>
          <div className="CartPage__checkout-items">
            Total for {totalCount} items
          </div>
          <Button variant="primary">Checkout</Button>
        </div>
      </div>
    </div>
  );
}
