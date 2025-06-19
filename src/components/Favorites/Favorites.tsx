import './Favorites.scss';
import { addToFavorites, currentFavoriteItems, removeFromFavorites } from '../../redux/favoritesSlice';
import { addToCart, removeFromCart } from '../../redux/cartSlice';
import { useAppSelector } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { emptyHeart, filledHeart, homeIcon } from '../../../public/img/icons/svg_icons';
import { useProductState } from '../Phones/Phones';

export const Favorites: React.FC = () => {
  const favItems = useAppSelector(currentFavoriteItems);
  const favsQuantity = favItems.length;
  const dispatch = useDispatch();
  const currentTheme = useAppSelector(
    (state: { theme: { current: string; }; }) => state.theme.current);
  const { isInCart, isInFavorites } = useProductState();

  return (
    <div className={`fav-container ${currentTheme}`}>
      <div className="fav--nav-legend">
        <Link
          to={'/'}
          className='fav-homeIcon'
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

        <div className="fav--link-legend">
          {'Favorites'}
        </div>
      </div>


      <h1>Favorites</h1>
      <div className="fav--items-counter">
        {favsQuantity} items
      </div>

      <div className="fav__items-wrapper">
        {favItems.map(item => (
          <div
            key={`${item.itemId}+`}
            className={'rec__card fav_card'}

          >
            <Link
              to={`/phones/${item.itemId}`}
              onClick={() => window.scrollTo(0, 0)}
              className='rec__link fav__itemImage'
            >
              <img
                src={`../../../public/${item.image}`}
                alt="here should be an image"
              />
              <div className="rec__item-name">
                {item.name}
              </div>
            </Link>
            <div className="rec__item-price">
              {`$${item.price}  `}
            </div>
            <div className="rec__specs">
              <div className="rec__specs-spec">
                Screen<div className="rec__specs-value">{item.screen}</div>
              </div>
              <div className="rec__specs-spec">
                Capacity<div className="rec__specs-value">
                  {item.capacity.replace('GB', ' GB')}</div>
              </div>
              <div className="rec__specs-spec">
                RAM<div className="rec__specs-value">
                  {item.ram.replace('GB', ' GB')}</div>
              </div>
            </div>
            <div className="rec__item-buttons fav__buttons">
              <button className={`rec__item-to-cart ${isInCart(item?.id) ? 'in-cart' : ''}`}
                onClick={() => isInCart(item?.id)
                  ? dispatch(removeFromCart(item?.id))
                  : dispatch(addToCart(item))
                }>{`${isInCart(item?.id) ? 'In cart' : 'Add to cart'}`}</button>
              <button className={`rec__item-to-fav ${isInFavorites(item?.id) ? 'in-favorites' : ''}`}
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
