import { Link } from 'react-router-dom';
import heartImg from '../../images/Favourites(HeartLike).png';
import type { Product } from '../../types/Product';
import './ProductCard.scss';
import { Title } from '../../types/Titel';
import BloodHeart from '../../images/Union.png';
import { useFavorites } from '../../context/FavoritesContext';
import { useOrders } from '../../context/OrdersContext';
type Props = {
  product: Product;
  titel: Title;
};
export const ProductCard: React.FC<Props> = ({ product, titel }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const { orders, addOrder, removeOrder } = useOrders();

  const isFavorite = favorites.includes(product.itemId);
  const isOrder = orders.includes(product.itemId);

  function changeFavorite() {
    if (isFavorite) {
      removeFavorite(product.itemId);
    } else {
      addFavorite(product.itemId);
    }
  }

  function changeOrders() {
    if (isOrder) {
      removeOrder(product.itemId);
    } else {
      addOrder(product.itemId);
    }
  }

  return (
    <div className="card" key={product.id}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className="card__link container__card-photo"
      >
        <img className="card-photo" src={product.image} alt="NewModaliPhone" />
        <h3 className="card__link--items">{product.name}</h3>
      </Link>

      <div className="card__price">
        <span className="card__price--item ">${product.price}</span>
        {titel !== Title.NewModels && (
          <span className="card__price--item item-old">
            ${product.fullPrice}{' '}
          </span>
        )}
      </div>

      <div className="card--line section--line"></div>
      <div className="card__info">
        <div className="card__info--items">
          <span>Screen</span>
          <span>{product.screen}</span>
        </div>
        <div className="card__info--items">
          <span>Capacity</span>
          <span>{product.capacity}</span>
        </div>
        <div className="card__info--items">
          <span>RAM</span>
          <span>{product.ram}</span>
        </div>
      </div>
      <div className="card__info__button">
        {isOrder ? (
          <button
            type="button"
            className="card__info__button--item item--Added"
            onClick={changeOrders}
          >
            Added
          </button>
        ) : (
          <button
            type="button"
            className="card__info__button--item item--button"
            onClick={changeOrders}
          >
            Add to cart
          </button>
        )}

        <button
          type="button"
          className="card__info__button--item item--BloodHeart"
          onClick={changeFavorite}
        >
          <img
            className="item--image"
            src={isFavorite ? BloodHeart : heartImg}
            alt="Remove from favorites"
          />
        </button>
      </div>
    </div>
  );
};
