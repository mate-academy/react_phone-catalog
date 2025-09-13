import './CartPage.scss';
import { NavLink } from 'react-router-dom';
// import { ProductCard } from '../ProductCard/ProductCard';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { GetProducts } from '../../services/GetProducts';
import { useCart } from '../../context/cartContext';
import { ViewCart } from '../ViewCart/ViewCart';
import { CartEmpty } from '../CartEmpty/CartEmpty';
import { Checkout } from '../Checkout/Checkout';

export const CartPage: React.FC = () => {
  const { cart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [counters, setCounters] = useState<{ [id: string]: number }>({});

  useEffect(() => {
    GetProducts().then(data => {
      setProducts(data);
    });
  }, []);

  const onRemove = (id: string) => {
    setProducts(prev => prev.filter(p => p.itemId !== id));
  };

  const addedToCart = products.filter(product => cart.includes(product.itemId));

  const updateCounter = (id: string, value: number) => {
    setCounters(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const initialTotalPrice = addedToCart.reduce(
    (acc, item) => acc + item.price,
    0,
  );

  const [totalPrice, setTotalPrice] = useState<number | undefined>(
    initialTotalPrice,
  );

  const UpdateTotalPrice = (id: string) => {
    const deletedItem = products.find(item => item.itemId === id);
    setTotalPrice(initialTotalPrice - deletedItem.price);
  };

  return (
    <>
      <div className="cart__page">
        <nav className="cart__nav-links">
          <NavLink to={'/'}>
            <img
              className="cart__nav-link"
              src="/img/ui-kit/Home.png"
              alt="home"
            />
          </NavLink>
          <img
            className="cart__nav-link"
            src="/img/ui-kit/chevron-arrow-right.png"
            alt="to-right"
          />
          <p className="cart__nav-link">cart</p>
        </nav>

        <h1 className="cart__page-title">Cart</h1>

        <div className="cart-catalog__wrapper">
          {addedToCart.length > 0 ? (
            <>
              <div className="cart-catalog">
                {addedToCart.map(product => {
                  return <ViewCart
                    key={product.id}
                    product={product}
                    onRemove={onRemove}
                    updateCounter={(value: number) =>
                        updateCounter(product.itemId, value)
                      }
                    counter={counters[product.id] || 1}
                    UpdateTotalPrice={UpdateTotalPrice}
                    addedToCart={addedToCart}
                  />;
                  );
                })}
              </div>

              <Checkout count={addedToCart.length} totalPrice={totalPrice}/>
            </>
          ) : (
            <CartEmpty/>
          )}
        </div>
      </div>
    </>
  );
};
