import { Button } from '@/shared/ui/button/Button';
import { Product } from '@/types';
import { Link } from 'react-router-dom';
import './ProductCard.scss';
import FavButton from '../../../favorites/components/FavButton/FavButton';
import { useProductActions } from '../../hooks/useProductActions';

type ProductCardProps = {
  item: Product;
  showDiscount: boolean;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  item,
  showDiscount,
}) => {
  const { inCart, inFav, handleCartClick, handleFav, buttonText } =
    useProductActions(item.itemId);
  if (!item) {
    return null;
  }

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
          {buttonText}
        </Button>
        <FavButton fav={inFav} handleFav={handleFav} />
      </div>
    </div>
  );
};
