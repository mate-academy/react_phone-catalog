import { FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { ProductNotFound } from '@pages/ErrorsPage/ProductNotFound';

import * as UI from '@ui/index';

import { useProducts } from '@hooks/index';

import { updateProduct } from '@utils/helpers/productUtils';

import * as Product from '../index';
import styles from './ProductDetail.module.scss';
import * as Card from './index';

export const ProductDetail: FC = () => {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const {
    loading,
    randomProducts,
    productsWithDetails,
    validateProduct,
    selectProductWithDetails,
  } = useProducts();
  const { t } = useTranslation();
  const localTitle = t('product.title');

  const selectedProduct = useMemo(
    () => selectProductWithDetails(itemId),
    [itemId, productsWithDetails],
  );
  const isValidProduct = validateProduct(itemId);

  const handleUpdateProduct = useCallback(
    (newCapacity?: string, newColor?: string) => {
      if (selectedProduct) {
        updateProduct({
          selectedProduct,
          newCapacity,
          newColor,
          productsWithDetails,
          navigate,
        });
      }
    },
    [selectedProduct, productsWithDetails, navigate],
  );

  const onCapacityChange = useCallback(
    (capacity: string) => {
      handleUpdateProduct(capacity, undefined);
    },
    [handleUpdateProduct],
  );

  const onColorChange = useCallback(
    (color: string) => {
      handleUpdateProduct(undefined, color);
    },
    [handleUpdateProduct],
  );

  if (loading) {
    return <UI.Loader />;
  }

  if (!itemId && !isValidProduct) {
    return <Navigate to=".." />;
  }

  if (!loading && !isValidProduct && !selectedProduct) {
    return <ProductNotFound />;
  }

  if (!selectedProduct) return null;

  return (
    <section className={styles.productCard}>
      <UI.Breadcrumbs
        id={selectedProduct.name}
        text={selectedProduct.category}
        category={selectedProduct.category}
      />
      <UI.BackArrow />
      <div className={styles.card}>
        <UI.Title level={2}>{selectedProduct.name}</UI.Title>

        <div className={styles.features}>
          <Card.CardSliderImages images={selectedProduct.images} />

          <Product.ProductOptionsWrapper
            itemId={itemId}
            selectedProduct={selectedProduct}
            onCapacityChange={onCapacityChange}
            onColorChange={onColorChange}
          />
        </div>

        <Product.ProductOverview selectedProduct={selectedProduct} />

        <Product.ProductsSlider
          title={localTitle}
          products={randomProducts}
          discount
        />
      </div>
    </section>
  );
};
