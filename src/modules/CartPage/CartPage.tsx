import { NavLink, useNavigate } from 'react-router-dom';
import './CartPage.scss';
import { useCart } from '../CartContext/CartContext';
import { Gargets } from '../../interface/Gargets';
import { useState, useEffect, useMemo } from 'react';

export const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const [clickOnCheckout, setClickOnCheckout] = useState(false);
    const navigate = useNavigate();

  const [cartWithCount, setCartWithCount] = useState<any[]>(() => {
    try {
      const stored = localStorage.getItem('cartWithCount');
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.filter((item: any) => 
          cartItems.some(contextItem => contextItem.id === item.id)
        );
      }
    } catch (e) {
      console.error("Помилка завантаження кошика:", e);
    }
    return cartItems.map(item => ({ ...item, count: 1 }));
  });

  useEffect(() => {
    setCartWithCount(prev => {
      const contextIds = new Set(cartItems.map(item => item.id));
      const filteredPrev = prev.filter(item => contextIds.has(item.id));
      const existingIds = new Set(filteredPrev.map(item => item.id));
      const newItems = cartItems
        .filter(item => !existingIds.has(item.id))
        .map(item => ({ ...item, count: 1 }));

      return [...filteredPrev, ...newItems];
    });
  }, [cartItems]);

  // Важливо: щоразу, коли ми змінюємо стейт, ми оновлюємо localStorage
  // і сповіщаємо інші компоненти (NavBar) через подію 'storage'
  useEffect(() => {
    localStorage.setItem('cartWithCount', JSON.stringify(cartWithCount));
    window.dispatchEvent(new Event('storage')); 
  }, [cartWithCount]);

  const deletePhone = (id: string) => {
    removeFromCart(id);
    setCartWithCount(prev => prev.filter(item => item.id !== id));
  };

  const handleIncrement = (id: string) => {
    setCartWithCount(prev =>
      prev.map(item => (item.id === id ? { ...item, count: (item.count || 1) + 1 } : item))
    );
  };

  const handleDecrement = (id: string) => {
    setCartWithCount(prev =>
      prev.map(item => (item.id === id ? { ...item, count: Math.max(1, (item.count || 1) - 1) } : item))
    );
  };

  const total = useMemo(() => {
    return cartWithCount.reduce((sum, item) => {
      const price = Number(item.priceRegular) || 0;
      const count = Number(item.count) || 1;
      return sum + (price * count);
    }, 0);
  }, [cartWithCount]);

  const totalCount = useMemo(() => {
    return cartWithCount.reduce((sum, item) => sum + (Number(item.count) || 1), 0);
  }, [cartWithCount]);

  return (
    <div className="cart">
      <div className="favorites__nav-bar">
        <NavLink to={'/'} className="favorites__back-home" />
        <div className="favorites__arrow"></div>
        <h2 className="favorites__h2">Cart</h2>
      </div>

      <h2 className="cart__h2">Cart</h2>

      <div className="cart__block">
        <div className="cart__items">
          {cartWithCount.length === 0 && (
             <img src="./img/cart-is-empty.png" alt="Empty" className="cart__empty" />
          )}
          
          {cartWithCount.map((item) => (
            <div onClick={() => {
                navigate(`/${item.category}/${item.id}`, { state: item });
              }} key={item.id} className="cart__position">
              <div className="cart__close">
                <img
                  src="./img/Close.png"
                  alt="Remove"
                  onClick={() => deletePhone(item.id)}
                />
              </div>

              <img 
                src={Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : './img/placeholder.png'} 
                alt={item.name} 
                className="cart__image" 
                onError={(e) => { (e.target as HTMLImageElement).src = './img/placeholder.png' }}
              />

              <h3 className="cart__name-garget">{item.name || 'Unknown Device'}</h3>

              <div className="cart__counter">
                <button className="cart__button-minus" onClick={() => handleDecrement(item.id)}>-</button>
                <div className="cart__count-garget">{item.count || 1}</div>
                <button className="cart__button-plus" onClick={() => handleIncrement(item.id)}>+</button>
              </div>

              <div className="cart__cost">
                ${(Number(item.priceRegular) || 0) * (Number(item.count) || 1)}
              </div>
            </div>
          ))}
        </div>

        {cartWithCount.length > 0 && (
          <div className="cart__block-total">
            <div className="cart__total-amount">${total}</div>
            <div className="cart__count-item">Total for {totalCount} items</div>
            <div className="cart__small-line"></div>
            <button
              className="cart__button-checkout"
              onClick={() => setClickOnCheckout(true)}
              disabled={clickOnCheckout}
            >
              {clickOnCheckout ? 'Processing...' : 'Checkout'}
            </button>
          </div>
        )}
      </div>

      {clickOnCheckout && (
        <div className="cart__modal-widnow">
          <p className="cart__questions">Do you want to clear the Cart?</p>
          <div className="cart__position-button">
            <button
              className="cart__button-yes"
              onClick={() => {
                cartWithCount.forEach(item => removeFromCart(item.id));
                setCartWithCount([]);
                setClickOnCheckout(false);
                localStorage.removeItem('cartWithCount');
              }}
            >
              Yes
            </button>
            <button className="cart__button-no" onClick={() => setClickOnCheckout(false)}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};