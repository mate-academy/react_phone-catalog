import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import favoriteIcon from '../../images/icons/favorites.svg';
import favoriteIconActive from '../../images/icons/favorites-active.svg';
import { Product } from '../../types/Product';

import './ProductCard.scss';
import { getImagePath } from '../../utils/getImagePath';

type ProductCardProps = {
  product?: Product;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, toggleFavorite, isFavorite } =
    useGlobalContext();

  if (!product) {
    return null;
  }

  const inCart = cart.some(p => p.itemId === product.itemId);
  const isFavourite = isFavorite(product.itemId);

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inCart) {
      removeFromCart(product.itemId);
    } else {
      addToCart(product);
    }
  };

  const handleFavouriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product);
  };

  const handleCardClick = () => {
    navigate(`/${product.category}/${product.itemId}`);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <img
        src={getImagePath(product.image)}
        alt={product.name}
        className="product-card__image"
      />

      <span className="product-card__name">{product.name}</span>

      <div className="product-card__price-wrapper">
        <div className="product-card__price">${product.price}</div>
        {product.fullPrice > product.price && (
          <div className="product-card__price--old">${product.fullPrice}</div>
        )}
      </div>

      <div className="product-card__specs">
        <div className="product-card__spec--names">
          <div className="product-card__spec">Screen</div>
          <div className="product-card__spec">
            <div className="product-card__spec">
              {product.category === 'accessories' ? 'Display' : 'Capacity'}
            </div>
          </div>
          <div className="product-card__spec">RAM</div>
        </div>

        <div className="product-card__spec--values">
          <div className="product-card__spec">{product.screen}</div>
          <div className="product-card__spec">{product.capacity}</div>
          <div className="product-card__spec">{product.ram}</div>
        </div>
      </div>

      <div className="product-card__add-to">
        <button
          className={`product-card__add-to--cart ${
            inCart ? 'product-card__add-to--cart--active' : ''
          }`}
          onClick={handleCartClick}
        >
          {inCart ? 'Added' : 'Add to cart'}
        </button>
        <button
          className={`product-card__add-to--favourites ${
            isFavourite ? 'active' : ''
          }`}
          onClick={handleFavouriteClick}
        >
          <img
            src={isFavourite ? favoriteIconActive : favoriteIcon}
            alt="Add to favourite"
          />
        </button>
      </div>
    </div>
  );
};
