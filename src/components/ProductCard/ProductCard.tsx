import { Product } from '../../types/Product';
import './ProductCard.scss';
import { Link } from 'react-router-dom';
import { FavoriteProduct } from '../../types/FavoriteProduct';

type ProductCardProps = {
  product: Product;
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteProduct[]>>;
  favorites: FavoriteProduct[];
  baskets: FavoriteProduct[];
  setBaskets: React.Dispatch<React.SetStateAction<FavoriteProduct[]>>;
};

const ProductCard = ({
  favorites,
  product,
  setFavorites,
  baskets,
  setBaskets,
}: ProductCardProps) => {
  const isFavorite = favorites.some(p => p.itemId === product.itemId);
  const isBasket = baskets.some(p => p.itemId === product.itemId);
  const handleToggleFavorite = () => {
    setFavorites(prev => {
      const exists = prev.some(p => p.itemId === product.itemId);

      return exists
        ? prev.filter(p => p.itemId !== product.itemId)
        : [...prev, product];
    });
  };

  const handleToggleBasket = () => {
    setBaskets(prev => {
      const exists = prev.some(p => p.itemId === product.itemId);

      return exists
        ? prev.filter(p => p.itemId !== product.itemId)
        : [...prev, product];
    });
  };

  return (
    <div className="product__card">
      <Link
        to={`/${product.category}/${product.itemId}`}
        className="card__link"
      >
        <img src={product.image} alt="" className="card__image" />
        <h4 className="card__name">{product.name}</h4>
      </Link>
      <div className="card__price">
        <span className="card__price--regular">${product.price}</span>
        <span className="card__price--discount">${product.fullPrice}</span>
      </div>
      <div className="card__describtion">
        <div className="card__spec">
          <span className="card__label">Screen</span>
          <span className="card__value">{product.screen}</span>
        </div>

        <div className="card__spec">
          <span className="card__label">Capacity</span>
          <span className="card__value">{product.capacity}</span>
        </div>

        <div className="card__spec">
          <span className="card__label">RAM</span>
          <span className="card__value">{product.ram}</span>
        </div>
      </div>
      <div className="card__buttons">
        <button
          className={`card__button--add-to-cart ${isBasket ? 'active' : ''}`}
          onClick={handleToggleBasket}
        >
          Add to cart
        </button>
        <button
          className={`card__button--icon ${isFavorite ? 'active' : ''}`}
          onClick={handleToggleFavorite}
        ></button>
      </div>
    </div>
  );
};

export default ProductCard;
