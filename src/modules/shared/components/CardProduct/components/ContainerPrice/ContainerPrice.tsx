import {
  Product,
  ProductsDetails,
} from '../../../../../../ProductsContext/TabsContext';
import { useSafeProduct } from '../../../../hooks/SafeProduct';
import styles from './ContainerPrice.module.scss';

interface ContainerPriceProps {
  element: Product;
  sale: boolean;
  activeProduct?: ProductsDetails;
}

export const ContainerPrice: React.FC<ContainerPriceProps> = ({
  element,
  sale,
}) => {
  const productContext = useSafeProduct();
  const isProductPage = productContext?.isProductPage !== undefined;

  return (
    <div className={styles.containerPrice}>
      <div
        style={{
          fontSize: isProductPage ? '34px' : '22px',
        }}
        className={styles.price}
      >
        ${element.price}
      </div>

      {sale && (
        <div
          style={{
            color: isProductPage ? '#75767F' : '#313237',
          }}
          className={styles.fullPrice}
        >
          ${element.fullPrice}
        </div>
      )}
    </div>
  );
};
