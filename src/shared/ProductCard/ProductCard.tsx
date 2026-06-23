/* eslint-disable react/display-name */
import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import { ProductDemo } from '../../types/ProductDemo';
import React, { useEffect, useState } from 'react';
import { useMyContext } from '../../Context/ProductContexts';

type ProductCardProps = {
  product: ProductDemo;
  showFullPrice?: boolean;
  productPage?: boolean;
  setNewProduct?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ProductCard = React.memo(
  ({
    product,
    showFullPrice,
    productPage,
    setNewProduct,
  }: ProductCardProps) => {
    const { setHeartIsPressed, setAddIsPressed } = useMyContext();
    const [activeHeart, setActiveHeart] = useState(false);
    const [activeAdd, setActiveAdd] = useState(false);

    const updateList = (item: ProductDemo, direction: string) => {
      const productId = item.itemId;

      switch (direction) {
        case 'toCart':
          const existingOrder = localStorage.getItem(`cart_${productId}`);

          if (existingOrder) {
            setAddIsPressed(prev => !prev);

            return;
          } else {
            localStorage.setItem(`cart_${productId}`, JSON.stringify(item));
            setAddIsPressed(prev => !prev);
            setActiveAdd(true);
          }

          break;
        case 'toFavorite':
          const existingProduct = localStorage.getItem(productId);

          if (existingProduct) {
            localStorage.removeItem(productId);

            setActiveHeart(false);
            setHeartIsPressed(prev => !prev);
          } else {
            localStorage.setItem(productId, JSON.stringify(item));

            setActiveHeart(true);
            setHeartIsPressed(prev => !prev);
          }

          break;
      }
    };

    useEffect(() => {
      const checkTheStorage = () => {
        const favoriteInStorage = localStorage.getItem(product.itemId);

        if (favoriteInStorage) {
          setActiveHeart(true);
        } else {
          setActiveHeart(false);
        }

        const orderInStorage = localStorage.getItem(`cart_${product.itemId}`);

        if (orderInStorage) {
          setActiveAdd(true);
        } else {
          setActiveAdd(false);
        }
      };

      checkTheStorage();
    }, [activeHeart, activeAdd]);

    return (
      <div className={styles.embla__slide}>
        <li
          className={styles.card}
          style={productPage ? { width: '272px' } : undefined}
        >
          <Link
            to={`/product/${product.itemId}`}
            className={styles.image_block}
            onClick={() => {
              if (setNewProduct) {
                setNewProduct(prev => !prev);
              }
            }}
          >
            <img
              className={styles.image_block_photo}
              src={`${product.image}`}
              alt={product.name}
            />
          </Link>

          <div className={styles.link_block}>
            <Link
              to={`/product/${product.itemId}`}
              className={styles.link_block_text}
              onClick={() => {
                if (setNewProduct) {
                  setNewProduct(prev => !prev);
                }
              }}
            >
              {product.name}
            </Link>
          </div>

          <div className={styles.price_block}>
            <span
              className={styles.price_block_text}
            >{`$${product.price}`}</span>

            {showFullPrice && (
              <span
                className={styles.price_block_discount}
              >{`$${product.fullPrice}`}</span>
            )}
          </div>

          <div className={styles.border}></div>

          <div className={styles.block_parameters}>
            <div
              className={`${styles.block_parameters_parameter} ${styles.block_parameters_screen}`}
            >
              <span className={styles.block_parameters_parameter_name}>
                Screen
              </span>
              <span className={styles.block_parameters_parameter_value}>
                {product.screen}
              </span>
            </div>
            <div
              className={`${styles.block_parameters_parameter} ${styles.block_parameters_apacity}`}
            >
              <span className={styles.block_parameters_parameter_name}>
                Capacity
              </span>
              <span className={styles.block_parameters_parameter_value}>
                {product.capacity}
              </span>
            </div>
            <div
              className={`${styles.block_parameters_parameter} ${styles.block_parameters_ram} `}
            >
              <span className={styles.block_parameters_parameter_name}>
                RAM
              </span>
              <span className={styles.block_parameters_parameter_value}>
                {product.ram}
              </span>
            </div>
          </div>

          <div className={styles.action}>
            <button
              className={`${styles.action_button} ${styles.add}`}
              style={activeAdd ? { backgroundColor: '#323542' } : {}}
              onClick={() => {
                updateList(product, 'toCart');
              }}
            >
              {activeAdd ? 'Added' : 'Add to cart'}
            </button>
            <button
              className={`${styles.action_button} ${styles.heart}`}
              onClick={() => {
                updateList(product, 'toFavorite');
              }}
            >
              <img
                src={
                  activeHeart
                    ? 'img/Additional images/icons/red heart.svg'
                    : 'img/Additional images/icons/white_heart.svg'
                }
                alt={activeHeart ? 'red_heart' : 'white_heart'}
              />
            </button>
          </div>
        </li>
      </div>
    );
  },
);
