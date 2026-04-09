import { Product } from '../../types/Product';
import './ProductCard.scss';
import { Link } from 'react-router-dom';
import { FavoriteProduct } from '../../types/FavoriteProduct';
import { ProductColor } from '../ProductMain/ProductMain';

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
  const stateProduct: FavoriteProduct = {
    category: product.category,
    itemId: product.itemId,
    name: product.name,
    fullPrice: product.fullPrice,
    price: product.price,
    screen: product.screen,
    capacity: product.capacity,
    color: product.color as ProductColor,
    ram: product.ram,
    image: product.image,
  };

  const isFavorite = favorites.some(p => p.itemId === stateProduct.itemId);
  const isBasket = baskets.some(p => p.itemId === stateProduct.itemId);
  const handleToggleFavorite = () => {
    setFavorites(prev => {
      const exists = prev.some(p => p.itemId === stateProduct.itemId);

      return exists
        ? prev.filter(p => p.itemId !== stateProduct.itemId)
        : [...prev, stateProduct];
    });
  };

  const handleToggleBasket = () => {
    setBaskets(prev => {
      const exists = prev.some(p => p.itemId === stateProduct.itemId);

      return exists
        ? prev.filter(p => p.itemId !== stateProduct.itemId)
        : [...prev, stateProduct];
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
