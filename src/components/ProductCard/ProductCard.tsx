import React, { useState } from 'react';
import styles from './ProductCard.module.scss';
import { Phone } from '../../types/Phone';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  product: Phone;
  category: string;
  onPage?: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, category, onPage }) => {
  const [clicked, setClicked] = useState(false);
  return (
    <>
      <div
        className={classNames(`${styles.product_card_container}`, {
          [styles.product_card_container_on_page]: onPage,
        })}
      >
        <div
          className={classNames(`${styles.img_and_title_wrapper}`, {
            [styles.img_and_title_wrapper_on_page]: onPage,
          })}
        >
          <Link
            to={`/${category}/${product.id}`}
            className={`${styles.title_link} ${styles.img_wrapper}`}
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className={`${styles.image}`}
            />
          </Link>
          <Link
            to={`/${category}/${product.id}`}
            className={`${styles.title_link} ${styles.title_wrapper}`}
          >
            <h3 className={`${styles.title}`}>{product.name}</h3>
          </Link>
        </div>
        <div className={`${styles.price_wrapper}`}>
          <h2 className={`${styles.price}`}>{`$${product.priceRegular}`}</h2>
          <h2 className={`${styles.oldPrice}`}>{`$${product.priceDiscount}`}</h2>
        </div>

        <div className={`${styles.line}`} />

        <div
          className={classNames(`${styles.phone_charact_container}`, {
            [styles.phone_charact_container_on_page]: onPage,
          })}
        >
          <div
            className={classNames(`${styles.phone_charact}`, {
              [styles.phone_charact_on_page]: onPage,
            })}
          >
            <p className={`${styles.phone_charact_parag}`}>Screen</p>
            <p className={`${styles.phone_charact_parag} ${styles.char_value}`}>
              {product.screen}
            </p>
          </div>
          <div
            className={classNames(`${styles.phone_charact}`, {
              [styles.phone_charact_on_page]: onPage,
            })}
          >
            <p className={`${styles.phone_charact_parag}`}>Capacity</p>
            <p className={`${styles.phone_charact_parag} ${styles.char_value}`}>
              {product.capacity}
            </p>
          </div>
          <div
            className={classNames(`${styles.phone_charact}`, {
              [styles.phone_charact_on_page]: onPage,
            })}
          >
            <p className={`${styles.phone_charact_parag}`}>RAM</p>
            <p className={`${styles.phone_charact_parag} ${styles.char_value}`}>
              {product.ram}
            </p>
          </div>
        </div>

        <div
          className={classNames(`${styles.buttons_container}`, {
            [styles.buttons_container_on_page]: onPage,
          })}
        >
          <button
            className={classNames(`${styles.button} ${styles.button_add}`, {
              [styles.button_add_on_page]: onPage,
            })}
          >
            Add to cart
          </button>
          <button
            className={`${styles.button} ${styles.button_like}`}
            onClick={() => (clicked ? setClicked(false) : setClicked(true))}
          >
            <img
              src={
                clicked
                  ? './img/icons/card-selected-like.svg'
                  : './img/icons/card-default-like.svg'
              }
              alt="like button"
            />
          </button>
        </div>
      </div>
    </>
  );
};
