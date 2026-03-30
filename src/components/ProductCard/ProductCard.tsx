import { useLocalStorage } from '../../api';
import { Product } from '../../types/Product';
import './ProductCard.scss';
import { Link } from 'react-router-dom';
type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);

  const isFavorite = favorites.some(favorite => favorite.id === product.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      setFavorites(a => a.filter(b => b.id !== product.id));
    } else {
      setFavorites(c => [...c, product]);
    }
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
        <Link to="" className="card__button--add-to-cart">
          Add to cart
        </Link>
        <button
          className={`card__button--icon ${isFavorite ? 'active' : ''}`}
          onClick={handleToggleFavorite}
        ></button>
      </div>
    </div>
  );
};

export default ProductCard;
