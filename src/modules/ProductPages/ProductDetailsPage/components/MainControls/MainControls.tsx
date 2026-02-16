import { useEffect, useState } from 'react';
import { useFavorites } from '../../../../../shared/context/Favorites/FavoritesContext';
import { ProductPage } from '../../../../../shared/types/ProductPage';
import { MainControlsType } from '../../../types/MainControlsType';
import './MainControls.scss';
import classNames from 'classnames';
import { useCart } from '../../../../../shared/context/Cart/CartContext';

export const MainControls = ({
  products,
  colors,
  activeColor,
  capacitys,
  activeCapacity,
  onColor,
  onCapacity,
  itemsProducts,
}: MainControlsType) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const [favoriteId, setFavoriteId] = useState<number>(0);
  const [cartProduct, setCartProduct] = useState<ProductPage>(0);

  const { addToCart, isCart } = useCart();

  const getItemId = (
    itemId: string,
    string2: ProductPage[],
  ): ProductPage | undefined => {
    const getId = string2.find(item => item.itemId === itemId);

    if (getId) {
      return getId;
    }
  };

  useEffect(() => {
    if (itemsProducts) {
      const product1 = getItemId(products.id, itemsProducts);

      setFavoriteId(Number(product1?.id) || 0);
      if (product1) {
        setCartProduct(product1);
      }
    }
  }, [itemsProducts]);

  return (
    <>
      <section className="main-controls">
        <div className="main-controls-colors">
          <h6 className="selector-title selector-title-responsive">
            Available colors
            <span>ID: 802390</span>
          </h6>
          <div className="main-controls-section">
            {colors.map((color, index) => (
              <button
                key={index}
                style={{ background: color }}
                className={classNames('color-selector', {
                  'color-selector-active':
                    color.toLocaleLowerCase() ===
                    activeColor.toLocaleLowerCase(),
                })}
                onClick={() => {
                  onColor(`${color}`);
                }}
              ></button>
            ))}
          </div>
          <h6 className="selector-title">Select capacity</h6>
          <div className="main-controls-section">
            {capacitys.map((capacity, index) => (
              <button
                key={index}
                className={classNames('capacity-selector', {
                  'selected-capacity': activeCapacity === capacity,
                })}
                onClick={() => onCapacity(`${capacity}`)}
              >
                {capacity}
              </button>
            ))}
          </div>
          <div className="card-middle">
            <span className="card-price">
              ${products.priceDiscount}
              <span className="card-full-price">
                {products.priceRegular !== products.priceDiscount
                  ? '$' + products.priceRegular
                  : ''}
              </span>
            </span>
          </div>

          <section className="card-footer">
            <button
              className={classNames('card-add details-add-btn', {
                'cart-added': isCart(favoriteId),
              })}
              onClick={() => {
                if (!isCart(favoriteId)) {
                  addToCart(cartProduct);
                }
              }}
            >
              <span>
                {isCart(favoriteId) ? 'Added to cart' : 'Add to cart'}
              </span>
            </button>
            <button
              className={classNames('card-add-fav', {
                'card-add-fav-added': isFavorite(favoriteId),
              })}
              onClick={() => {
                if (isFavorite(favoriteId)) {
                  removeFromFavorites(favoriteId);
                } else {
                  addToFavorites(cartProduct);
                }
              }}
            >
              {isFavorite(favoriteId) ? (
                <img src="img/home/card/fav-hover.svg" alt="" />
              ) : (
                <img src="img/home/card/fav.svg" alt="" />
              )}
            </button>
          </section>

          <div className="card-props props-table">
            <p className="card-props-line">
              <span className="card-props-line-title">Screen</span>
              <span>{products.screen}</span>
            </p>
            <p className="card-props-line">
              <span className="card-props-line-title">Resolution</span>
              <span>{products.resolution}</span>
            </p>
            <p className="card-props-line">
              <span className="card-props-line-title">Processor</span>
              <span>{products.processor}</span>
            </p>
            <p className="card-props-line">
              <span className="card-props-line-title">RAM</span>
              <span>{products.ram}</span>
            </p>
          </div>
        </div>
      </section>
      <h6 className="selector-title selector-hidden-title">
        <span>ID: 802390</span>
      </h6>
    </>
  );
};
