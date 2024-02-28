import { useEffect, useState } from 'react';
import { CartsCard } from '../../components/CartsCard/CartsCard';
import './Cart.scss';
import { ButtonBack } from '../../components/ButtonBack/ButtonBack';
// import { TypeCard } from '../../types/TypeCard';
import { TypeCard } from '../../types/TypeCard';
import { useAppSelector } from '../../store';

export const Cart = () => {
  // const cart: TypeCard[] = JSON.parse(localStorage.getItem('cart') || '');

  const reduxCart = useAppSelector(
    (state) => state.cartPhones.phonesInCart,
  );

  // const [cart, setCart] = useState<TypeCard[]>(
  //   JSON.parse(localStorage.getItem('cart') || ''),
  // );

  const [cart, setCart] = useState(
    reduxCart,
  );

  useEffect(() => {
    // setCart(JSON.parse(localStorage.getItem('cart') || ''));
    setCart(reduxCart);
  }, [reduxCart]);
  // Оновлюй стейт при зміні localStorage
  // const storedCart = localStorage.getItem('cart');
  // setAbc(storedCart ? JSON.parse(storedCart) : []);

  // const [cart, setCart] = useState<TypeCard[]>([]);

  // useEffect(() => {
  //   localStorage.setItem('cart', JSON.stringify(reduxCart));
  //   console.log('yes', JSON.stringify(reduxCart));
  // }, [reduxCart]);

  // useEffect(() => {
  //   const savedCart = localStorage.getItem('cart');

  //   if (savedCart) {
  //     setCart(JSON.parse(savedCart));
  //   }
  // }, []);

  // const cart: TypeCard[] = useMemo(() => {
  //   const savedCart = localStorage.getItem('cart');

  //   if (savedCart) {
  //     return JSON.parse(savedCart);
  //   }

  //   return [];
  // }, [reduxCart]);

  const [sumArray, setSumArray] = useState<Record<string, number>>({});

  return (
    <div className="Cart">
      <ButtonBack />

      <h1>Cart</h1>

      <div className="main-container">
        {cart.length
          ? (
            <>
              <ul className="phones__list">
                {cart.map(phone => (
                  <CartsCard
                    setSumArray={setSumArray}
                    phone={phone}
                    key={phone.id}
                  />
                ))}
              </ul>

              <div className="phones-price">
                <h1 data-cy="productQauntity">
                  {`$${cart.reduce((accumulator: number, value: TypeCard) => {
                    return accumulator + value.price * sumArray[value.id];
                  }, 0)}`}
                </h1>
                <p>{`Total for ${cart.length} items`}</p>

                <div className="button__container">
                  <button type="button">Checkout</button>
                </div>
              </div>
            </>
          ) : (
            <p>Your cart is empty</p>
          )}
      </div>
    </div>
  );
};
