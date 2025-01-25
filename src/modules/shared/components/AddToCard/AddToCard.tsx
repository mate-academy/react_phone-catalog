import styles from './AddToCard.module.scss';

import { IconType } from '@sTypes/IconType';

import { Icon } from '@components/Icon';

export const AddToCard = () => {
  return (
    <div className={styles['add-to-card']}>
      <div className={styles['add-to-card__button']}>Add to card</div>

      <div className={styles['add-to-card__icon']}>
        <Icon type={IconType.favorite} withBorder />
      </div>
    </div>
  );
};
