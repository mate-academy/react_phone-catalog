import { Product } from '../../types/product';
import { Link } from 'react-router-dom';
import { FavouritesIcon } from '../FavouritesIcon';
import { AddToCart } from '../AddToCart';

import './ProductItem.scss';

type Props = {
  itemData: Product;
  showFullPrice?: boolean;
};

export const ProductItem: React.FC<Props> = ({
  itemData,
  showFullPrice = false,
}) => {
  const productLink = {
    pathname: `/${itemData.category}/${itemData.itemId}`,
  };

  return (
    <div className="product-item">
      <div className="product-item__container">
        <div className="product-item__top">
          <Link to={productLink}>
            <img
              className="product-item__top-image image"
              src={itemData.image}
              alt={itemData.name}
            />
          </Link>
        </div>

        <Link to={productLink} className="product-item__title body-text">
          {itemData.name}
        </Link>

        <div className="item-price">
          <Link to={productLink}>
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
            <AddToCart itemId={itemData.itemId} itemData={itemData} />

            <FavouritesIcon itemId={itemData.itemId} itemData={itemData} />
          </div>
        </div>
      </div>
    </div>
  );
};
