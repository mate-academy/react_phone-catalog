import { FC } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { ProductsSlider } from '../products-slider/ProductsSlider';
import { ProductPrice } from '../product-prices/ProductPrice';
import { ProductSpec } from '../product-specs/ProductSpec';
import { SliderCardImages } from './slider-card-images/SliderCardImages';
import { CardDescription } from './card-description/CardDescription';
import { CardColors } from './card-colors/CardColors';
import { CardCapacity } from './card-capacity/CardCapacity';
import { Breadcrumbs } from '@ui/links/Breadcrumbs';
import { BackArrow } from '@ui/button/arrow/BackArrow';
import { ActionButtons } from '@ui/button/action-buttons/ActionButtons';

import { useProducts } from '@hooks/useProducts';
import { ROUTES } from '@utils/constants/routes';
import { getProductUrl } from '@utils/helpers/getProductUrl';
import { generateRandomID } from '@utils/helpers/generateRandomID';

import styles from './ProductDetail.module.scss';

const randomID = generateRandomID();

export const ProductDetail: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { itemId } = (location.state as { itemId: string }) || {};
  const { products, productWithDiscount, productsWithDetails } = useProducts();

  if (!itemId) {
    return <Navigate to={ROUTES.NOTFOUND} replace />;
  }

  const selectedProduct = productsWithDetails.find(item => item.id === itemId);

  const getNewItemId = (
    category: string,
    capacity: string,
    color: string,
    nameSpaceId: string,
  ) => {
    const groupByNameSpaceId = productsWithDetails.filter(
      product => product.namespaceId === nameSpaceId,
    );

    const foundProduct = groupByNameSpaceId.find(
      product =>
        product.category === category &&
        product.capacity === capacity &&
        product.color === color,
    );

    return foundProduct?.id;
  };

  const handleChange = (newCapacity?: string, newColor?: string) => {
    if (!selectedProduct) return;

    const newItemId = getNewItemId(
      selectedProduct?.category,
      newCapacity || selectedProduct?.capacity,
      newColor || selectedProduct?.color,
      selectedProduct?.namespaceId,
    );

    if (newItemId) {
      const URL = getProductUrl(selectedProduct?.category, newItemId);
      navigate(URL, { state: { itemId: newItemId } });
    }
  };

  const onCapacityChange = (capacity: string) => {
    handleChange(capacity, undefined);
  };

  const onColorChange = (color: string) => {
    handleChange(undefined, color);
  };

  const product = products.find(item => item.itemId === itemId);

  return (
    <section className={styles.productCard}>
      <Breadcrumbs
        text={selectedProduct?.category}
        id={selectedProduct?.name}
        category={selectedProduct?.category}
      />
      <BackArrow />
      <div className={styles.card}>
        <h2>{selectedProduct?.name}</h2>

        <div className={styles.features}>
          <SliderCardImages images={selectedProduct?.images} />

          <div className={styles.wrapper}>
            <div className={styles.ids}>ID: {randomID}</div>
            <CardColors
              colors={selectedProduct?.colorsAvailable}
              currentColor={selectedProduct?.color}
              onColorChange={onColorChange}
            />

            <hr />
            <CardCapacity
              capacities={selectedProduct?.capacityAvailable}
              currentCapacity={selectedProduct?.capacity}
              onCapacityChange={onCapacityChange}
            />
            <hr />

            <div className={styles.price}>
              <ProductPrice
                price={selectedProduct?.priceDiscount}
                fullPrice={selectedProduct?.priceRegular}
                discount
              />
              <ActionButtons product={product} />
            </div>

            <ProductSpec
              screen={selectedProduct?.screen}
              resolution={selectedProduct?.resolution}
              processor={selectedProduct?.processor}
              ram={selectedProduct?.ram}
            />
          </div>
        </div>

        <div className={styles.overview}>
          <div className={styles.description}>
            <h3>About</h3>
            <hr />
            <CardDescription description={selectedProduct?.description} />
          </div>

          <div className={styles.techSpecs}>
            <h3>Tech specs</h3>
            <hr />
            <ProductSpec
              screen={selectedProduct?.screen}
              resolution={selectedProduct?.resolution}
              capacity={selectedProduct?.capacity}
              processor={selectedProduct?.processor}
              ram={selectedProduct?.ram}
              camera={selectedProduct?.camera}
              zoom={selectedProduct?.zoom}
              memory={selectedProduct?.capacity}
              cell={selectedProduct?.cell}
            />
          </div>
        </div>

        <ProductsSlider
          title="You may also like"
          products={productWithDiscount}
          discount
        />
      </div>
    </section>
  );
};
