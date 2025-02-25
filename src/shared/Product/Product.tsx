import React from 'react';
import styles from './Product.module.scss';
import { Article } from '../types/Article';
import { useNavigate } from 'react-router-dom';
import { DataNames } from '../../hooks/useProductsStorage';
import classNames from 'classnames';
import { useStorage } from '../../context/StorageContext';

type Props = {
  article: Article;
  fullPrice?: boolean;
  isCatalog?: boolean;
};

export const Product: React.FC<Props> = ({
  article,
  fullPrice = false,
  isCatalog = false,
}) => {
  const navigate = useNavigate();
  const { findProduct, addProduct, removeProduct } = useStorage();

  return (
    <article
      className={styles.article}
      style={{
        maxWidth: isCatalog ? '1000px' : undefined,
        width: isCatalog ? '100%' : undefined,
      }}
      onClick={() => navigate(`/${article.category}/${article.itemId}`)}
    >
      <img
        style={{ flex: 1 }}
        src={`${import.meta.env.BASE_URL}/${article.image}`}
        alt="Product Image"
        className={styles.image}
      />
      <p className={styles.title}>{article.name}</p>

      <div className={styles.prices}>
        <h3 className={styles.price}>{`$${article.price}`}</h3>
        {fullPrice && (
          <h3 className={styles.fullPrice}>{`$${article.fullPrice}`}</h3>
        )}
      </div>

      <div className={styles.decription}>
        <div className={styles.decription__item}>
          <p className={styles.decription__name}>Screen</p>
          <p className={styles.decription__value}>{article.screen}</p>
        </div>

        <div className={styles.decription__item}>
          <p className={styles.decription__name}>Capacity</p>
          <p className={styles.decription__value}>{article.capacity}</p>
        </div>

        <div className={styles.decription__item}>
          <p className={styles.decription__name}>RAM</p>
          <p className={styles.decription__value}>{article.ram}</p>
        </div>
      </div>

      <div className={styles.wrapper}>
        {!findProduct(DataNames.cart, article.itemId) ? (
          <button
            onClick={e => {
              e.stopPropagation();
              addProduct(DataNames.cart, article.itemId);
            }}
            className={styles.button}
          >
            Add to cart
          </button>
        ) : (
          <button
            onClick={e => {
              e.stopPropagation();
              removeProduct(DataNames.cart, article.itemId);
            }}
            className={classNames(styles.buttonAdded, styles.button)}
          >
            Added to cart
          </button>
        )}
        {!findProduct(DataNames.favourites, article.itemId) ? (
          <button
            onClick={e => {
              e.stopPropagation();
              addProduct(DataNames.favourites, article.itemId);
            }}
            style={{
              backgroundImage: `url('${import.meta.env.BASE_URL}/img/icons/favourites.svg')`,
            }}
            className={styles.favourite}
          />
        ) : (
          <button
            onClick={e => {
              e.stopPropagation();
              removeProduct(DataNames.favourites, article.itemId);
            }}
            style={{
              backgroundImage: `url('${import.meta.env.BASE_URL}/img/icons/favourites_selected.svg')`,
            }}
            className={classNames(styles.favourite)}
          />
        )}
      </div>
    </article>
  );
};
