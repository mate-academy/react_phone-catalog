import { Link } from 'react-router-dom';
import cartStyle from './Cart.module.scss';
import { useCart } from '../../context/CartContext';
import { useMenu } from '../../context/MenuContext';
import { Products } from '../../types/types';
import { useEffect } from 'react';
import HeaderLogoMenu from '../HeaderLogoMenu/HeaderLogoMenu';

const Cart = () => {
  const { cartItems, setCartItems, addToCart, addProductToLovely } = useCart();
  const { isMenuOpen, setIsMenuOpen } = useMenu();

  const addedArray: Products[] | [] = JSON.parse(
    localStorage.getItem('added') || '[]',
  );

  // const handleAddToCart = (product: Products) => {
  //   console.log(product);

  //   if (cartItems.some(item => item.itemId === product.itemId)) {
  //     const filteredProducts = cartItems.filter(
  //       item => item.itemId !== product.itemId,
  //     );

  //     setCartItems(filteredProducts);

  //     const updatedFavorites = addedArray.filter(
  //       item => item.itemId !== product.itemId,
  //     );

  //     localStorage.setItem('added', JSON.stringify(updatedFavorites));
  //   } else {
  //     setCartItems(currentsProducts => [...currentsProducts, cartItems]);
  //     localStorage.setItem('added', JSON.stringify(cartItems));
  //   }
  // };

  // useEffect(() => {
  //   setCartItems(addedArray);
  // }, [localStorage.getItem('added')]);

  const addQuantiy = (product: Products) => {
    const choosen = cartItems.find(cart => cart.id === product.id);
    const quantity = choosen!.quantity++;

    console.log(quantity);
  };

  console.log(addedArray);
  console.log(cartItems);

  return (
    <>
      <HeaderLogoMenu isOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <div className={cartStyle.cart}>
        <div className={cartStyle['cart__path-of-user']}>
          <span className={cartStyle['cart__arrow-left']}></span>
          <Link to="/" className={cartStyle.cart__where}>
            Back
          </Link>
        </div>

        <h1 className={cartStyle.cart__title}>Cart</h1>

        {cartItems.length === 0 && (
          <img src="public/img/cart-is-empty.png" alt="epty bag" />
        )}

        <div className={cartStyle['cart__content-wrapper']}>
          <div className={cartStyle.lol}>
            {cartItems.map(item => {
              return (
                <div className={cartStyle.cart__cart} key={item.itemId}>
                  <div className={cartStyle['cart__gadget-info']}>
                    <button
                      className={cartStyle['cart__icon-close']}
                      onClick={() => addToCart(item)}
                    ></button>
                    <img
                      src={item.image}
                      alt="image"
                      className={cartStyle.cart__image}
                    />
                    <div className={cartStyle.cart__name}>{item.name}</div>
                  </div>

                  <div className={cartStyle['cart__gadget-deteils']}>
                    <div className={cartStyle['cart__change-quantity']}>
                      <button
                        onClick={() => addQuantiy(item)}
                        className={`${cartStyle['cart__button-add']} ${cartStyle.cart__buttons}`}
                      ></button>
                      <span>{item.quantity}</span>
                      <button
                        className={`${cartStyle['cart__button-get-out']} ${cartStyle.cart__buttons}`}
                      ></button>
                    </div>
                    <div>${item.fullPrice}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={cartStyle['cart__desicion-border']}>
            <div className={cartStyle['cart__items-info']}>
              <div className={cartStyle['cart__items-price']}>
                ${cartItems.reduce((sum, item) => sum + item.price, 0)}
              </div>
              <div className={cartStyle['cart__items-qauntity']}>
                Total for{' '}
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
              </div>
            </div>

            <button className={cartStyle['cart__button-checkout']}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
