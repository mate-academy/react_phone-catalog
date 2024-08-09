/* eslint-disable max-len */
import styles from './ProductCard.module.scss';
import { Product } from '../../../types/Product';
import { useAppSelector } from '../../../app/hooks';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CardButtonsBlock } from '../CardButtonsBlock/CardButtonsBlock';
import { useDispatch } from 'react-redux';
import { handleClickOnGadget } from './../clickOnGadget';

type Props = {
  gadget: Product;
};

export const ProductCard: React.FC<Props> = ({ gadget }) => {
  const dispatch = useDispatch();

  const [heartIco, setHeartIco] = useState('./icons/heart-ico.svg');
  const [isInCatr, setIsinCart] = useState(false);

  const favoritesArray = useAppSelector(state => state.chosenItems.favorite);
  const cartArray = useAppSelector(state => state.chosenItems.cart);

  useEffect(() => {
    if (!favoritesArray.some(obj => obj.id === gadget.id)) {
      setHeartIco('./icons/heart-ico.svg');
    } else {
      setHeartIco('./icons/heart-red-ico.svg');
    }

    if (!cartArray.some(obj => obj.id === gadget.id)) {
      setIsinCart(false);
    } else {
      setIsinCart(true);
    }
  }, [favoritesArray, gadget]);

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

        <CardButtonsBlock
          gadg={gadget}
          favIco={heartIco}
          isInBasket={isInCatr}
          setIsInBasket={setIsinCart}
        />
      </div>
    </div>
  );
};
