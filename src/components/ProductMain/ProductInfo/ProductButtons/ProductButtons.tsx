import './ProductButtons.scss';
import { Link } from 'react-router-dom';

type ProductButtonsProps = {
  isFavorite: boolean;
  isBasket: boolean;
  handleToggleFavorite: React.MouseEventHandler<HTMLImageElement>;
  handleToggleBasket: React.MouseEventHandler<HTMLButtonElement>;
};

const ProductButtons = ({
  isFavorite,
  isBasket,
  handleToggleFavorite,
  handleToggleBasket,
}: ProductButtonsProps) => {
  return (
    <>
      <div className="product-info__buttons">
        <button
          className={`product-info__button--add-to-cart ${isBasket ? 'active' : ''}`}
          onClick={handleToggleBasket}
        >
          {isBasket ? 'Added to Cart' : 'Add to Cart'}
        </button>
        <Link to="">
          <img
            src={
              isFavorite
                ? '../../../../public/img/icons/icon--heart--filled.png'
                : '../../../../public/img/icons/icon--heart.png'
            }
            alt="Favorite"
            className="product-info__button--icon"
            onClick={handleToggleFavorite}
          />
        </Link>
      </div>
    </>
  );
};

export default ProductButtons;
