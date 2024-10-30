import classNames from 'classnames';

import styles from './OrderProps.module.scss';

import { AllProduct } from '../../types/UnionType';
import { Phone } from '../../types/Phone';
import { Accessoirs } from '../../types/Accesories';
import { Tables } from '../../types/Tablets';

import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { changeFavorites } from '../../redux/favoritesSlice';
import { addCart } from '../../redux/cartSlice';
import Skeleton from 'react-loading-skeleton';

interface Props {
  card: Phone | Accessoirs | Tables | null | undefined;
  handleColorChange: (cl: string) => void;
  handleCapacityChange: (cp: string) => void;
}

export const OrderProps: React.FC<Props> = ({
  card,
  handleColorChange,
  handleCapacityChange,
}) => {
  const favoritesIds = useAppSelector(state => state.favorites.data).map(
    (item: AllProduct) => ('itemId' in item ? item.itemId : item.id),
  );
  const cartIds = useAppSelector(state => state.cart.data).map(
    ({ item }: { item: AllProduct }) =>
      'itemId' in item ? item.itemId : item.id,
  );

  const dispatch = useAppDispatch();

  const handleFavoritesChange = () => {
    if (card) {
      dispatch(changeFavorites(card));
    }
  };

  const handleAddToCart = () => {
    if (card) {
      dispatch(addCart(card));
    }
  };

  return (
    <div className={styles.orderProps}>
      <div className={styles.orderProps__topTexts}>
        <span className={styles.orderProps__text}>Avaible colors</span>
        <span className={styles.orderProps__text}>{`ID: 802390`}</span>
      </div>
      <div className={styles.orderProps__container}>
        <div className={styles.orderProps__colors}>
          {card ? (
            card.colorsAvailable.map(cl => (
              <button
                className={classNames(
                  styles.orderProps__color,
                  styles[`orderProps__color--${cl}`],
                  { [styles['orderProps__color--active']]: card.color === cl },
                )}
                key={cl}
                onClick={() => handleColorChange(cl)}
              />
            ))
          ) : (
            <Skeleton className={styles.orderProps__skeletonSelets} />
          )}
        </div>
        <hr />
        <div className={styles.orderProps__capacitySection}>
          <span className={styles.orderProps__text}>Select capacity</span>
          <div className={styles.orderProps__capacities}>
            {card ? (
              card.capacityAvailable.map(cp => (
                <button
                  key={cp}
                  className={classNames(styles.orderProps__capacity, {
                    [styles['orderProps__capacity--active']]:
                      cp === card.capacity,
                  })}
                  onClick={() => handleCapacityChange(cp)}
                >
                  {cp}
                </button>
              ))
            ) : (
              <Skeleton className={styles.orderProps__skeletonSelets} />
            )}
          </div>
        </div>
        <hr />
        {card ? (
          <div className={styles.orderProps__prices}>
            <h3 className={styles.orderProps__price}>
              {`$${card.priceDiscount}`}
            </h3>
            <h3 className={styles.orderProps__fullPrice}>
              {`$${card.priceRegular}`}
            </h3>
          </div>
        ) : (
          <Skeleton className={styles.orderProps__skeletonPrice} />
        )}
        <div className={styles.orderProps__buttons}>
          <button
            className={classNames(styles.orderProps__cartButton, {
              [styles['orderProps__cartButton--clicked']]: cartIds.includes(
                card ? card.id : '',
              ),
            })}
            onClick={() => handleAddToCart()}
          >
            {cartIds.includes(card ? card.id : '')
              ? 'Added to cart'
              : 'Add to cart'}
          </button>
          <button
            className={classNames(styles.orderProps__favButton, {
              [styles['orderProps__favButton--clicked']]: favoritesIds.includes(
                card ? card.id : '',
              ),
            })}
            onClick={() => handleFavoritesChange()}
          />
        </div>
        <div className={styles.orderProps__infoBlocks}>
          <div className={styles.orderProps__infoBlock}>
            <p className={styles.orderProps__infoTitle}>Screen</p>
            <p className={styles.orderProps__infoText}>
              {card ? (
                card.screen
              ) : (
                <Skeleton className={styles.orderProps__skeletonInfoText} />
              )}
            </p>
          </div>
          <div className={styles.orderProps__infoBlock}>
            <p className={styles.orderProps__infoTitle}>Resolution</p>
            <p className={styles.orderProps__infoText}>
              {card ? (
                card.resolution
              ) : (
                <Skeleton className={styles.orderProps__skeletonInfoText} />
              )}
            </p>
          </div>
          <div className={styles.orderProps__infoBlock}>
            <p className={styles.orderProps__infoTitle}>Processor</p>
            <p className={styles.orderProps__infoText}>
              {card ? (
                card.processor
              ) : (
                <Skeleton className={styles.orderProps__skeletonInfoText} />
              )}
            </p>
          </div>
          <div className={styles.orderProps__infoBlock}>
            <p className={styles.orderProps__infoTitle}>RAM</p>
            <p className={styles.orderProps__infoText}>
              {card ? (
                card.ram
              ) : (
                <Skeleton className={styles.orderProps__skeletonInfoText} />
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
