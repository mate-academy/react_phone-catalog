import './CartPage.scss';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { GetProducts } from '../../services/GetProducts';
import { useCart } from '../../context/cartContext';
import { ViewCart } from '../ViewCart/ViewCart';
import { CartEmpty } from '../CartEmpty/CartEmpty';
import { Checkout } from '../Checkout/Checkout';
import { MobileViewCart } from '../MobileViewCart/MobileViewCart';

export const CartPage: React.FC = () => {
  const { cart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentwidth, setCurrentWidth] = useState(window.innerWidth);

  useEffect(() => {}, []);

  useEffect(() => {
    GetProducts().then(data => {
      const addedToCart = data.filter(product =>
        cart.find(cartProduct => cartProduct.item.itemId === product.itemId),
      );

      setProducts(addedToCart);

      const handleResize = () => {
        setCurrentWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      handleResize();

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    });
  }, [cart]);

  const onRemove = (id: string) => {
    setProducts(prev => prev.filter(p => p.itemId !== id));
  };

  return (
    <>
      <div className="cart__page">
        <nav className="cart__nav-links">
          <NavLink to={'/'}>
            <img
              className="cart__nav-link"
              src="img/ui-kit/Home.png"
              alt="home"
            />
          </NavLink>
          <img
            className="cart__nav-link"
            src="img/ui-kit/chevron-arrow-right.png"
            alt="to-right"
          />
          <p className="cart__nav-link">cart</p>
        </nav>

        <h1 className="cart__page-title">Cart</h1>

        <div className="cart-catalog__wrapper">
          {products.length > 0 ? (
            <>
              {/* eslint-disable prettier/prettier */}
              <div className="cart-catalog">
                {+currentwidth > 639 ? (
                  products.map(p => (
                    <ViewCart key={p.id} product={p} onRemove={onRemove} />
                  ))) : (
                  products.map(p => (
                    <MobileViewCart
                      key={p.id}
                      product={p}
                      onRemove={onRemove}
                    />
                  )))}
              </div>
              {/* eslint-disable prettier/prettier */}

              <Checkout />
            </>
          ) : (
            <CartEmpty />
          )}
        </div>
      </div>
    </>
  );
};
