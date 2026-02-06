/* eslint max-len: "off" */
import { useContext, useEffect, useState } from 'react';
import './CardPage.scss';
import { CardAndFavouritesContext } from '../../components/context/CardAndFavouritesContext';
import { useProductFilters } from '../../hooks/useProductsFilters';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../components/context/ThemeContext';
import { ProductsType } from '../../types/ProductsType';
import {
  SkeletCardPage,
  SkeletCardTotalItems,
} from '../../components/Skelet/SkeletCardPage';
import { CheckoutModal } from './CheckoutModal';
import { SuccessModal } from './SuccessModal';

export const CardPage = () => {
  const context = useContext(CardAndFavouritesContext);
  const { getLastPath, getLastSearch } = useProductFilters();
  const { card, changeQuantity, clearCard } = context;
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
    const productsInCard = allProducts.filter(product =>
      card.some(item => item.id === product.id),
    );

    setProducts(productsInCard);
  }, [card, allProducts]);

  const totalSum = card.reduce((sum, item) => {
    const prod = allProducts.find(x => x.id === item.id);

    return prod ? sum + prod.price * item.quantity : sum;
  }, 0);

  const itemInCard = card.length;

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
    clearCard();
    setIsSuccessOpen(false);
    navigate('/');
  };

  const totalQuantity = card.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="card">
      <div className="card__buttonBack">
        <Link
          to={`${getLastPath()}${getLastSearch()}`}
          className="card__buttonBack--arrow"
        >
          <img
            src={
              theme === 'light'
                ? import.meta.env.BASE_URL + 'img/icons/Arrow-Left_icon.svg'
                : import.meta.env.BASE_URL + 'img/icons/Arrow-Left_icon.svg'
            }
            alt="Back Arrow"
            className="icon"
          />
        </Link>
        <Link
          to={`${getLastPath()}${getLastSearch()}`}
          className="card__buttonBack--link"
        >
          <span className="card__buttonBack--text">Back</span>
        </Link>
      </div>

      <h2 className="card__title">Cart</h2>

      {isLoading ? (
        <div className="card__wrapper">
          <div className="card__wrapper--skeletLeft">
            {Array.from({ length: itemInCard }).map((_, index) => (
              <SkeletCardPage key={index} />
            ))}
          </div>
          <div className="card__wrapper--skeletRight">
            <SkeletCardTotalItems />
          </div>
        </div>
      ) : itemInCard > 0 ? (
        <div className="card__section">
          <div className="card__box">
            {products.map(product => {
              if (!product) {
                return null;
              }

              const cardItem = card.find(item => item.id === product.id);

              if (!cardItem) {
                return null;
              }

              const quantity = cardItem.quantity;
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
                            ? import.meta.env.BASE_URL +
                              'img/icons/Close_icon.svg'
                            : import.meta.env.BASE_URL +
                              'img/icons/Close_icon.svg'
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
                        className="cardPhoto"
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
                              ? import.meta.env.BASE_URL +
                                'img/icons/Minus_icon.svg'
                              : import.meta.env.BASE_URL +
                                'img/icons/Minus_icon.svg'
                          }
                          alt="Minus icon"
                          className="icon"
                        />
                      </button>

                      <div className="item__count--value">
                        {cardItem?.quantity}
                      </div>
                      <button
                        className="item__count--plus"
                        onClick={() => changeQuantity(product.id, 'plus')}
                      >
                        <img
                          src={
                            theme === 'light'
                              ? import.meta.env.BASE_URL +
                                'img/icons/Plus_icon.svg'
                              : import.meta.env.BASE_URL +
                                'img/icons/Plus_icon.svg'
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

          <div className="card__totalForItem">
            <div className="totalForItem">
              <div className="card__totalForItem--price">${totalSum}</div>
              <p className="card__totalForItem--text">
                Total for {totalQuantity} items
              </p>
            </div>
            <div className="cardLine"></div>
            <button
              className="card__totalForItem--checkout"
              onClick={() => setIsCheckoutOpen(true)}
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="card__empty">
          <h3 className="card__empty--text">Your cart is epmty</h3>
          <img
            src={import.meta.env.BASE_URL + 'img/cart-is-empty.png'}
            alt="Cart is empty"
            className="card__empty--img"
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
