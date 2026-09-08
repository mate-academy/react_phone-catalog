import './ProductCard.scss';
import { Link, useParams } from 'react-router-dom';
import { FavoriteItem, ItemCard, Product } from '../../constants/common';
import { mapToFavoriteItem } from '../../utils/helpers';
import { toggleFavorite } from '../../redux/favoritesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toggleCartItem } from '../../redux/cartSlice';

type ProductCardProps = {
  product: Product | ItemCard | FavoriteItem;
  discountPrice?: boolean;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  discountPrice = false,
}) => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites);
  const cart = useSelector((state: RootState) => state.cart);

  const productId = 'itemId' in product ? product.itemId : product.id;

  const image = 'image' in product ? product.image : `/${product.images[0]}`;

  const price = 'price' in product ? product.price : product.priceDiscount;

  const fullPrice = 'fullPrice' in product ? product.fullPrice : undefined;

  const isFavorite = favorites.some(fav => fav.id === productId);
  const isAdded = cart.some(fav => fav.id === productId);

  const handleFavoriteClick = () => {
    const item = mapToFavoriteItem(product as Product | ItemCard);

    dispatch(toggleFavorite(item));
  };

  const handleCardClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const item = mapToFavoriteItem(product as Product | ItemCard);

    dispatch(toggleCartItem(item));

    e.currentTarget.blur();
  };

  return (
    <article className="product-card">
      <div className="product-card__content">
        <Link
          to={`/${category ? category : product.category}/${productId}`}
          className="product-card__link"
        >
          <div className="product-card__photo">
            <img src={image} alt="Product" className="product-card__image" />
          </div>

          <h3 className="product-card__title">{product.name}</h3>

          <p className="product-card__price">
            <span>${price}</span>
            {discountPrice && fullPrice && (
              <span className="product-card__old-price">${fullPrice}</span>
            )}
          </p>
        </Link>

        <div className="product-card__info">
          <div className="product-card__info-item">
            <p className="product-card__info-label">Screen</p>
            <p className="product-card__info-value">{product.screen}</p>
          </div>
          <div className="product-card__info-item">
            <p className="product-card__info-label">Capacity</p>
            <p className="product-card__info-value">{product.capacity}</p>
          </div>
          <div className="product-card__info-item">
            <p className="product-card__info-label">RAM</p>
            <p className="product-card__info-value">{product.ram}</p>
          </div>
        </div>

        <div className={'product-card__actions'}>
          <button
            className={
              isAdded
                ? 'product-card__add-to-cart--added'
                : 'product-card__add-to-cart'
            }
            onClick={handleCardClick}
          >
            {isAdded ? 'Added to card' : 'Add to card'}
          </button>
          <button
            className="product-card__favorite"
            onClick={handleFavoriteClick}
          >
            <img
              src={
                isFavorite
                  ? './img/icons/remove-from-fovourites.webp'
                  : './img/icons/add-to-fovourites.svg'
              }
              alt="Favorite"
            />
          </button>
        </div>
      </div>
    </article>
  );
};
