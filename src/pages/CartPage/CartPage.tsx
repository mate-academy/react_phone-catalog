import './CartPage.scss';
import { ButtonBack } from "../../components/ButtonBack";
import { useContext, useEffect, useMemo, useState } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { CartItem } from '../../components/CartItem';
import emptyCartImg from '../../assets/cart-is-empty.png';
import { ModalDialog } from '../../components/ModalDialog';

export const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { allProducts, cart } = useContext(GlobalContext);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : '';
  }, [isModalOpen]);

  const cartProducts = useMemo(
    () => allProducts
      .filter(p => cart.some(c => c.id === p.itemId))
      .sort((a, b) => a.price - b.price),
    [allProducts, cart]);
  
  const getQuantity = (id: string): number => {
    return cart.find(c => c.id === id)?.quantity ?? 0;
  };
  
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
                  <button
                    className="cart__check-btn"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Checkout
                  </button>

                </div>
              </div>
            )
          }

          {(<ModalDialog
            isOpen={isModalOpen}
            onClose={setIsModalOpen}
          />)}
        </div>
      </div>
    </div>
  );
}
