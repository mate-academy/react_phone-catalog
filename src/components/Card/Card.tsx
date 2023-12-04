/* eslint-disable react/require-default-props */
import React, { useContext } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { GlobalContext } from '../../Context/GlobalContext';
import { BASE_URL } from '../../utils/constants';
import './Card.scss';

type Props = {
  item: Product,
  discount: boolean,
};

export const Card: React.FC<Props> = ({ item, discount }) => {
  const {
    products,
    setProducts,
    localStore,
    setLocalStore,
  } = useContext(GlobalContext);
  const handleBtnClick = (card: Product, action: string) => {
    const currentProducts = [...products];
    let currentStoreState = [...localStore];
    let updatedCard: Product = { ...card };

    if (action === 'cart') {
      updatedCard = { ...card, inCart: !card.inCart, count: 1 };
    } else {
      updatedCard = { ...card, inFavourite: !card.inFavourite };
    }

    const index = currentProducts
      .findIndex(product => product.id === card.id);

    if (!updatedCard.inCart && !updatedCard.inFavourite) {
      currentStoreState = currentStoreState
        .filter(product => product.id !== updatedCard.id);
    } else {
      const indexStore = currentStoreState
        .findIndex(storeItem => storeItem.id === card.id);

      if (indexStore !== -1) {
        currentStoreState.splice(indexStore, 1, updatedCard);
      } else {
        currentStoreState = [...currentStoreState, updatedCard];
      }
    }

    currentProducts.splice(index, 1, updatedCard);

    setProducts(currentProducts);
    setLocalStore(currentStoreState);
  };

  return (
    <div className="product-card">
      <Link to={`/phones/${item.phoneId}`} className="product-card_img-container">
        <img
          src={`${BASE_URL}${item?.image}`}
          alt="Product banner"
          className="product-card_img"
        />
      </Link>
      <Link
        to={`/phones/${item.phoneId}`}
        className="product-card_title body-text-style"
      >
        {item.name}
      </Link>
      <div className="product-card_price">
        <p className="product-card_price_new h2-text-style">{`$${item.price}`}</p>
        {discount && (
          <p className="product-card_price_old"><s>{`$${item.fullPrice}`}</s></p>
        )}
      </div>
      <div className="breaking-line" />
      <div className="product-card_specs">
        <div className="product-card_specs-box">
          <p className="product-card_specs-title small-text-style">Screen</p>
          <p className="product-card_specs-details small-text-style">
            {item.screen}
          </p>
        </div>
        <div className="product-card_specs-box">
          <p className="product-card_specs-title small-text-style">Capacity</p>
          <p className="product-card_specs-details small-text-style">
            {item.capacity}
          </p>
        </div>
        <div className="product-card_specs-box">
          <p className="product-card_specs-title small-text-style">RAM</p>
          <p className="product-card_specs-details small-text-style">
            {item.ram}
          </p>
        </div>
      </div>
      <div className="product-card_btns">
        <div className="btn_container">
          <button
            type="button"
            className={cn('btn-add-to-cart btn-cart btn-text-style', {
              'btn-cart--animation': item.inCart,
            })}
            onClick={() => handleBtnClick(item, 'cart')}
          >
            {item.inCart ? (
              'Added to cart') : (
              'Add to cart'
            )}
          </button>
        </div>
        <button
          aria-label="Favourites"
          type="button"
          className={cn('btn-add-to-fav btn-fav', {
            'btn-fav--added': item.inFavourite,
          })}
          onClick={() => handleBtnClick(item, 'favourites')}
        />
      </div>
    </div>
  );
};
