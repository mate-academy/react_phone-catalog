import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { FavouritesLiked } from '../../assets/icons/favourites-icon-liked';
import { FavouritesIcon } from '../../assets/icons/favourites-icon';
import { ProductDetail } from '../../types/Product';
import './DetailsCard.scss';

type Props = {
  product: ProductDetail | null;
  isAdded: boolean;
  isAddedToFav: boolean;
  handleAddToCart: () => void;
  handleAddToFavourites: () => void;
  itemId: string | undefined;
  newColorUrl: string | undefined;
  newCapacityUrl: (capacity: string) => string | undefined;
  selectedImage: string;
  handleSelectImage: (image: string) => void;
};

export const DetailsCard: React.FC<Props> = ({
  product,
  isAdded,
  isAddedToFav,
  handleAddToCart,
  handleAddToFavourites,
  itemId,
  newColorUrl,
  newCapacityUrl,
  selectedImage,
  handleSelectImage,
}) => {
  return (
    <div className="card">
      <div className="xlimage_container">
        <img
          src={`new/${selectedImage}`}
          alt="img"
          className="xlimage"
        />
      </div>
      <div className="simages_container">
        {product?.images.map(image => (
          <button
            type="button"
            className="simage__container"
            onClick={() => handleSelectImage(image)}
            key={image}
          >
            <img
              src={`new/${image}`}
              alt={product.name}
              className="simage"
            />
          </button>

        ))}
      </div>
      <div className="features_container">
        <div className="colors">
          <div className="colors__text">
            Available colors
          </div>
          <div className="colors__choose">
            {product?.colorsAvailable.map(color => (
              <Link
                key={color}
                to={`/${newColorUrl}-${color}`}
                className={classNames('colors__color', {
                  colors__color__selected: product.color === color,
                })}
              >
                <div className={`colored ${color}`} />
              </Link>
            ))}
          </div>
        </div>

        <div className="capacities">
          <div className="capacities__text">
            Select capacity
          </div>
          <div className="colors__choose">
            {product?.capacityAvailable.map(capacity => (
              <Link
                to={`/${newCapacityUrl(capacity)}`}
                key={capacity}
                className={classNames('capacities__capacity', {
                  capacities__capacity__selected: itemId
                    ?.includes(capacity.toLowerCase()),
                })}
              >
                {capacity}
              </Link>
            ))}
          </div>
        </div>

        <div className="price">
          <div className="price__main">
            {`$${product?.priceDiscount}`}
          </div>
          <div className="price__sale">
            {`$${product?.priceRegular}`}
          </div>
        </div>

        <div className="buy">
          {isAdded
            ? (
              <button
                className="cart_active"
                type="button"
                onClick={handleAddToCart}
              >
                Added to cart
              </button>
            ) : (
              <button
                className="cart"
                type="button"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
            )}
          <div className="favourites">
            <button
              type="button"
              onClick={handleAddToFavourites}
            >
              {isAddedToFav
                ? <FavouritesLiked />
                : <FavouritesIcon />}

            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
