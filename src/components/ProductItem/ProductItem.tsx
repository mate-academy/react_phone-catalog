import { Product } from '../../types/product';
import './ProductItem.scss';
import { Link } from 'react-router-dom';
import { FavouritesIcon } from '../FavouritesIcon';

type Props = {
  itemData: Product;
  showFullPrice?: boolean;
};

export const ProductItem: React.FC<Props> = ({
  itemData,
  showFullPrice = false,
}) => {
  return (
    <div className="product-item">
      <div className="product-item__container">
        <div className="product-item__top">
          <Link to={`/${itemData.category}/${itemData.itemId}`}>
            <img
              className="product-item__top-image image"
              src={itemData.image}
              alt={itemData.name}
            />
          </Link>
        </div>

        <Link
          to={`/${itemData.category}/${itemData.itemId}`}
          className="product-item__title body-text"
        >
          {itemData.name}
        </Link>

        <div className="item-price">
          <Link to={`/${itemData.category}/${itemData.itemId}`}>
            <h3>${itemData.price}</h3>
          </Link>

          {showFullPrice && (
            <span className="fullprice">${itemData.fullPrice}</span>
          )}
        </div>

        <div className="product-item__specs item-specs">
          <div className="item-specs-block">
            <div className="small-text-gray">Screen</div>
            <div className="small-text">{itemData.screen}</div>
          </div>

          <div className="item-specs-block">
            <div className="small-text-gray">Capacity</div>
            <div className="small-text">{itemData.capacity}</div>
          </div>

          <div className="item-specs-block">
            <div className="small-text-gray">RAM</div>
            <div className="small-text">{itemData.ram}</div>
          </div>
        </div>

        <div className="product-item__buttons">
          <div className="item-buttons">
            <button className="cart-button card-button buttons-text">
              Add to Cart
            </button>

            <FavouritesIcon itemId={itemData.itemId} itemData={itemData} />
          </div>
        </div>
      </div>
    </div>
  );
};
