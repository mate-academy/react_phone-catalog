import React, { useEffect } from 'react';
import { Action } from '../../../../types/Action';
import { ProductDemo } from '../../../../types/ProductDemo';
import { ProductFullInfo } from '../../../../types/ProductFullInfo';
import styles from './ConfirmOrder.module.scss';

type ConfirmOrderProps = {
  chosedItem: ProductFullInfo;
  chosedItemDemo: ProductDemo | undefined;
  activeAdd: boolean;
  setActiveAdd: (val: boolean) => void;
  activeHeart: boolean;
  setActiveHeart: (val: boolean) => void;
  updateList: (item: ProductDemo, direction: Action) => void;
};

export const ConfirmOrder: React.FC<ConfirmOrderProps> = ({
  chosedItem,
  chosedItemDemo,
  activeAdd,
  setActiveAdd,
  activeHeart,
  setActiveHeart,
  updateList,
}) => {
  // ✅ Перевірка чи товар уже в кошику — при відкритті сторінки
  useEffect(() => {
    if (!chosedItemDemo) {
      return;
    }

    const cartKey = `cart_${chosedItemDemo.itemId}_${chosedItemDemo.color}_${chosedItemDemo.capacity}`;
    const existing = localStorage.getItem(cartKey);

    setActiveAdd(!!existing);
  }, [chosedItemDemo, setActiveAdd]);

  return (
    <>
      <section className={styles.confirm}>
        <div className={styles.confirm_price}>
          <span>{`$${chosedItem?.priceDiscount}`}</span>
          <span className={styles.confirm_fullPrice}>
            ${chosedItem?.priceRegular}
          </span>
        </div>

        <div className={styles.confirm_actions}>
          <button
            className={`${styles.confirm_button} ${styles.confirm_add}`}
            style={{
              backgroundColor: activeAdd ? '#323542' : '',
              color: activeAdd ? '#fff' : '',
              borderColor: activeAdd ? '#323542' : '',
            }}
            onClick={() => {
              if (chosedItemDemo) {
                updateList(chosedItemDemo, 'toCart');
                setActiveAdd(!activeAdd);
              }
            }}
          >
            {activeAdd ? 'Added to cart' : 'Add to cart'}
          </button>

          <button
            className={`${styles.confirm_button} ${styles.confirm_heart}`}
            onClick={() => {
              if (chosedItemDemo) {
                updateList(chosedItemDemo, 'toFavorite');
              }

              setActiveHeart(!activeHeart);
            }}
          >
            <img
              src={
                activeHeart
                  ? 'img/icons/red heart.svg'
                  : 'img/icons/white_heart.svg'
              }
              alt={activeHeart ? 'red_heart' : 'white_heart'}
            />
          </button>
        </div>
      </section>

      {/* Specifications short */}
      <section className={styles.specsShort}>
        <div
          className={`${styles.specsShort_parameter} ${styles.specsShort_screen}`}
        >
          <span className={styles.specifications_option}>Screen</span>
          <span className={styles.specifications_value}>
            {chosedItem?.screen}
          </span>
        </div>

        <div
          className={`${styles.specsShort_parameter} ${styles.specsShort_resolution}`}
        >
          <span className={styles.specifications_option}>Resolution</span>
          <span className={styles.specifications_value}>
            {chosedItem?.resolution}
          </span>
        </div>

        <div
          className={`${styles.specsShort_parameter} ${styles.specsShort_processor} `}
        >
          <span className={styles.specifications_option}>Processor</span>
          <span className={styles.specifications_value}>
            {chosedItem?.processor}
          </span>
        </div>

        <div
          className={`${styles.specsShort_parameter} ${styles.specsShort_ram} `}
        >
          <span className={styles.specifications_option}>RAM</span>
          <span className={styles.specifications_value}>{chosedItem?.ram}</span>
        </div>
      </section>
    </>
  );
};
