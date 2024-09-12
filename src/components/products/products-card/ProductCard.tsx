import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ProductsSlider } from '../products-slider/ProductsSlider';
import { ProductPrice } from '../product-prices/ProductPrice';
import { SliderCardImages } from './slider-card-images/SliderCardImages';
import { CardColors } from './card-colors/CardColors';
import { CardCapacity } from './card-capacity/CardCapacity';
import { Breadcrumbs } from '@ui/links/Breadcrumbs';
import { BackArrow } from '@ui/button/arrow/BackArrow';
import { ActionButtons } from '@ui/button/action-buttons/ActionButtons';

import { useAppSelector } from '@hooks/hook';
import { getProductWithLargestDiscount } from '@utils/helpers/sortedByPrice';

import { selectAllProducts } from '@store/selectors';

import styles from './productCard.module.scss';
import { generateRandomID } from '@utils/helpers/generateRandomID';
import { ProductSpec } from '../product-specs/ProductSpec';
import { CardDescription } from './card-description/CardDescription';

export const ProductCard: FC = () => {
  const { products } = useAppSelector(state => state.products);
  const location = useLocation();
  const allProducts = useSelector(selectAllProducts);

  const { itemId } = location.state as { itemId: string };

  const product = products.find(item => item.itemId === itemId);
  const selectedCardProduct = allProducts.find(item => item.id === itemId);

  const list = getProductWithLargestDiscount(products);
  const randomID = generateRandomID();

  return (
    <section className={styles.productCard}>
      <Breadcrumbs
        text={selectedCardProduct?.category}
        id={selectedCardProduct?.name}
      />
      <BackArrow />
      <div className={styles.card}>
        <h2>{selectedCardProduct?.name}</h2>

        <div className={styles.features}>
          <SliderCardImages
            images={selectedCardProduct?.images}
            name={selectedCardProduct?.name}
          />

          <div className={styles.wrapper}>
            <CardColors colors={selectedCardProduct?.colorsAvailable} />

            <hr />
            <CardCapacity capacity={selectedCardProduct?.capacityAvailable} />
            <hr />

            <div className={styles.price}>
              <ProductPrice
                price={selectedCardProduct?.priceRegular}
                fullPrice={selectedCardProduct?.priceDiscount}
                discount={true}
              />
              <ActionButtons product={product} />
            </div>

            <ProductSpec
              screen={selectedCardProduct?.screen}
              resolution={selectedCardProduct?.resolution}
              processor={selectedCardProduct?.processor}
              ram={selectedCardProduct?.ram}
            />
          </div>

          <div className={styles.ids}>ID: {randomID}</div>
        </div>

        <div className={styles.overview}>
          <div className={styles.description}>
            <h3>About</h3>
            <hr />
            <CardDescription description={selectedCardProduct?.description} />
          </div>

          <div className={styles.techSpecs}>
            <h3>Tech specs</h3>
            <hr />
            <ProductSpec
              screen={selectedCardProduct?.screen}
              resolution={selectedCardProduct?.resolution}
              capacity={selectedCardProduct?.capacity}
              processor={selectedCardProduct?.processor}
              ram={selectedCardProduct?.ram}
              camera={selectedCardProduct?.camera}
              zoom={selectedCardProduct?.zoom}
              memory={selectedCardProduct?.capacity}
              cell={selectedCardProduct?.cell}
            />
          </div>
        </div>

        <ProductsSlider
          title="You may also like"
          products={list}
          discount={true}
        />
      </div>
    </section>
  );
};
