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
  activeProduct,
}) => {
  const productContext = useSafeProduct();
  const isProductPage = productContext?.isProductPage ?? false;

  return (
    <div className={styles.containerPrice}>
      <div
        style={{
          fontSize: isProductPage ? '34px' : '22px',
        }}
        className={styles.price}
      >
        ${activeProduct ? activeProduct.priceDiscount : element.price}
      </div>

      {sale && (
        <div
          style={{
            color: isProductPage ? '#75767F' : '#313237',
          }}
          className={styles.fullPrice}
        >
          ${activeProduct ? activeProduct.priceRegular : element.fullPrice}
        </div>
      )}
    </div>
  );
};
