import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import styles from './Configurator.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';

const productIdModifier = (
  namespaceId: string,
  capacity: string,
  color: string,
) => {
  const colorFormatted = color.replace(' ', '-');

  return `${namespaceId + '-' + capacity.toLowerCase() + '-' + colorFormatted}`;
};

export const Configurator = () => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const {
    activeProduct,
    products,
    handleFavourites,
    handleCart,
    favourites,
    cart,
  } = useContext(AppContext) || {};
  const navigate = useNavigate();
  const location = useLocation();
  const product = products?.find(item => item.itemId === activeProduct?.id);

  useEffect(() => {
    if (
      favourites?.some(
        favouriteItem => product && favouriteItem.itemId === product.itemId,
      )
    ) {
      setIsLiked(true);
    }

    if (
      cart?.some(
        favouriteItem =>
          product && favouriteItem.product.itemId === product.itemId,
      )
    ) {
      setIsAddedToCart(true);
    }
  }, [favourites, cart, product]);

  const handleClick = (
    capacity = activeProduct?.capacity,
    color = activeProduct?.color,
  ) => {
    const pathSegments = location.pathname.split('/');

    pathSegments[pathSegments.length - 1] = productIdModifier(
      activeProduct?.namespaceId || '',
      capacity || '',
      color || '',
    );
    navigate(pathSegments.join('/'));
  };

  const handleLike = () => {
    setIsLiked(!isLiked);

    if (handleFavourites && product) {
      handleFavourites(product);
    }
  };

  const handleAddToCart = () => {
    setIsAddedToCart(!isAddedToCart);

    if (handleCart && product) {
      handleCart(product);
    }
  };

  return (
    <section className={styles.configurator}>
      <div className={styles.configurator__topContainer}>
        <div className={styles.configurator__colors}>
          <p className={styles.configurator__blocksTitle}>Available colors</p>

          <div className={styles.configurator__colorsRadioContainer}>
            {activeProduct?.colorsAvailable?.map((color, index) => (
              <input
                className={styles.configurator__colorsModificator}
                type="radio"
                id={`Color ${index}`}
                name="color"
                value={color}
                checked={color === activeProduct.color}
                key={index}
                readOnly
                data-color={color}
                onClick={() => handleClick(undefined, color)}
              />
            ))}
          </div>
        </div>

        <div className={styles.configurator__splitter} />

        <div className={styles.configurator__capacities}>
          <p className={styles.configurator__blocksTitle}>Select capacity</p>

          <div className={styles.configurator__capacitiesRadioContainer}>
            {activeProduct?.capacityAvailable.map((currentCapacity, index) => (
              <div className={styles.configurator__radioWrapper} key={index}>
                <input
                  // className={styles.configurator__colorsModificator}
                  type="radio"
                  id={`Capacity ${index}`}
                  name="capacity"
                  value={currentCapacity}
                  checked={currentCapacity === activeProduct.capacity}
                  onClick={() => handleClick(currentCapacity, undefined)}
                  readOnly
                />
                <label htmlFor={`Capacity ${index}`}>{currentCapacity}</label>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.configurator__splitter} />
      </div>

      <div className={styles.configurator__bottomContainer}>
        <div className={styles.configurator__priceAndButtons}>
          <div className={styles.configurator__priceContainer}>
            <h1 className={styles.configurator__actualPrice}>
              ${activeProduct?.priceDiscount}
            </h1>

            <p className={styles.configurator__oldPrice}>
              ${activeProduct?.priceRegular}
            </p>
          </div>

          <div className={styles.configurator__buttons}>
            <button
              className={classNames(styles.configurator__addToCart, {
                [styles.configurator__addedToCart]: isAddedToCart,
              })}
              onClick={handleAddToCart}
            >
              {isAddedToCart ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              className={classNames(styles.configurator__addToFavourite, {
                [styles.configurator__addedToFavourite]: isLiked,
              })}
              onClick={handleLike}
            ></button>
          </div>
        </div>

        <article className={styles.configurator__specs}>
          <div className={styles.configurator__specContainer}>
            <p>Screen</p>

            <p>{activeProduct?.screen}</p>
          </div>

          <div className={styles.configurator__specContainer}>
            <p>Resolution</p>

            <p>{activeProduct?.resolution}</p>
          </div>

          <div className={styles.configurator__specContainer}>
            <p>Processor</p>

            <p>{activeProduct?.processor}</p>
          </div>

          <div className={styles.configurator__specContainer}>
            <p>Capacity</p>

            <p>{activeProduct?.capacity}</p>
          </div>

          <div className={styles.configurator__specContainer}>
            <p>RAM</p>

            <p>{activeProduct?.ram}</p>
          </div>
        </article>
      </div>
    </section>
  );
};
