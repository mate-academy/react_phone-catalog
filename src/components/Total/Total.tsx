import React from 'react';
import styles from './Total.module.scss';
import '../../styles/App.scss';
import PrimaryButton from '../PrimaryButton';
import PriceBig from '../PriceBig';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

type TotalProps = {
  onOpenCheckout: () => void;
};

const Total: React.FC<TotalProps> = ({ onOpenCheckout }) => {
  const { totalCost, cardsLength } = useSelector(
    (state: RootState) => state.cards,
  );

  return (
    <div className={styles.total}>
      <div className={styles.total__price}>
        <PriceBig>${totalCost}</PriceBig>
        <p className={styles.total__text}>Total for {cardsLength} items</p>
      </div>
      <div className={styles.total__line}></div>
      <div className={styles.total__checkout} onClick={onOpenCheckout}>
        <PrimaryButton>Checkout</PrimaryButton>
      </div>
    </div>
  );
};

export default Total;
