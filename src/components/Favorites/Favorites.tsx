import './Favorites.scss';
import { addToFavorites, currentFavoriteItems, removeFromFavorites } from '../../redux/favoritesSlice';
import { addToCart, removeFromCart } from '../../redux/cartSlice';
import { useAppSelector } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { emptyHeart, filledHeart, homeIcon } from '../../../public/img/icons/svg_icons';
import { useProductState } from '../Phones/Phones';
import { useTranslation } from 'react-i18next';

export const Favorites: React.FC = () => {
  const favItems = useAppSelector(currentFavoriteItems);
  const favsQuantity = favItems.length;
  const dispatch = useDispatch();
  const currentTheme = useAppSelector(
    (state: { theme: { current: string; }; }) => state.theme.current);
  const { isInCart, isInFavorites } = useProductState();
  const { t } = useTranslation();

  return (
    <div className={`fav-container ${currentTheme}`}>
      <div className="fav--nav-legend">
        <Link
          to={'/'}
          className={`fav-homeIcon ${currentTheme}`}
        >
          {homeIcon}
        </Link>

        <svg
          className={`arrow-right ${currentTheme} fav-arrowright`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>

        <div className={`fav--link-legend ${currentTheme}`}>
          {t('favorites.fav_title')}
        </div>
      </div>

      <div className={`custom_h1 ${currentTheme}`}>
        {t('favorites.fav_title')}
      </div>

      <div className={`fav--items-counter ${currentTheme}`}>
        {favsQuantity} {t('favorites.items')}
      </div>

      <div className="fav__items-wrapper">
        {favItems.map(item => (
          <div
            key={`${item.itemId}+`}
            className={`rec__card fav_card ${currentTheme}`}

          >
            <Link
              to={`/phones/${item.itemId}`}
              onClick={() => window.scrollTo(0, 0)}
              className='rec__link fav__itemImage'
            >
              <img
                src={`${item.image}`}
                alt="here should be an image"
              />
              <div className={`rec__item-name ${currentTheme}`}>
                {item.name}
              </div>
            </Link>
            <div className={`rec__item-price ${currentTheme}`}>
              {`$${item.price}  `}
            </div>
            <div className={`rec__specs ${currentTheme}`}>
              <div className={`rec__specs-spec ${currentTheme}`}>
                {t('specs.screen')}
                <div className={`rec__specs-value ${currentTheme}`}>{item.screen}</div>
              </div>
              <div className={`rec__specs-spec ${currentTheme}`}>
                {t('specs.capacity')}
                <div className={`rec__specs-value ${currentTheme}`}>
                  {item.capacity.replace('GB', ' GB').replace('TB', ' TB')}
                </div>
              </div>
              <div className={`rec__specs-spec ${currentTheme}`}>
                {t('specs.ram')}
                <div className={`rec__specs-value ${currentTheme}`}>
                  {item.ram.replace('GB', ' GB').replace('MB', ' MB')}
                </div>
              </div>
            </div>
            <div className="rec__item-buttons fav__buttons">
              <button className={`rec__item-to-cart ${currentTheme} ${isInCart(item?.id) ? 'in-cart' : ''}`}
                onClick={() => isInCart(item?.id)
                  ? dispatch(removeFromCart(item?.id))
                  : dispatch(addToCart(item))
                }>{`${isInCart(item?.id) ? `${t('btn.in_cart')}` : `${t('btn.add_to_cart')}`}`}</button>
              <button className={`rec__item-to-fav ${currentTheme} ${isInFavorites(item?.id) ? 'in-favorites' : ''}`}
                onClick={() => isInFavorites(item?.id)
                  ? dispatch(removeFromFavorites(item?.id))
                  : dispatch(addToFavorites(item))
                }>{isInFavorites(item?.id)
                  ? filledHeart
                  : emptyHeart
                }
              </button>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
};
