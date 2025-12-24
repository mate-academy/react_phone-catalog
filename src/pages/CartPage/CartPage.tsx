import './CartPage.scss';
import { ButtonBack } from "../../components/ButtonBack";
import { useContext, useMemo } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { Product } from '../../types/Product';
import emptyCartImg from '../../assets/cart-is-empty.png';
import classNames from 'classnames';

const normalize = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
};

export const CartPage = () => {
  const { allProducts, cart } = useContext(GlobalContext);

  const cartProducts = useMemo(
    () => allProducts
      .filter(p => cart.some(c => c.id === p.itemId))
      .sort((a, b) => a.price - b.price),
    [allProducts, cart]);
  
  const getQuantity = (id: string): number => {
    return cart.find(c => c.id === id)?.quantity ?? 0;
  };

  // const quantity = getQuantity(product.itemId);
  
  const totalPrice = useMemo(
    () => cartProducts.reduce((sum, product) =>
      sum + product.price* getQuantity(product.itemId), 0),
    [cartProducts]);

  return (
    <div className="cart__page">
      <div className="container">
        <div className="cart__content">
          <ButtonBack />
          
          <h1 className="cart__title">Cart</h1>

          {cart.length === 0
            ? (
              <div className="cart__empty">
                <img 
                  src={emptyCartImg} 
                  alt="cart__empty-photo"
                />
              </div>
            ) : (
              <div className="cart__blocks">
                <div className="cart__items">
                  {cartProducts.map(p => (
                    <CartItem
                      key={p.itemId}
                      product={p}
                      quantity={getQuantity(p.itemId)}
                    />
                  ))}
                </div>

                <div className="cart__check">
                  <div className="cart__check-block">
                    <span className="cart__check-price">
                      {`$ ${totalPrice}`}
                    </span>
                    <span className="cart__check-title">
                      {`Total for ${cartProducts.length} items`}
                    </span>
                  </div>
                  <span className="cart__check-btn">
                    Checkout
                  </span>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

type Props = {
  product: Product;
  quantity: number,
}

export const CartItem: React.FC<Props> = ({ product, quantity }) => {
  const { deleteFromCart, updateQuantity } = useContext(GlobalContext);

  return (
    <div className="cart-item">
      <div className="cart-item__top">
        <div
          className="cart-item__delete"
          onClick={() => deleteFromCart(product.itemId)}
        />
        <div className="cart-item__photo">
          <img src={product.image} alt="cart-photo" />
        </div>
        <div className="cart-item__title">
          {normalize(product.itemId)}
        </div>
      </div>

      <div className="cart-item__bottom">
        <div className="cart-item__btn-block">
          <div
            className={classNames(
              'cart-item__btn',
              'cart-item__btn--dec',
              {'cart-item__btn--active': quantity > 1}
            )}
            onClick={() => {
              if (quantity > 1) {
                updateQuantity(product.itemId, quantity - 1);
              }
            }}
          />
          <span>{quantity}</span>
          <div
            className="cart-item__btn cart-item__btn--inc"
            onClick={() => updateQuantity(product.itemId, quantity + 1)}
          />
        </div>

        <div className="cart-item__price">
          <span>{`$ ${product.price}`}</span>
        </div>
      </div>
    </div>
  );
}
