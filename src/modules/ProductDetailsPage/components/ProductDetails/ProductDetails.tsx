/* eslint-disable @typescript-eslint/no-explicit-any */

import styles from './ProductDetails.module.scss';
import { ProductPrice } from '@/shared/components/ProductPrice';
import { AddToCartButton } from '@/shared/components/AddToCartButton';
import { FavoriteButton } from '@/shared/components/FavoriteButton';
import { ProductSpecs } from '@/shared/components/ProductSpecs';
import { Divider } from '@/shared/components/Divider';
import { ProductSpec } from '@/types/ProductSpec';
import { ProductDetails as ProductDetailsType } from '@/types/ProductDetails';
import { ProductsSlider } from '@/shared/components/ProductsSlider';
import { useMemo } from 'react';
import { ProductGallery } from './components/ProductGallery';
import { ProductColors } from './components/ProductColors';
import { ProductCapacity } from './components/ProductCapacity';
import { ProductAbout } from './components/ProductAbout';
import { shuffle } from '@/shared/utils/shuffle';
import { Product } from '@/types/Product';

interface Props {
  product: ProductDetailsType;
  catalogProducts: Product[];
  catalogProduct: Product;
}

const SPECS_CONFIG = [
  { name: 'Screen', key: 'screen' },
  { name: 'Resolution', key: 'resolution' },
  { name: 'Processor', key: 'processor' },
  { name: 'RAM', key: 'ram' },
  { name: 'Built in memory', key: 'capacity' },
  { name: 'Camera', key: 'camera' },
  { name: 'Zoom', key: 'zoom' },
  { name: 'Cell', key: 'cell' },
];

export const ProductDetails = ({
  product,
  catalogProducts,
  catalogProduct,
}: Props) => {
  const specs = SPECS_CONFIG.reduce((acc, spec) => {
    if (!(spec.key in product)) {
      return acc;
    }

    const value = (product as Record<string, any>)[spec.key];

    acc.push({
      name: spec.name,
      value: Array.isArray(value) ? value.join(', ') : value,
    });

    return acc;
  }, [] as ProductSpec[]);

  const shortSpecs = specs.slice(0, 4);

  const shuffledProducts = useMemo(
    () =>
      shuffle(
        [...catalogProducts].filter(item => item.itemId !== product.id),
      ).slice(0, 10),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [product.namespaceId, catalogProducts],
  );

  return (
    <div className={styles.productDetails}>
      <div className={styles.productFacts}>
        <ProductGallery
          images={product.images}
          productName={product.name}
          className={styles.productGallery}
        />

        <div className={styles.productInfo}>
          <div className={styles.colorsSection}>
            <div className={styles.colorsHeader}>
              <p className={styles.colorsTitle}>Available colors</p>
              <p className={styles.productId}>ID: {catalogProduct.id}</p>
            </div>

            <ProductColors product={product} />
          </div>

          <Divider />

          <div className={styles.capacitySection}>
            <p className={styles.capacityTitle}>Select capacity</p>

            <ProductCapacity product={product} />
          </div>

          <Divider />

          <div className={styles.purchaseSection}>
            <div className={styles.purchaseSectionContent}>
              <ProductPrice
                price={product.priceDiscount}
                fullPrice={product.priceRegular}
              />

              <div className={styles.purchaseButtons}>
                <AddToCartButton size="m" id={catalogProduct.id} />
                <FavoriteButton size="m" id={catalogProduct.id} />
              </div>
            </div>

            <div className={styles.shortSpecs}>
              <ProductSpecs specs={shortSpecs} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.productData}>
        <ProductAbout
          description={product.description}
          className={styles.productAbout}
        />

        <div className={styles.specs}>
          <div className={styles.specsHeader}>
            <h2 className={styles.specsTitle}>Tech specs</h2>
            <Divider />
          </div>

          <ProductSpecs specs={specs} textSize="m" />
        </div>
      </div>

      <div className={styles.suggestedProducts}>
        <ProductsSlider title="You may also like" products={shuffledProducts} />
      </div>
    </div>
  );
};
