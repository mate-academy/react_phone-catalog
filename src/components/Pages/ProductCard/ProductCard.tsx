import React, { useCallback, useContext, useState } from 'react';
import classNames from 'classnames';
import './ProductCard.scss';
import { Product, TechSpecs } from '../../../types';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { CatalogContext } from '../../../context/CatalogContext';
import { Images } from '../../../images';
import * as Service from '../../../utils/service';
import * as Types from '../../../types';

type Props = {
  product: Product;
  translate: number | null;
  addToFavorites?: (product: Product) => void;
};

export const ProductCard: React.FC<Props> = ({
  product,
  translate,
  addToFavorites,
}) => {
  const { favourites, addProductToFavoutites, cart, addProductToCart } =
    useContext(CatalogContext);

  const { pathname } = useLocation();
  const isFavouritesPage =
    pathname.slice(1) === Types.PageName.Favourites.toLowerCase();
  const [itemIsDeleted, setItemIsDeleted] = useState(false);
  const [searchParams] = useSearchParams();
  const {
    id,
    itemId,
    category,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    image,
  } = product;

  const handleAddToFavourites = useCallback(
    (productToAdd: Product) => {
      if (addToFavorites) {
        addToFavorites(productToAdd);
      } else {
        addProductToFavoutites(productToAdd);
      }
    },
    [addProductToFavoutites, addToFavorites],
  );

  const handleAddItemToFav = () => {
    setItemIsDeleted(true);

    if (favourites.length === 1 || !isFavouritesPage) {
      handleAddToFavourites(product);
    } else {
      setTimeout(() => handleAddToFavourites(product), 300);
    }
  };

  return (
    <section
      className={classNames('productCard productCard__item', {
        productCard__deleted: isFavouritesPage && itemIsDeleted,
        'productCard__item--fix': translate !== null,
      })}
      style={{ transform: `translateX(${translate}px)` }}
    >
      <Link
        to={`/${category}/${itemId}`}
        state={{ search: searchParams.toString() }}
        className="productCard__item--container selection-off"
        onClick={() => Service.scrollWindowTop()}
      >
        <div className="productCard__imageBlock">
          <img
            src={image}
            alt="phone"
            className="productCard__imageBlock--image selection-off"
          />
        </div>

        <div className="productCard__item-top">
          <span className="body-text">{name}</span>

          <div className="productCard__item-top--priceBlock">
            <h3>{`$${price}`}</h3>

            <h3 className="productCard__item-top--priceBlock-fullPrice">
              {`$${fullPrice}`}
            </h3>
          </div>
        </div>

        <div className="productCard__item-center">
          <div className="productCard__item-center-param">
            <span className="small-text productCard__item-center-param--left">
              {TechSpecs.Screen}
            </span>

            <span className="productCard__item-center-param--right">
              {screen}
            </span>
          </div>

          <div className="productCard__item-center-param">
            <span className="small-text productCard__item-center-param--left">
              {TechSpecs.Capacity}
            </span>

            <span className="productCard__item-center-param--right">
              {capacity}
            </span>
          </div>

          <div className="productCard__item-center-param">
            <span className="small-text productCard__item-center-param--left">
              {TechSpecs.RAM}
            </span>

            <span className="productCard__item-center-param--right">{ram}</span>
          </div>
        </div>
      </Link>

      <div className="productCard__item-bottom">
        <button
          className={classNames('cart-button productCard__item-bottom--cart', {
            'cart-button__selected': Service.includesItem(cart, itemId),
          })}
          onClick={() =>
            addProductToCart({
              id,
              quantity: 1,
              product,
            })
          }
        >
          {Service.includesItem(cart, itemId) ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          className={classNames('productCard__item-bottom--favourite button', {
            button__selected: Service.includesItem(favourites, itemId),
          })}
          onClick={handleAddItemToFav}
        >
          {Service.includesItem(favourites, itemId) ? (
            <img src={Images.Heart.Selected} alt="heartSelected" />
          ) : (
            <img src={Images.Heart.Default} alt="heart" />
          )}
        </button>
      </div>
    </section>
  );
};
