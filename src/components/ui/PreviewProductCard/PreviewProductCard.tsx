import { Product } from '../../../types';
import { Button } from '../Button/Button';
import './PreviewProductCard.scss';
import { useAppState, useDispatch } from '../../../store/Store';
import { Link } from 'react-router-dom';

type Props = {
  product: Product;
};

export default function PreviewProductCard({ product }: Props) {
  const dispatch = useDispatch();
  const storeData = useAppState();

  if (!product) {
    return 'Loading...';
  }

  const { fullPrice, price } = product;

  const isInCart = storeData.cartItems.find(item => product.itemId === item.id);
  const isInFavorites = storeData.favorites.find(
    item => product.itemId === item,
  );

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product.itemId });
  };

  const deleteFromCart = () => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product.itemId });
  };

  const toogleFavorites = () => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: product.itemId });
  };

  return (
    <div className="PreviewProductCard">
      <div className="PreviewProductCard__img">
        <img src={`/${product.image}`} alt={product.name} />
      </div>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className="PreviewProductCard__link"
      >
        <div className="PreviewProductCard__title">{product.name}</div>
      </Link>
      <div className="PreviewProductCard__price">
        ${price}{' '}
        <span className="PreviewProductCard__price--full">${fullPrice}</span>
      </div>
      <div className="PreviewProductCard__specs">
        <div className="PreviewProductCard__spec">
          <span className="PreviewProductCard__spec-name">Screen</span>
          <span className="PreviewProductCard__spec-value">
            {product.screen}
          </span>
        </div>
        <div className="PreviewProductCard__spec">
          <span className="PreviewProductCard__spec-name">Capacity</span>
          <span className="PreviewProductCard__spec-value">
            {product.capacity}
          </span>
        </div>
        <div className="PreviewProductCard__spec">
          <span className="PreviewProductCard__spec-name">RAM</span>
          <span className="PreviewProductCard__spec-value">{product.ram}</span>
        </div>
      </div>

      <div className="PreviewProductCard__btns">
        {isInCart ? (
          <Button variant="secondary" onClick={deleteFromCart}>
            Added
          </Button>
        ) : (
          <Button variant="primary" onClick={addToCart}>
            Add To Cart
          </Button>
        )}
        <Button
          variant="icon"
          icon="heart"
          active={Boolean(isInFavorites)}
          onClick={toogleFavorites}
        />
      </div>
    </div>
  );
}
