import ProductAction from '../ProductAction/ProductAction';
import ProductPrice from '../ProductPrice/ProductPrice';
import ProductSpec from '../ProductSpec/ProductSpec';
import styles from './ProductControls.module.scss';
import { TypesOfProducts } from '../../types/TypesOfProducts';
import ProductColors from '../ProductColors/ProductColors';
import ProductCapacity from '../ProductCapacity/ProductCapacity';
import { Products } from '../../types/Products';
import { useEffect, useState } from 'react';
import { getProducts } from '../../api/api';

type Props = {
  currentProduct: TypesOfProducts;
  currentColor: string;
  currentCapacity: string;
  setCurrentColor: () => void;
};

export const ProductControls: React.FC<Props> = ({
  currentProduct,
  currentColor,
  currentCapacity,
  setCurrentColor,
}) => {
  const [product, setProduct] = useState<Products>();

  useEffect(() => {
    getProducts().then(data => {
      const productId = data.find(prod => prod.itemId === currentProduct.id);

      setProduct(productId);
    });
  }, [currentProduct.id]);

  const specTech: string[][] = [
    ['Screen', currentProduct.screen],
    ['Resolution', currentProduct.resolution],
    ['Capacity', currentProduct.capacity],
    ['RAM', currentProduct.ram],
  ];

  return (
    <div className={styles.mainControls}>
      <div className={styles.colorsAndId}>
        <div className={styles.colors}>
          <ProductColors
            setCurrentColor={setCurrentColor}
            currentProduct={currentProduct}
            currentColor={currentColor}
          />
        </div>
        <div className={styles.productId}>ID: {product?.id}</div>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.sectionBorder}></div>

        <div className={styles.capacityContainer}>
          <ProductCapacity
            currentProduct={currentProduct}
            currentCapacity={currentCapacity}
          />
        </div>

        <div className={styles.sectionBorder}></div>

        <div className={styles.priceAndButton}>
          <div className={styles.priceContainer}>
            <ProductPrice
              showDiscount={true}
              oldPrice={currentProduct.priceRegular}
              newPrice={currentProduct.priceDiscount}
              big={true}
            />
          </div>

          <div className={styles.buttonsDown}>
            <ProductAction variant={'bigButtonSize'} />
          </div>
        </div>

        <ProductSpec spec={specTech} className={styles.specTech} />
      </div>
    </div>
  );
};

export default ProductControls;
