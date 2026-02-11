import classNames from 'classnames';
import { useContext } from 'react';
import { ProductContext } from '../../store/ProductContext';
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
  const { products, darkTheme } = useContext(ProductContext);
  const product = products.find(item => item.itemId === productId);

  return (
    product && (
      <div className={`${styles.price}`}>
        <p
          className={classNames('text--bold', {
            [styles.price__bigFont]: parentBlock === 'productPage',
          })}
        >{`$${product.price}`}</p>
        {displayFullPrice && (
          <p
            className={classNames(`${styles.price__line}`, {
              [styles.price__line__darkTheme]: darkTheme,
            })}
          >{`$${product.fullPrice}`}</p>
        )}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          style={{ display: ' none' }}
        ></svg>
      </div>
    )
  );
};
