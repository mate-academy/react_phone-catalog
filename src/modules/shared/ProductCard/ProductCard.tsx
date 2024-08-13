/* eslint-disable max-len */
import styles from './ProductCard.module.scss';
import { Product } from '../../../types/Product';
import { useAppSelector } from '../../../app/hooks';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CardButtonsBlock } from '../CardButtonsBlock/CardButtonsBlock';
import { useDispatch } from 'react-redux';
import { handleClickOnGadget } from './../clickOnGadget';

type Props = {
  gadget: Product;
};

export const ProductCard: React.FC<Props> = ({ gadget }) => {
  const dispatch = useDispatch();

  const isDark = useAppSelector(state => state.boolean.isDark);

  useEffect(() => {
    const card = document.getElementsByClassName(styles.card);

    for (let i = 0; i < card.length; i++) {
      const element = card[i] as HTMLElement;

      if (isDark) {
        element.style.setProperty('--elements-grey-color', '#323542');
        element.style.setProperty('--card-slider-shadow', '#000000');
      } else {
        element.style.setProperty('--elements-grey-color', '#e2e6e9');
        element.style.setProperty('--card-slider-shadow', '#0000001a');
      }
    }
  }, [isDark]);

  return (
    <div className={styles.card}>
      <div className={styles.card__topBlock}>
        <Link
          onClick={() => handleClickOnGadget(gadget, dispatch)}
          className={styles.card__imgLink}
          to={`/${gadget.category}/${gadget.itemId}`}
        >
          <img
            className={styles.card__image}
            src={gadget.image}
            alt="product picture"
          />
        </Link>

        <Link
          onClick={() => handleClickOnGadget(gadget, dispatch)}
          to={`/${gadget.category}/${gadget.itemId}`}
          className={styles.card__name}
        >
          {gadget.name}
        </Link>
      </div>

      <div className={styles.card__bottomBlock}>
        <div className={styles.card__priceBlock}>
          <p className={styles.card__newPrice}>{`$${gadget.price}`}</p>
          <p className={styles.card__oldPrice}>{`$${gadget.fullPrice}`}</p>
        </div>

        <div className={styles.card__divider} />

        <div className={styles.card__infoBlock}>
          <p className={styles.card__infoTitle}>Screen</p>
          <p className={styles.card__infoValue}>{gadget.screen}</p>
        </div>

        <div className={styles.card__infoBlock}>
          <p className={styles.card__infoTitle}>Capacity</p>
          <p className={styles.card__infoValue}>{gadget.capacity}</p>
        </div>

        <div className={styles.card__infoBlock}>
          <p className={styles.card__infoTitle}>RAM</p>
          <p className={styles.card__infoValue}>{gadget.ram}</p>
        </div>

        <CardButtonsBlock gadg={gadget} />
      </div>
    </div>
  );
};
