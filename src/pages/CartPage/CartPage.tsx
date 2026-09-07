import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getProducts } from '../../api';
import { Loader } from '../../components/Loader';
import { CardOfCart } from '../../components/CartPageComponents/CardOfCart';
import { Product } from '../../types/ProductsType';
import { CartContext } from '../../contexts/CartContext';
import { CartType } from '../../types/CartType';

export const CartPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [loader, setLoader] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [allPrice, setAllPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [productsLenght, setProductsLenght] = useState(0);

  const { cart, setCart } = useContext(CartContext);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setLoader(true);
    setErrorMessage('');

    getProducts()
      .then(loadedProducts => {
        const localProducts = JSON.parse(localStorage.getItem('cart') || '[]');

        return loadedProducts.filter(product =>
          localProducts.some(
            (localProduct: CartType) => localProduct.itemId === product.itemId,
          ),
        );
      })
      .then(loadProducts => {
        if (loadProducts) {
          setProducts(loadProducts);
        }
      })
      .catch(er => {
        setErrorMessage('Ошибка загрузки данных!');
        throw new Error((er as Error).message || 'An unknown error occurred');
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  useEffect(() => {
    setAllPrice(() => {
      return products.reduce((total, product) => {
        const cartItem = cart.find(item => item.itemId === product.itemId);

        const count = cartItem ? cartItem.count : 0;

        return total + product.price * count;
      }, 0);
    });
  }, [cart, products]);

  const handleDeleteProduct = (itemId: string) => {
    const updatedProducts = products.filter(
      prevItem => prevItem.itemId !== itemId,
    );

    setCart(prevCart =>
      prevCart.filter(cartItem => cartItem.itemId !== itemId),
    );

    setProducts(updatedProducts);
  };

  const handleCheckout = () => {
    const userConfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (userConfirmed) {
      setCart([]);
      setProducts([]);
      alert('The cart has been cleared!');
    } else {
      alert('The cart remains unchanged.');
    }
  };

  useEffect(() => {
    const length = cart.reduce(
      (accumulator, currentValue) => currentValue.count + accumulator,
      0,
    );

    setProductsLenght(length);
  }, [cart]);

  return (
    <div className="cart-page">
      <div className="cart-page__top">
        <button
          className="cart-page__back"
          onClick={() => goBack()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className={`icon ${
              isHovered
                ? 'icon--array--left--purple'
                : 'icon--array--left--light'
            }`}
          ></div>
          Back
        </button>
        <h1 className="cart-page__title">Cart</h1>
      </div>
      {loader ? (
        <Loader />
      ) : errorMessage ? (
        errorMessage
      ) : productsLenght > 0 ? (
        <>
          <div className="cart-page__cart-list">
            {products.map(product => {
              return (
                <CardOfCart
                  product={product}
                  key={product.id}
                  deleteProduct={handleDeleteProduct}
                />
              );
            })}
          </div>
          <div className="cart-page__buy-info">
            <div className="cart-page__buy-info__content">
              <h2 className="cart-page__buy-info__price">${allPrice}</h2>
              <div className="cart-page__buy-info__items">
                Total for {productsLenght} items
              </div>
            </div>
            <div className="grey-line"></div>
            <button
              className="cart-page__buy-info__button"
              onClick={() => handleCheckout()}
            >
              Checkout
            </button>
          </div>
        </>
      ) : (
        <div className="cart-page__empty">Your cart is empty</div>
      )}
    </div>
  );
};
