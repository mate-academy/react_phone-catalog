import React, { useContext } from 'react';
import classNames from 'classnames';
import './ButtonAddCard.scss';
import { Product } from '../../types/Product';
import { CardContext } from '../../api/context/CardContext';

interface Props {
  product: Product;
}

export const ButtonAddCard: React.FC<Props> = ({ product }) => {
  const { cardProducts, handleAddToCard } = useContext(CardContext);
  const isCardAdded = cardProducts.find(item => item.id === product.id);

  return (
    <button
      className={classNames('buttonAdd', { 'is-added': isCardAdded })}
      type="button"
      onClick={(event) => {
        event.preventDefault();
        handleAddToCard(product);
      }}
    >
      {isCardAdded ? 'Added to cart' : 'Add to cart'}
    </button>

  );
};
