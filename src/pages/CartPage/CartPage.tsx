/* eslint max-len: "off" */
import { Link, useNavigate } from 'react-router-dom';
import './CartPage.scss';
import { useContext, useEffect, useState } from 'react';
import { CartAndFavouritesContext } from '../../components/context/CartAndFavouritesContext';
import { useProductFilters } from '../../hooks/useProductsFilters';
import { ProductsType } from '../../types/ProductsType';
import { CheckoutModal } from './CheckoutModal';
import { SuccessModal } from './SuccessModal';
import {
  SkeletonCartPage,
  SkeletonCartTotalItems,
} from '../../components/Skeletons/SkeletonCartPage/SkeletonCartPage';
import { useTheme } from '../../components/context/ThemeContext';

export const CartPage = () => {
  const context = useContext(CartAndFavouritesContext);
  const { getLastPath, getLastSearch } = useProductFilters();
  const { cart, changeQuantity, clearCart } = context;
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [products, setProducts] = useState<ProductsType[]>([]);
  const [allProducts, setAllProducts] = useState<ProductsType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [errors, setErrors] = useState({ name: '', contact: '' });

  useEffect(() => {
    fetch('api/products.json')
      .then(res => res.json())
      .then((data: ProductsType[]) => {
        setAllProducts(data);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const productsInCart = allProducts.filter(product =>
      cart.some(item => item.id === product.id),
    );

    setProducts(productsInCart);
  }, [cart, allProducts]);

  const totalSum = cart.reduce((sum, item) => {
    const prod = allProducts.find(x => x.id === item.id);

    return prod ? sum + prod.price * item.quantity : sum;
  }, 0);

  const itemInCart = cart.length;

  const getProductLink = (product: ProductsType) => {
    return `/${product.category}/${product.itemId}`;
  };

  const validateAndSubmit = () => {
    const NewErrors = { name: '', contact: '' };
    let hasError = false;

    if (name.trim().length < 2) {
      NewErrors.name = 'Name is too short';
      hasError = true;
    }

    const contactRegex = /^(\+?\d{10,14}|[\w.-]+@[\w.-]+\.[A-Za-z]{2,})$/;

    if (!contactRegex.test(contact.trim())) {
      NewErrors.contact = 'Enter a valid phone number or email';
      hasError = true;
    }

    setErrors(NewErrors);
    if (hasError) {
      return;
    }

    setIsCheckoutOpen(false);
    setIsSuccessOpen(true);
  };

  const finishOrder = () => {
    clearCart();
    setIsSuccessOpen(false);
    navigate('/');
  };

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart">
      <div className="cart__buttonBack">
        <Link
          to={`${getLastPath()}${getLastSearch()}`}
          className="cart__buttonBack--arrow"
        >
          <img
            src={
              theme === 'light'
                ? './img/icons/Arrow-Left_icon.svg'
                : './img/icons/Arrow-Left_dark.svg'
            }
            alt="Back Arrow"
            className="icon"
          />
        </Link>
        <Link
          to={`${getLastPath()}${getLastSearch()}`}
          className="cart__buttonBack--link"
        >
          <span className="cart__buttonBack--text">Back</span>
        </Link>
      </div>

      <h2 className="cart__title">Cart</h2>

      {isLoading ? (
        <div className="cart__wrapper">
          <div className="cart__wrapper--skeletonLeft">
            {Array.from({ length: itemInCart }).map((_, index) => (
              <SkeletonCartPage key={index} />
            ))}
          </div>
          <div className="cart__wrapper--skeletonRight">
            <SkeletonCartTotalItems />
          </div>
        </div>
      ) : itemInCart > 0 ? (
        <div className="cart__section">
          <div className="cart__box">
            {products.map(product => {
              if (!product) {
                return null;
              }

              const cartItem = cart.find(item => item.id === product.id);

              if (!cartItem) {
                return null;
              }

              const quantity = cartItem.quantity;
              const modelSum = product.price * quantity;

              return (
                <div className="item" key={product.id}>
                  <div className="item__info">
                    <div
                      className="item__info--delete"
                      onClick={() => changeQuantity(product.id, 'delete')}
                    >
                      <img
                        src={
                          theme === 'light'
                            ? './img/icons/Close_icon.svg'
                            : './img/icons/Close_dark.svg'
                        }
                        alt="Delete item icon"
                        className="icon"
                      />
                    </div>
                    <Link
                      to={getProductLink(product)}
                      className="item__info--photo"
                    >
                      <img
                        src={product.image}
                        alt="model photo"
                        className="cartPhoto"
                      />
                    </Link>
                    <Link
                      to={getProductLink(product)}
                      className="item__info--name"
                    >
                      {product.name}
                    </Link>
                  </div>

                  <div className="item__count">
                    <div className="item__buttons">
                      <button
                        className="item__count--minus"
                        onClick={() => changeQuantity(product.id, 'minus')}
                      >
                        <img
                          src={
                            theme === 'light'
                              ? './img/icons/Minus_icon.svg'
                              : './img/icons/Minus_dark.svg'
                          }
                          alt="Minus icon"
                          className="icon"
                        />
                      </button>

                      <div className="item__count--value">
                        {cartItem?.quantity}
                      </div>

                      <button
                        className="item__count--plus"
                        onClick={() => changeQuantity(product.id, 'plus')}
                      >
                        <img
                          src={
                            theme === 'light'
                              ? './img/icons/Plus_icon.svg'
                              : './img/icons/Plus_dark.svg'
                          }
                          alt="Plus icon"
                          className="icon"
                        />
                      </button>
                    </div>
                    <h3 className="item__count--price">${modelSum}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart__totalForItem">
            <div className="totalForItem">
              <div className="cart__totalForItem--price">${totalSum}</div>
              <p className="cart__totalForItem--text">
                Total for {totalQuantity} items
              </p>
            </div>
            <div className="cartLine"></div>

            <button
              className="cart__totalForItem--checkout"
              onClick={() => setIsCheckoutOpen(true)}
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="cart__empty">
          <h3 className="cart__empty--text">Your cart is empty</h3>
          <img
            src={'./img/cart-is-empty.png'}
            alt="Cart is empty"
            className="cart__empty--img"
          />
        </div>
      )}

      {isCheckoutOpen && (
        <CheckoutModal
          name={name}
          contact={contact}
          errors={errors}
          onNameChange={setName}
          onContactChange={setContact}
          onClose={() => setIsCheckoutOpen(false)}
          onConfirm={validateAndSubmit}
        />
      )}

      {isSuccessOpen && <SuccessModal onFinish={finishOrder} />}
    </div>
  );
};
