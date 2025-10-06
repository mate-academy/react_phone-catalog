import React, { useContext } from "react";
import styles from './ProductMainControls.module.scss';
import { Phone } from "../../../../types/Phone";
import favourites from '../../../../shared/images/icones/header-favourites-icon-3x.png';
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../../context/CartContext";
import favActive from '../../../../shared/images/icones/favorites-active.png';
import { FavoritesContext } from "../../../../context/FavoritesContext";

type Props = {
  product: Phone;
};

function getColor(color: string) {
  if (color === 'midnight') {
    return '#1d242e';
  }

  if (color === 'sierrablue') {
    return '#3b7bd6ff';
  }

  if (color === 'sky blue') {
    return '#a1dcf8ff';
  }

  if (color === 'graphite') {
    return 'gray';
  }

  if (color === 'purple') {
    return '#daafefff';
  }

  if (color === 'rosegold' || color === 'rose gold') {
    return '#f29daaff';
  }

  if (color === 'spaceblack') {
    return '#393939ff';
  }

  if (color === 'spacegray' || color === 'space gray') {
    return 'gray';
  }

  if (color === 'starlight') {
    return '#f6e6d4ff';
  }

  return color;
}

export const ProductMainControls: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();
  const { items: cartItems, toggleToCart } = useContext(CartContext);
  const { items: favItems, toggleFavorites } = useContext(FavoritesContext);

  const handleChangeColor = (prod: Phone, color: string) => {
    const splittedColor = color.split(' ');
    const joinedColor = splittedColor.join('-');

    navigate(
      `/product/${prod.namespaceId}-${prod.capacity.toLowerCase()}-${joinedColor}`,
    );
  };

  const handleChangeCapacity = (prod: Phone, newCapacity: string) => {
    const splittedColor = prod.color.split(' ');
    const joinedColor = splittedColor.join('-');

    navigate(
      `/product/${prod.namespaceId}-${newCapacity.toLowerCase()}-${joinedColor}`,
    );
  };

  const inCart = cartItems.some(item => item.product.id === product.id);
  const inFav = favItems.some(item => item.id === product.id);

  return (
    <div className={styles.maincontrols}>
      <div className={styles['maincontrols__selects-container']}>
        <p style={{ color: '#89939A' }} className="small-text">
          Available colors
        </p>
        <div className={styles.maincontrols__selects}>
          {product.colorsAvailable.map((color, index) => (
            <label
              key={index}
              className={styles['maincontrols__color-label']}
            >
              <input
                type="radio"
                name="color"
                onChange={() => handleChangeColor(product, color)}
                className={styles.productdetails__color}
              />
              <div style={{ backgroundColor: getColor(color) }}></div>
            </label>
          ))}
        </div>
      </div>
      <div className={styles.maincontrols__line}></div>
      <div className={styles['maincontrols__selects-container']}>
        <p style={{ color: '#89939A' }} className="small-text">
          Select capacity
        </p>
        <div className={styles.maincontrols__selects}>
          {product.capacityAvailable.map((capacityProd, index) => (
            <label
              key={index}
              className={`${styles['maincontrols__capacity-label']} ${capacityProd === product.capacity ? styles['capacity-active'] : ''}`}
            >
              <input
                type="radio"
                name="color"
                onChange={() => {
                  handleChangeCapacity(product, capacityProd);
                }}
              />
              <span className="body-text" style={{ whiteSpace: 'nowrap' }}>
                {capacityProd.replace('GB', ' GB')}
              </span>
            </label>
          ))}
        </div>
      </div>
      <div className={styles.maincontrols__line}></div>
      <div className={styles.maincontrols__purchase}>
        <div className={styles.maincontrols__prices}>
          <h2 style={{ fontSize: '32px' }}>{`$${product.priceDiscount}`}</h2>
          <span className={styles['maincontrols__price-regular']}>
            {`$${product.priceRegular}`}
          </span>
        </div>
        <div className={styles.maincontrols__buttons}>
          <button
            onClick={() => toggleToCart(product)}
            className={`${styles.maincontrols__button} ${inCart ? styles.pulse : ''}`}
          >
            Add to cart
          </button>
          <div
            className={styles['maincontrols__icon-container']}
            onClick={() => toggleFavorites(product)}
          >
            <img
              src={inFav ? favActive : favourites}
              alt="favourites"
              className={`${styles.maincontrols__icon} ${inFav ? styles['pulse-fav'] : ''}`}
            />
          </div>
        </div>
      </div>
      <div className={styles.maincontrols__description}>
        <div className={styles.maincontrols__info}>
          <p className="small-text">Screen</p>
          <p className="small-text">{product.screen}</p>
        </div>
        <div className={styles.maincontrols__info}>
          <p className="small-text">Resolution</p>
          <p className="small-text">{product.resolution}</p>
        </div>
        <div className={styles.maincontrols__info}>
          <p className="small-text">Processor</p>
          <p className="small-text">{product.processor}</p>
        </div>
        <div className={styles.maincontrols__info}>
          <p className="small-text">RAM</p>
          <p className="small-text">{product.ram}</p>
        </div>
      </div>
    </div>
  );
};
