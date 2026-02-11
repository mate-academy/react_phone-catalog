import { Button } from '@/components/ui/button/Button';
import { useCart } from '@/modules/CartFavContext/CartContext';
import { Product } from '@/types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import './ProductCard.scss';
import { useTheme } from '@/context/ThemeContext';
import FavButton from '../FavButton/FavButton';

type ProductCardProps = {
  item: Product;
  showDiscount: boolean;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  item,
  showDiscount,
}) => {
  const {
    isFavorite,
    isInCart,
    addToFavorites,
    removeFromFavorites,
    addToCart,
  } = useCart();

  if (!item) return null;

  const fav = isFavorite(item.itemId || '');
  const inCart = isInCart(item.itemId || '');
  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!item) return;

    addToCart(item.itemId);
  };

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!item) return;

    if (fav) {
      removeFromFavorites(item.itemId || '');
    } else {
      addToFavorites(item.itemId);
    }
  };
  return (
    <div className="product-card">
      <Link
        to={`/${item.category}/${item.itemId}`}
        className="product-card__image-wrapper"
      >
        <img src={item.image} alt={item.name} className="product-card__image" />
      </Link>

      <h3 className="product-card__title">{item.name}</h3>

      <div className="product-card__prices">
        <span className="product-card__price">${item.price}</span>
        {showDiscount && (
          <span className="product-card__full-price">${item.fullPrice}</span>
        )}
      </div>

      <div className="product-card__specs">
        <div className="spec-row">
          <span className="spec-label">Screen</span>
          <span className="spec-value">{item.screen}</span>
        </div>
        <div className="spec-row">
          <span className="spec-label">Capacity</span>
          <span className="spec-value">{item.capacity}</span>
        </div>
        <div className="spec-row">
          <span className="spec-label">RAM</span>
          <span className="spec-value">{item.ram}</span>
        </div>
      </div>

      <div className="product-card__actions">
        <Button
          onClick={handleCartClick}
          fullWidth
          variant={inCart ? 'outline' : 'primary'}
        >
          {inCart ? 'Added to Cart' : 'Add to Cart'}
        </Button>
        <FavButton fav={fav} handleFav={handleFav} />
      </div>
    </div>
  );
};
