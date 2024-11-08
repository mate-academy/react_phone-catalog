import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import cn from 'classnames';

import { getProductUrl } from '@utils/helpers/productUtils';
import { TProduct } from '@utils/types/product.type';

import styles from './SearchItem.module.scss';

type TProps = {
  product: TProduct;
  currentItemId: string;
  onClick: () => void;
};

export const SearchItem: FC<TProps> = memo(
  ({ product, currentItemId, onClick }) => {
    const { t } = useTranslation();
    const { category, itemId, name, image } = product;
    const URL = getProductUrl(category, itemId);
    const localDetails = t('product.list.aria', { name: name });

    return (
      <Link
        to={URL}
        state={{ itemId: itemId }}
        className={cn(styles.link, {
          [styles.active]: currentItemId === itemId,
        })}
        onClick={onClick}
        title={localDetails}
        aria-label={localDetails}
      >
        <div className={styles.wrapper}>
          <div
            className={styles.image}
            style={{ backgroundImage: `url(${image})` }}
            role="img"
            aria-label={name}
          />
          <div className={styles.title}>
            <p>{name}</p>
          </div>
        </div>
      </Link>
    );
  },
);
