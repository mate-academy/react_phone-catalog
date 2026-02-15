import { ProductWithYear } from '../../types/product';
import styles from './ProductDetailsPage.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import debounce from 'lodash.debounce';
import { useEffect, useRef } from 'react';
import {
  resetHottestOffset,
  resetNewestOffset,
  resetOfferOffset,
  setItemWidth,
  setTotalWidth,
} from '../features/scroll';
import { NavLink } from 'react-router-dom';
import { CartButtons } from '../CartButtons';

type Props = {
  item: ProductWithYear;
  offset: number;
  discount?: number;
};

export const ProductDetailsPage: React.FC<Props> = ({
  item,
  offset,
  discount,
}) => {
  const { containerWidth } = useAppSelector(state => state.scroll);
  const itemRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const updateWidth = () => {
      if (itemRef.current) {
        const width = itemRef.current.offsetWidth;
        const totalWidth = width * 10 + 16 * 9;

        if (window.innerWidth > 1199) {
          dispatch(setItemWidth(containerWidth));
        } else if (window.innerWidth > 639) {
          dispatch(setItemWidth(width * 2 + 16));
        } else {
          dispatch(setItemWidth(width));
        }

        dispatch(setTotalWidth(totalWidth));
        dispatch(resetHottestOffset());
        dispatch(resetNewestOffset());
        dispatch(resetOfferOffset());
      }
    };

    updateWidth();
    const debouncedUpdate = debounce(updateWidth, 300);

    window.addEventListener('resize', debouncedUpdate);

    return () => {
      window.removeEventListener('resize', debouncedUpdate);
      debouncedUpdate.cancel();
    };
  }, [containerWidth, dispatch]);

  const extractScreenDetails = (screen: string) => {
    return screen
      .replace(/\(.*\)/, '')
      .replace(/display/i, '')
      .trim();
  };

  return (
    <div
      className={styles.container}
      ref={itemRef}
      style={{ transform: `translateX(-${offset}px)` }}
    >
      <NavLink
        to={`/${item.category}/${item.id}`}
        className={styles.linkContainer}
      >
        <div className={styles.imageContainer}>
          <img src={item.images[0]} alt={item.id} className={styles.image} />
        </div>
        <p className={styles.name}>{item.name}</p>
      </NavLink>

      <div className={styles.price}>
        ${item.priceDiscount}{' '}
        <p className={styles.priceDiscount}>{discount ? `$${discount}` : ''}</p>
      </div>
      <hr className={styles.line} />
      <div className={styles.detailsContainer}>
        <div className={styles.singleDetailContainer}>
          <p className={styles.detailName}>Screen</p>
          <p className={styles.detailInfo}>
            {extractScreenDetails(item.screen)}
          </p>
        </div>
        <div className={styles.singleDetailContainer}>
          <p className={styles.detailName}>Capacity</p>
          <p className={styles.detailInfo}>{item.capacity}</p>
        </div>
        <div className={styles.singleDetailContainer}>
          <p className={styles.detailName}>RAM</p>
          <p className={styles.detailInfo}>{item.ram}</p>
        </div>
      </div>
      <CartButtons product={item} />
    </div>
  );
};
