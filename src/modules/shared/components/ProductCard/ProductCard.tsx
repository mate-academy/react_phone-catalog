import { Button } from "@/components/ui/button/Button";
import { useCart } from "@/modules/CartFavContext/CartContext";
import { Product } from "@/types";
import classNames from "classnames";
import { Link } from "react-router-dom";
import './ProductCard.scss'

type ProductCardProps = {
  item: Product;
  showDiscount: boolean;
};

export const ProductCard: React.FC<ProductCardProps> = ({ item, showDiscount }) => {
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
        <button
          className={classNames('btn-fav', { 'btn-fav--added': fav })}
          onClick={handleFav}
        >
          {/* SVG для сердечка */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={'none'}
            stroke={'currentColor'}
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
