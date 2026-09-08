/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect } from 'react';
import styles from './Product.module.scss';
import { Gadget } from '../../../../types/Gadget';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../../../StoreProvider';
import { ProductsContext } from '../../../../ProductsProvider';
import { ThemeContext } from '../../../../ThemeProvider';

type Props = {
  gadget: Gadget;
  image: string;
  color: string;
  capacity: string;
  handleSelectImage: (newImage: string) => void;
  handleSelectColor: (newColor: string) => void;
  handleSelectCapacity: (newCapacity: string) => void;
};

export const Product: React.FC<Props> = ({
  gadget,
  image,
  color,
  capacity,
  handleSelectImage,
  handleSelectColor,
  handleSelectCapacity,
}) => {
  const colorsPicker: Record<string, string> = {
    spacegray: '#363636',
    midnightgreen: '#4a544c',
    gold: '#fad7bc',
    silver: '#c7c8cc',
    rosegold: '#f4cec6',
    coral: '#fb6350',
    midnight: '#111135ff',
    spaceblack: '#0B0B0B',
    graphite: '#5c5b57',
    sierrablue: '#9db9d2',
    skyblue: '#d1dde9',
    starlight: '#F5F5DC',
    yellow: '#fbe678',
    purple: '#bfb6ed',
    green: '#afe2cc',
    pink: '#f9dcd6',
    blue: '#246181',
    red: '#e23637',
  };

  const {
    isAddedToCart,
    isAddedToFavourites,
    addItemToCart,
    addItemToFavourites,
  } = useContext(StoreContext);

  const { products } = useContext(ProductsContext);

  const { theme } = useContext(ThemeContext);

  const imglink =
    theme === 'dark'
      ? 'images/Favourites (Heart Like) Dark.svg'
      : 'images/Favourites (Heart Like).svg';

  const navigate = useNavigate();

  const product = products.find(prod => prod.itemId === gadget.id);

  const handleSetItemId = (newCapacity: string, newColor: string) => {
    const newId = `${gadget.namespaceId}-${newCapacity.toLowerCase()}-${newColor.replaceAll(' ', '-')}`;

    navigate(`/product/${newId}`);
  };

  const handleNoImage = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const button = event.currentTarget.parentElement;

    if (button) {
      button.style.display = 'none';
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{gadget.name}</h1>

      <div className={styles.carousel}>
        {gadget.images.map(gadgetImage => (
          <button
            key={gadgetImage}
            className={styles.imgbutton}
            onClick={() => handleSelectImage(gadgetImage)}
          >
            <img
              src={gadgetImage}
              className={styles.image}
              alt={gadget.name}
              onError={event => handleNoImage(event)}
            />
          </button>
        ))}
      </div>

      <div className={styles.mainphoto}>
        <img src={image} alt={gadget.name} className={styles.photo} />
      </div>

      <div className={styles.shortdescription}>
        <div className={styles.available}>
          <span className={styles.inner}>Available colors</span>
          <div className={styles.colors}>
            {gadget.colorsAvailable.map(gadgetColor => (
              <label key={gadgetColor} htmlFor={gadgetColor}>
                <input
                  type="radio"
                  name="color"
                  value={gadgetColor}
                  checked={gadgetColor === color}
                />
                <span
                  className={`${styles.circle} ${gadgetColor === color ? styles.active : ''}`}
                  style={{
                    backgroundColor:
                      colorsPicker[gadgetColor.split(' ').join('')] ||
                      gadgetColor,
                  }}
                  onClick={() => {
                    handleSelectColor(gadgetColor);
                    handleSetItemId(capacity, gadgetColor);
                  }}
                />
              </label>
            ))}
          </div>
          <hr />
        </div>

        <div className={styles.available}>
          <span className={styles.inner}>Select capacity</span>
          <div className={styles.memory}>
            {gadget.capacityAvailable.map(gadgetCapacity => (
              <label key={gadgetCapacity} htmlFor={gadgetCapacity}>
                <input
                  type="radio"
                  name="capacity"
                  value={gadgetCapacity}
                  checked={gadgetCapacity === capacity}
                />
                <span
                  className={`${styles.capacity} ${gadgetCapacity === capacity ? styles.active : ''}`}
                  onClick={() => {
                    handleSelectCapacity(gadgetCapacity);
                    handleSetItemId(gadgetCapacity, color);
                  }}
                >
                  {gadgetCapacity.replaceAll('GB', ' GB')}
                </span>
              </label>
            ))}
          </div>
          <hr />
        </div>

        <div className={styles.mainactions}>
          <div className={styles.price}>
            <span
              className={styles.newprice}
            >{`$${gadget.priceDiscount}`}</span>
            <span className={styles.oldprice}>{`$${gadget.priceRegular}`}</span>
          </div>

          <div className={styles.buttons}>
            <button
              className={`${styles.addbutton} ${product && isAddedToCart(product.id) ? styles.active : ''}`}
              onClick={() => {
                if (product) {
                  addItemToCart({ id: product.id, product, quantity: 1 });
                }
              }}
            >
              {product && isAddedToCart(product.id)
                ? 'Added to cart'
                : 'Add to cart'}
            </button>
            <button
              className={styles.favorites}
              onClick={() => {
                if (product) {
                  addItemToFavourites(product);
                }
              }}
            >
              <img
                src={
                  product && isAddedToFavourites(product.id)
                    ? 'images/Favourites Filled (Heart Like).svg'
                    : 'images/Favourites (Heart Like).svg'
                }
                alt="Favorites"
              />
            </button>
          </div>
        </div>

        <div className={styles.shortspecs}>
          <span className={styles.outer}>
            <span className={styles.inner}>Screen</span>
            {gadget.screen}
          </span>
          <span className={styles.outer}>
            <span className={styles.inner}>Resolution</span>
            {gadget.resolution}
          </span>
          <span className={styles.outer}>
            <span className={styles.inner}>Processor</span>
            {gadget.processor}
          </span>
          <span className={styles.outer}>
            <span className={styles.inner}>RAM</span>
            {gadget.ram.replaceAll('GB', ' GB')}
          </span>
        </div>
      </div>
    </div>
  );
};
