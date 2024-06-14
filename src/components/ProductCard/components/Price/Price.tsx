import classNames from 'classnames';
import { useContext } from 'react';
import { ProductContext } from '../../../../store/ProductContext';
import styles from './Price.module.scss';

type Props = {
  productId: string;
  displayFullPrice?: boolean;
  parentBlock?: string;
};

export const Price: React.FC<Props> = ({
  productId,
  displayFullPrice = false,
  parentBlock = '',
}) => {
  const { products } = useContext(ProductContext);
  const product = products.find(item => item.itemId === productId);

  return (
    product && (
      <div className={`${styles.price}`}>
        <p
          className={classNames('text--bold', {
            'text--section-title': parentBlock === 'productPage',
          })}
        >{`$${product.price}`}</p>
        {displayFullPrice && (
          <p
            className={classNames(`${styles.price__line} text--grey`, {
              'text--section-title': parentBlock === 'productPage',
            })}
          >{`$${product.fullPrice}`}</p>
        )}
      </div>
    )
  );
};
