import { Product } from '../../../types/Product';
import './ProductCard.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FavoriteProduct } from '../../../types/FavoriteProduct';
import { ProductColor } from '../../../types/ProductColor';
import { BasketProduct } from '../../../types/BasketProduct';
import useAppContext from '../../../useAppContext';
import { useEffect } from 'react';

type ProductCardProps = {
  product: Product;
};
const ProductCard = ({ product }: ProductCardProps) => {
  const { favorites, baskets, setFavorites, setBaskets } = useAppContext();
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
  const navigate = useNavigate();
  const handleToggleFavorite = () => {
    setFavorites(prev => {
      const exists = prev.some(p => p.itemId === stateProduct.itemId);

      return exists
        ? prev.filter(p => p.itemId !== stateProduct.itemId)
        : [...prev, stateProduct];
    });
  };

  const basketOfProduct: BasketProduct = {
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
    quantity: 1,
  };
  const handleToggleBasket = () => {
    setBaskets(prev => {
      const exists = prev.find(p => p.itemId === basketOfProduct.itemId);

      if (exists) {
        return prev.filter(p => p.itemId !== basketOfProduct.itemId);
      }

      return [...prev, { ...basketOfProduct, quantity: 1 }];
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [product.id]);

  return (
    <div className="product__card">
      <Link
        to={`/${product.category}/${product.itemId}`}
        className="card__image-wrapper"
      >
        <img src={product.image} alt="" className="card__image" />
      </Link>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className="card__link"
      >
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
          {isBasket ? 'Added to Cart' : 'Add to Cart'}
        </button>
        <Link to="">
          <img
            src={
              isFavorite
                ? './img/icons/icon--heart--filled.svg'
                : './img/icons/icon--heart.svg'
            }
            alt="Favorite"
            className="card__button--icon"
            onClick={handleToggleFavorite}
          />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
