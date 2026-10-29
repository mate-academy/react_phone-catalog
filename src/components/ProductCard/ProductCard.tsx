import './ProductCars.scss';
import favoritesIcon from '../../assets/icons/favorites_icon.png';
import favoritesAddedIcon from '../../assets/icons/favorites_added.png';
import { ProductDetailShort } from '../../types/ProductDetailShort';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useCart } from '../../contexts/CartContext';
import { getPublicUrl } from '../../utils/publicUrl';

interface Props {
  product: ProductDetailShort;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { toggleCart, isInCart } = useCart();
  const {
    category,
    itemId,
    name,
    image,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
  } = product;

  const productPath = `/${category}/${itemId}`;

  return (
    <div className="ProductCard">
      <Link to={productPath}>
        <img
          className="ProductCard-photo"
          src={getPublicUrl(image)}
          alt="Product photo"
        />
        <span className="ProductCard-title">{name}</span>
        <div className="ProductCard-priceContainer">
          <span className="ProductCard-price">{'$' + price}</span>
          <span className="ProductCard-discountPrice">{'$' + fullPrice}</span>
        </div>
        <div className="ProductCard-info">
          <ul>
            <li className="ProductCard-info-item">
              <span className="ProductCard-info-title">Screen</span>
              <span className="ProductCard-info-data">{screen}</span>
            </li>
            <li className="ProductCard-info-item">
              <span className="ProductCard-info-title">Capacity</span>
              <span className="ProductCard-info-data">{capacity}</span>
            </li>
            <li className="ProductCard-info-item">
              <span className="ProductCard-info-title">RAM</span>
              <span className="ProductCard-info-data">{ram}</span>
            </li>
          </ul>
        </div>
      </Link>
      <div className="ProductCard-ButtonContainer">
        <button
          className={
            isInCart(product.itemId)
              ? 'ProductCard-AddBtn is-active'
              : 'ProductCard-AddBtn'
          }
          type="button"
          onClick={() => toggleCart(product)}
        >
          {isInCart(product.itemId) ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          className="ProductCard-AddFavoritesBtn"
          onClick={() => toggleFavorite(product)}
          type="button"
        >
          <img
            src={
              isFavorite(product.itemId) ? favoritesAddedIcon : favoritesIcon
            }
            alt="Favorites"
            className="ProductCard-AddFavoritesBtn-icon"
          />
        </button>
      </div>
    </div>
  );
};
