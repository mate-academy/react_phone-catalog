import React, { useMemo } from 'react';
import styles from './PrimaryButton.module.scss';
import '../../styles/App.scss';
import classNames from 'classnames';
import { Product } from '../../types/products';
import { useDispatch, useSelector } from 'react-redux';
import { addToCard, removeFromCard } from '../../store/slices/cardsSlice';
import { RootState } from '../../store/store';

interface PrimaryButtonProps {
  children: React.ReactNode;
  product?: Product;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, product }) => {
  const dispatch = useDispatch();

  const { cards } = useSelector((state: RootState) => state.cards);

  const isSelected = useMemo(() => {
    if (!product) {
      return false;
    }

    return cards.some(card => card.card.itemId === product.itemId);
  }, [cards, product]);

  function handleButtonClick() {
    if (product) {
      if (isSelected) {
        dispatch(removeFromCard(product.itemId));

        return;
      }

      dispatch(addToCard(product));
    }
  }

  return (
    <button
      className={classNames(styles.button, {
        [styles['button--selected']]: isSelected,
      })}
      onClick={handleButtonClick}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
