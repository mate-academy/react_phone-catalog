import './Favorites.scss';
import { currentFavoriteItems, removeFromFavorites } from '../../redux/favoritesSlice';
import { addToCart } from '../../redux/cartSlice';
import { useAppSelector } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export const Favorites: React.FC = () => {
  const favItems = useAppSelector(currentFavoriteItems);
  const favsQuantity = favItems.length;
  const dispatch = useDispatch();
  const currentTheme = useAppSelector(
    (state: { theme: { current: string; }; }) => state.theme.current);

  return (
    <div className={`fav-container ${currentTheme}`}>
      <Link
        to={'/'}
      >
        🏠
      </Link>
      {' -> Favorites'}<br/>

      <h1>Favorites PAGE</h1>
      {favsQuantity} items<br/>
      {favItems.map(item => (
        <div key={`key-${item.id}`}>
          <div className={`fav-itemCart ${currentTheme}`}>
            <img
              src={`../../../public/${item.image}`}
              alt="here should be an image"
              height="200"
            /><br/>
            {item.name}
            &emsp;{` ${item.price} $`}&emsp;<s>{`${item.fullPrice} $`}</s>
            <br/>
            Screen &emsp;{`${item.screen}`}
            <br />
            Capacity &emsp;{`${item.capacity}`}
            <br />
            RAM &emsp;{`${item.ram}`}
            <br />
            <button className={`add-to-cart-button ${currentTheme}`}
              onClick={() => dispatch(addToCart(item))
              }>add_to_cart</button>
            <button className={`favorite-button ${currentTheme}`}
              onClick={() => dispatch(removeFromFavorites(item?.id))
              }>♥️</button>
          </div>
        </div>
      ))}
    </div>
  );
};
