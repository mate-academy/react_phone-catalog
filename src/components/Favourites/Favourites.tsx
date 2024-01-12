/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-extraneous-dependencies */
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import classNames from 'classnames';
import { TechProductsContext } from '../../stores/TechProductsContext';
import { FavouriteType } from '../../types/FavouriteInterface';
import './Favourites.scss';

type Props = {
  favoriteProd: FavouriteType[],
};

export const Favourites: React.FC<Props> = ({
  favoriteProd,
}) => {
  const {
    cart,
    addInCart,
    dislikeFunc,
    query,
  } = useContext(TechProductsContext);

  return (
    <div className="favourites">
      <div className="favourites__block-title-items">
        <div className="grid-cover">
          {
            query ? (
              <h3 className="favourites__count-models">
                {`${favoriteProd.length} results`}
              </h3>
            ) : (
              <h3 className="favourites__count-models">
                {`${favoriteProd.length} items`}
              </h3>
            )
          }
        </div>
      </div>

      <div className="flex-products-container">
        {
          favoriteProd.map((product) => {
            const {
              itemId,
              image,
              name,
              price,
              fullPrice,
              screen,
              capacity,
              ram,
            } = product;

            return (
              <div key={itemId} className="product">
                <div className="product__image-container">
                  <Link to={`/product/${itemId}`}>
                    <img
                      alt="phone"
                      className="product__image"
                      src={image}
                    />
                  </Link>
                </div>

                <div className="product__info-container">
                  <h2 className="product__name-product">
                    <Link
                      to={`/product/${itemId}`}
                      className="product__name-product-link"
                    >
                      {name}
                    </Link>
                  </h2>

                  <div className="product__price-container">
                    <h2 className="product__price product__price--sale">{`$${price}`}</h2>
                    <h2 className="product__price product__price--real">{`$${fullPrice}`}</h2>
                  </div>

                  <div className="separator separator--under-price-in-card" />

                  <div className="product__charachters-container">
                    <div className="product__character-container">
                      <h3 className="product__character-title">Screen</h3>
                      <h3 className="product__character">{screen}</h3>
                    </div>

                    <div className="product__character-container">
                      <h3 className="product__character-title">Capacity</h3>
                      <h3 className="product__character">{capacity}</h3>
                    </div>

                    <div className="product__character-container">
                      <h3 className="product__character-title">RAM</h3>
                      <h3 className="product__character">{ram}</h3>
                    </div>
                  </div>

                  <div className="product__buttons-container">
                    <button
                      type="button"
                      className={
                        classNames(
                          'button',
                          {
                            'button button--added-in-cart':
                            cart.map((c) => c.itemId).includes(itemId),
                          },
                        )
                      }
                      onClick={() => addInCart({
                        itemId, image, name, price, count: 1,
                      })}
                      disabled={cart.map((c) => c.itemId).includes(itemId)}
                    >
                      {
                        cart.map((c) => c.itemId).includes(itemId)
                          ? 'Added to cart'
                          : 'Add to cart'
                      }
                    </button>

                    <button
                      type="button"
                      data-cy="addToFavorite"
                      className="product__like-button-wrapper"
                      onClick={() => dislikeFunc(itemId)}
                    >
                      <div
                        className="icon icon--favourite icon-favourite-active"
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};
