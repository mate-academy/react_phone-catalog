import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { Slider } from '../../components/ProductSlider';
import { ProductConfig } from './components/ProductConfig';
import { ProductDescription } from './components/ProductDescription';
import { ProductHeader } from './components/ProductHeader';
import { useProducts } from '../../shared/context/ProductsContext';

import { Product } from '../../shared/types/Product';
import { ProductsInfo } from '../../shared/types/ProductsInfo';
import styles from './ProductInfo.module.scss';

type ProductInfoProps = {
  product: ProductsInfo;
  catalog: Product[];
};

export const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  catalog,
}) => {
  const { phones, tablets, accessories } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<ProductsInfo | null>(
    null,
  );
  const [selectCapacity, setSelectCapacity] = useState<string>('');
  const sliderTitle = 'You may also like';

  const findProductById = (
    products: ProductsInfo[],
    id: string,
  ): ProductsInfo | undefined => {
    return products.find(item => item.id === id);
  };

  useEffect(() => {
    setSelectedProduct(null);
    setSelectCapacity(product.capacity ? product.capacity[0] : '');

    const timeout = setTimeout(() => {
      if (product.category === 'phones') {
        setSelectedProduct(findProductById(phones, product.id) || null);
      } else if (product.category === 'tablets') {
        setSelectedProduct(findProductById(tablets, product.id) || null);
      } else if (product.category === 'accessories') {
        setSelectedProduct(findProductById(accessories, product.id) || null);
      }
    }, 200);

    return () => clearTimeout(timeout);
  }, [product, phones, tablets, accessories]);

  return (
    <div className={styles.productInformation}>
      {selectedProduct ? (
        <>
          <ProductHeader product={selectedProduct} />
          <ProductConfig
            product={selectedProduct}
            selectCapacity={selectCapacity}
            setSelectCapacity={setSelectCapacity}
          />
          <ProductDescription product={selectedProduct} />
        </>
      ) : (
        <Loader />
      )}
      <Slider title={sliderTitle} products={catalog} />
    </div>
  );
};
