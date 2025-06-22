import { Link } from 'react-router-dom';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/cartSlice';
import { addToFavorites, removeFromFavorites }
  from '../../redux/favoritesSlice';
import './Phones.scss';
import productsJson from '../../../public/api/products.json'; // '../../_new/products.json';
import { Accessory } from '../Accessories/Accessories';
import { Tablet } from '../Tablets/Tablets';
import { useAppSelector } from '../../redux/store';
import { useTranslation } from 'react-i18next';
import { SearchResults } from '../SearchResults/SearchResults';

export type Phone = {
  id: string;
  category: string;
  phoneId: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
};

export const useProductState = () => {
  const cartItems = useAppSelector(state => state.cart.items);
  const favoriteItems = useAppSelector(state => state.favorites.items);

  return {
    isInCart: (productId: string) => cartItems
      .some((item: Phone | Tablet | Accessory) => item.id === productId),
    isInFavorites: (productId: string) => favoriteItems
      .some((item: Phone | Tablet | Accessory) => item.id === productId),
  };
};

export const Phones: React.FC = () => {
  const { t } = useTranslation();
  const products = JSON.parse(JSON.stringify(productsJson)); // TS workaround
  const dispatch = useDispatch();
  const { isInCart, isInFavorites } = useProductState();

  const currentTheme = useAppSelector(
    (state: { theme: { current: string; }; }) => state.theme.current);

  return (
    <>
      <div className={`phones_page ${currentTheme}`}>
        <Link
          to={'/'}
        >
          🏠
        </Link> -{'> '}
        <Link
          to={'/phones'}
        >{t('navigation.phones')}
        </Link>

        <SearchResults itemsCategory="phones" />

        {/* <h1>Phones PAGE with {currentTheme}, products q-ty - {products.length}</h1>
        {products.filter((phone: Phone) => phone.category === 'phones')
          .sort((a:Phone, b:Phone) => b.price - a.price)
          .map((phone:Phone) => (
            <div className="card" key={phone.itemId}>
              <Link
                to={`/phones/${phone.itemId}`}
                onClick={() => window.scrollTo(0, 0)}
              >
                <img
                  src={`../../../public/${phone.image}`}
                  alt="here should be an image"
                  height="300"
                />
                <br/>
                {`${phone.name}`}
              </Link>
              <br />
              {`${phone.price} $`} &emsp;<s>{`${phone.fullPrice} $`}</s>
              <br />
              Screen &emsp;{`${phone.screen}`}
              <br />
              Capacity &emsp;{`${phone.capacity}`}
              <br />
              RAM &emsp;{`${phone.ram}`}
              <br />

              <button className={`add-to-cart-button ${isInCart(phone?.id) ? 'in-cart' : ''} ${currentTheme}`}
                onClick={() => isInCart(phone?.id)
                  ? dispatch(removeFromCart(phone?.id))
                  : dispatch(addToCart(phone))
                }>add_to_cart</button>
              <button className={`favorite-button ${isInFavorites(phone?.id) ? 'in-favorites' : ''} ${currentTheme}`}
                onClick={() => isInFavorites(phone?.id)
                  ? dispatch(removeFromFavorites(phone?.id))
                  : dispatch(addToFavorites(phone))
                }>♥️</button>
              <br />
              <br />
            </div>
          ))} */}
      </div>
    </>
  );
};
