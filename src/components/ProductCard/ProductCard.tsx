import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './ProductCard.scss';

import { Product } from '../../types/Product';
import { PageContext } from '../../utils/GlobalContext';

type Props = {
  product: Product;
  section: string;
};

export const ProductCard: React.FC<Props> = React.memo(({
  product: {
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    id,
    phoneId,
  },
  section,
}) => {
  const {
    favorietsList,
    cardList,
    setFavorietsList,
    setCardList,
  } = useContext(PageContext);

  const modifyFavorietsList = () => {
    const filteredList = favorietsList.filter(el => el !== id);

    if (favorietsList.includes(id)) {
      setFavorietsList(filteredList);
    } else {
      setFavorietsList([...favorietsList, id]);
    }
  };

  const modifyCardList = () => {
    const filteredList = cardList.filter(el => el !== id);

    if (!cardList.includes(id)) {
      setCardList([...cardList, id]);
    } else {
      setCardList(filteredList);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="productCard">
      <Link
        className="productCard__img"
        to={`/phones/${phoneId}`}
        onClick={scrollToTop}
      >
        <img src={`./new/${image}`} alt={name} className="productCard__img-photo" />
      </Link>
      <div className="productCard__main-info">
        <Link
          className="productCard__title"
          to={`/phones/${phoneId}`}
          onClick={scrollToTop}
        >
          {name}
        </Link>
        <div className="productCard__prices">
          <h3 className="productCard__price">{`$${price}`}</h3>
          {section === 'hot'
            && (
              <h3 className="productCard__fullPrice">{`$${fullPrice}`}</h3>
            )}
        </div>
      </div>
      <div className="productCard__details">
        <div className="productCard__detail">
          <p className="productCard__info">Screen</p>
          <p className="productCard__info productCard__info--char">
            {screen}
          </p>
        </div>

        <div className="productCard__detail">
          <p className="productCard__info">Capacity</p>
          <p className="productCard__info productCard__info--char">
            {capacity}
          </p>
        </div>

        <div className="productCard__detail">
          <p className="productCard__info">RAM</p>
          <p className="productCard__info productCard__info--char">
            {ram}
          </p>
        </div>
      </div>

      <div className="productCard__buttons">
        <button
          className={classNames(
            'productCard__card-button',
            { 'productCard__card-button--chosen': cardList.includes(id) },
          )}
          type="button"
          onClick={modifyCardList}
        >
          {cardList.includes(id)
            ? 'Added to cart'
            : 'Add to cart'}
        </button>
        <button
          aria-label="add to favoriets"
          data-cy="addToFavorite"
          className={classNames(
            'productCard__favorite-button',
            {
              'productCard__favorite-button--chosen':
                favorietsList.includes(id),
            },
          )}
          type="button"
          onClick={modifyFavorietsList}
        />
      </div>
    </div>
  );
});
