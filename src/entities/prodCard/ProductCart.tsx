import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/productCard.module.scss';
import { useNavigationTracker } from '@features/index';
import { DetailedList } from '@ui/index';
import { ProductProps, organizeProps } from './model';
import { LoaderSpinner } from '@ui/skeletons';
import { CardButtons } from './ui/cardButtons';
import { LoadStatus } from '@shared/api';

type Props = {
  data: ProductProps | LoadStatus;
  lazy: boolean;
};

export const ProductCard = forwardRef<HTMLLIElement, Props>(
  ({ data, lazy = false }, ref) => {
    const { trackLinkHandler } = useNavigationTracker();

    const conf = organizeProps(data, trackLinkHandler);

    return (
      <li ref={ref} className={styles.container}>
        <Link {...conf.link} className={styles['product-card']}>
          <div className={styles['image-wrapper']}>
            {typeof data === 'string' ? (
              <LoaderSpinner />
            ) : (
              <img
                className={styles.image}
                {...conf.image}
                loading={lazy ? 'lazy' : undefined}
              />
            )}
          </div>
          <h3 className={styles.name}>{conf.name}</h3>
          <span className={styles.price}>
            {conf.priceMain}
            <span className={styles['full-price']} data-hide-price>
              {conf.priceSecondary}
            </span>
          </span>

          <DetailedList listData={conf.listData} />

          <CardButtons {...conf.buttonProps} />
        </Link>
      </li>
    );
  },
);

ProductCard.displayName = 'ProductCard';
