import React, { useContext } from 'react';
import styles from './ThirdPart.module.scss';
import { HeartLikeSVG } from '../../../../../../../../../../svgs/HeartLikeSVG';
import classNames from 'classnames';
import { Product } from '../../types/Product';
// eslint-disable-next-line max-len
import { FavouritesContext } from '../../../../../../../../../../context/FavouritesContext';

interface Props {
  itemId: string;
  props: Product;
}

export const ThirdPart: React.FC<Props> = React.memo(({ itemId, props }) => {
  const { getIsIncluded, onClickHandler } = useContext(FavouritesContext);

  return (
    <div className={styles['third-part']}>
      <button className={styles.add}>Add to cart</button>

      <button
        className={classNames(styles.like, {
          [styles['is-liked']]: getIsIncluded(itemId),
        })}
        style={{ minWidth: '40px' }}
        onClick={() => onClickHandler(itemId, props)}
      >
        <HeartLikeSVG />
      </button>
    </div>
  );
});

ThirdPart.displayName = 'ThirdPart';
