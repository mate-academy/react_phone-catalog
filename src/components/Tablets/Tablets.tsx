import { Link } from 'react-router-dom';
import './Tablets.scss';
import productsJson from '../../../public/api/products.json';
import { useProductState } from '../Phones/Phones';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/cartSlice';
import { addToFavorites, removeFromFavorites }
  from '../../redux/favoritesSlice';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../redux/store';
import { SearchResults } from '../SearchResults/SearchResults';
import { homeIcon } from '../../../public/img/icons/svg_icons';

export type Tablet = {
  id: string;
  category: string;
  itemId: string;
  name: string;
  capacity: string;
  fullPrice: number;
  price: number;
  color: string;
  image: string;
  screen: string;
  ram: string;
  year: number;
};

export const Tablets: React.FC = () => {
  const products = JSON.parse(JSON.stringify(productsJson));
  const { isInCart, isInFavorites } = useProductState();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentTheme = useAppSelector(
    (state: { theme: { current: string; }; }) => state.theme.current);

  return (
    <div className={`tablets_page ${currentTheme}`}>
      <div className="acc-toplwrpr">
        <div className="acc--nav-legend">
          <Link
            to={'/'}
            className={`acc-homeIcon ${currentTheme}`}
          >
            {homeIcon}
          </Link>

          <svg
            className='arrow-right'
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>

          <div className="acc--link-legend">
            {t('navigation.tablets')}
          </div>
        </div>
      </div>
      <SearchResults itemsCategory="tablets" />{/*
      {products.filter((tablet: Tablet) => tablet.category === 'tablets')
        .sort((a:Tablet, b:Tablet) => b.price - a.price)
        .map((tablet:Tablet) => (
          <div className="card" key={tablet.itemId}>
            <Link
              to={`/tablets/${tablet.itemId}`}
              onClick={() => window.scrollTo(0, 0)}
            >
              <img
                src={`../../../public/${tablet.image}`}
                alt="here should be an image"
                height="300"
              />
              <br/>
              {`${tablet.name}`}
            </Link>
            <br />
            {`${tablet.price} $`} &emsp;<s>{`${tablet.fullPrice} $`}</s>
            <br />
            Screen &emsp;{`${tablet.screen}`}
            <br />
            Capacity &emsp;{`${tablet.capacity}`}
            <br />
            RAM &emsp;{`${tablet.ram}`}
            <br />
            <button className={`add-to-cart-button ${isInCart(tablet?.id) ? 'in-cart' : ''}`}
              onClick={() => isInCart(tablet?.id)
                ? dispatch(removeFromCart(tablet?.id))
                : dispatch(addToCart(tablet))
              }>add_to_cart</button>
            <button className={`favorite-button ${isInFavorites(tablet?.id) ? 'in-favorites' : ''}`}
              onClick={() => isInFavorites(tablet?.id)
                ? dispatch(removeFromFavorites(tablet?.id))
                : dispatch(addToFavorites(tablet))
              }>♥️</button>
            <br />
            <br />
          </div>
        ))} */}
    </div>
  );
};
