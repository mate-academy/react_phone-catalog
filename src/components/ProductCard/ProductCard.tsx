import './ProductCard.scss';
import { Product } from '../../types/Product';
import { useShop } from '../../context/shopContext';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../../utils/functions/function';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToBasket, toggleFavourite, isFavourite, isInBasket } = useShop();

  const backToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <div className="phone" key={product.id}>
      <Link
        to={`/product/${product.id}`}
        className="phone--link"
        onClick={backToTop}
      >
        <div className="phone__photo">
          <img src={product.image} alt="photo" className="phone__photo--img" />
        </div>
      </Link>
      <Link
        to={`/product/${product.id}`}
        className="phone--link"
        onClick={backToTop}
      >
        <div className="phone__name">{product.name}</div>
      </Link>
      <div className="phone__prices">
        <div className="phone__prices--price">{`$ ${product.fullPrice}`}</div>
        {product.price && (
          <div className="phone__prices--discount">{`$ ${product.price}`}</div>
        )}
      </div>
      <div className="phone__line"></div>
      <div className="phone__info">
        <div className="phone__info--title">Screen</div>
        <div className="phone__info--value">{product.screen}</div>
      </div>
      <div className="phone__info">
        <div className="phone__info--title">Capacity</div>
        <div className="phone__info--value">{product.capacity}</div>
      </div>
      <div className="phone__info">
        <div className="phone__info--title">RAM</div>
        <div className="phone__info--value">{product.ram}</div>
      </div>
      <div className="phone__buttons">
        <button
          className={`phone__buttons--add ${isInBasket(product.id) && 'phone__buttons--add-added'}`}
          onClick={event => {
            event.preventDefault();
            event.stopPropagation();
            addToBasket(product);
          }}
        >
          {isInBasket(product.id) ? 'Added' : 'Add to cart'}
        </button>
        <button
          className="phone__buttons--favourites"
          onClick={event => {
            event.preventDefault();
            event.stopPropagation();
            toggleFavourite(product);
          }}
        >
          <img
            src={
              isFavourite(product.id)
                ? getAssetUrl('/img/heart-red.png')
                : getAssetUrl('/img/heart.png')
            }
            alt="favourites"
          />
        </button>
      </div>
    </div>
  );
};
