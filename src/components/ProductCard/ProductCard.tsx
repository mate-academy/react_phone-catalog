import { Link } from 'react-router-dom';
import { CatalogProduct, Phone, Tablet, Accessory } from '../../../public/types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../features/favorites/favoritesSlice';
import { addToCart } from '../../features/cart/cartSlice';
import './ProductCard.scss';

type ProductType = Phone | Tablet | Accessory;

interface ProductCardProps {
  product: CatalogProduct | ProductType;
  showDiscount?: boolean;
  onRemove?: () => void;
}

function ProductCard({
  product,
  showDiscount = false,
  onRemove,
}: ProductCardProps) {
  const dispatch = useAppDispatch();

  // 1. Визначаємо стабільний ID (itemId для CatalogProduct або id для деталей)
  const productId = (product as CatalogProduct).itemId || product.id;

  // 2. Отримуємо стан із Redux за допомогою productId
  const favorites = useAppSelector(state => state.favorites.items);
  // Перевіряємо по обох полях для надійності
  const isLiked = favorites.some(item => (item.itemId === productId || item.id === productId));

  const cartItems = useAppSelector(state => state.cart.items);
  const isInCart = cartItems.some(item => item.id === productId);

  // 3. Обробка цін та зображень
  const price = 'priceDiscount' in product ? product.priceDiscount : product.price;

  const fullPrice = 'priceRegular' in product
    ? product.priceRegular
    : (product as CatalogProduct).fullPrice;

  const image = 'images' in product ? product.images[0] : (product as CatalogProduct).image;

  const handleLikeClick = () => {
    if (isLiked) {
      if (onRemove) {
        onRemove();
      } else {
        // Видаляємо за тим самим ID, за яким шукали
        dispatch(removeFromFavorites(productId));
      }
    } else {
      // Приводимо до CatalogProduct, щоб стейт був консистентним
      dispatch(addToFavorites(product as CatalogProduct));
    }
  };

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch(addToCart({
        id: productId, // ПередаємоitemId як id для кошика
        name: product.name,
        price: price,
        image: image
      }));
    }
  };

  return (
    <div className="product-card">
      <Link
        to={`/${product.category}/${productId}`}
        className="product-image-link"
      >
        <img src={image} alt={product.name} className="product-image" />
      </Link>

      <Link
        to={`/${product.category}/${productId}`}
        className="product-name-link"
      >
        <div className="product-name">{product.name}</div>
      </Link>

      <h3 className="product-price">
        <span className="discount">${price}</span>
        {showDiscount && <span className="full-price">${fullPrice}</span>}
      </h3>

      <hr />

      <div className="product-description">
        <div className="product-description__left">
          <div className="characteristic-name">Screen</div>
          <div className="characteristic-name">Capacity</div>
          <div className="characteristic-name">RAM</div>
        </div>
        <div className="product-description__right">
          <div className="characteristic-value">{product.screen}</div>
          <div className="characteristic-value">{product.capacity}</div>
          <div className="characteristic-value">{product.ram}</div>
        </div>
      </div>

      <div className="product-actions">
        <button
          className={`add-to-cart-button ${isInCart ? 'added-to-cart' : ''}`}
          onClick={handleAddToCart}
          type="button"
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          className={`like-button ${isLiked ? 'is-liked' : ''}`}
          onClick={handleLikeClick}
          type="button"
          aria-label="Add to favorites"
        >
          <img
            src={isLiked ? './img/HeartFilled.svg' : './img/Like.svg'}
            alt="Like"
          />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
