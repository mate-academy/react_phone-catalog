import { Link } from 'react-router-dom';
import { Product } from '../../shared/types/Product';
import './ProductCard.scss';
import classNames from 'classnames';
import { useContext } from 'react';
import { ActionContext } from '../../shared/Context/ActionContext';

type Props = {
  product: Product;
  searchParams?: URLSearchParams;
};

export const ProductCard: React.FC<Props> = ({ product, searchParams }) => {
  const { id, itemId, name, fullPrice, price, screen, capacity, ram, image } =
    product;

  const category = product.category;

  const { handleAction, favouritesIds, cartProducts } =
    useContext(ActionContext);

  const productInTheCard = cartProducts.find(item => item.id === id);

  const onFavouritesClick = () => {
    if (favouritesIds.includes(id)) {
      handleAction(product, 'removeFromFavourites');
    } else if (!favouritesIds.includes(id)) {
      handleAction(product, 'favourites');
    }
  };

  const onCartClick = () => {
    handleAction(product, 'cart');
  };

  return (
    <section className="itemForSlider">
      <Link
        to={`/${category}/${itemId}`}
        className="itemForSlider__link"
        state={{ search: searchParams?.toString() }}
      >
        <img src={image} alt={name} className="itemForSlider__link-image" />
      </Link>
      <div className="itemForSlider__title">{name}</div>
      <div className="itemForSlider__price">
        <h3 className="itemForSlider__price-seil">{`$${price}`}</h3>
        <h3 className="itemForSlider__price-full">{`$${fullPrice}`}</h3>
      </div>
      <p className="itemForSlider__line" />
      <div className="itemForSlider__description">
        <div className="itemForSlider__description-block">
          <p className="itemForSlider__description-name">Screen</p>
          <p className="itemForSlider__description-value">{screen}</p>
        </div>
        <div className="itemForSlider__description-block">
          <p className="itemForSlider__description-name">Capacity</p>
          <p className="itemForSlider__description-value">{capacity}</p>
        </div>
        <div className="itemForSlider__description-block">
          <p className="itemForSlider__description-name">Ram</p>
          <p className="itemForSlider__description-value">{ram}</p>
        </div>

        <div className="itemForSlider__buttons">
          <button
            className={classNames('itemForSlider__buttons-cart', {
              'itemForSlider__buttons-cart-isActive': productInTheCard,
            })}
            type="button"
            onClick={onCartClick}
          >
            {productInTheCard ? 'Added to cart' : 'Add to cart'}
          </button>

          <button
            className="itemForSlider__buttons-favourite"
            type="button"
            onClick={onFavouritesClick}
          >
            <div
              className={classNames('icon icon--favorites', {
                'icon--favorites--active': favouritesIds.includes(id),
              })}
            ></div>
          </button>
        </div>
      </div>
    </section>
  );
};
