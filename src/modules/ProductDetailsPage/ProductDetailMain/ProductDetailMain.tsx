import styles from './ProductDetailMain.module.scss';

import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { ProductDetail } from '../../../types/ProductDetail';
import { useContext, useState } from 'react';

import {
  getProductDetailId,
  ProductCatalogContext,
} from '../../../ProductCatalogContext';
import PropertiesMenu from '../PropertiesMenu';
import ProductSpecs from '../../shared/ProductSpecs';
import { BASE_URL, DETAIL_SPECS_LIST } from '../../constants';
import PriceTag from '../../shared/PriceTag';
import ProductActions from '../../shared/ProductActions';

interface Props {
  product: ProductDetail;
}

const ProductDetailMain: React.FC<Props> = ({ product }) => {
  const { t } = useTranslation();

  const [activeSlide, setActiveSlide] = useState(0);
  const { products, productDetailIdToProductId } = useContext(
    ProductCatalogContext,
  );
  const handleSliderClick = (newIndex: number) => setActiveSlide(newIndex);
  const productId =
    productDetailIdToProductId[getProductDetailId(product)] || 0;

  return (
    <>
      <section className={styles.productDetailMain}>
        <img
          className={styles.mainPhoto}
          src={BASE_URL + '/' + product.images[activeSlide]}
          alt={product.name}
        />

        <div className={styles.photos__previews}>
          <div className={styles.photos__previewsContainer}>
            {product.images.map((image, index) => (
              <img
                className={cn(styles.photos__previewsImage, {
                  [styles.photos__previewsImage_active]: index === activeSlide,
                })}
                key={index}
                src={BASE_URL + '/' + image}
                onClick={() => handleSliderClick(index)}
              ></img>
            ))}
          </div>
        </div>

        <div className={styles.controls}>
          <div className={styles.controls__colorsAndId}>
            <PropertiesMenu
              product={product}
              propTitle={t(`product-detail.color_title`)}
              propType="color"
              propAvailable="colorsAvailable"
            />
            <div className={styles.controls__idNumber}>ID: {productId}</div>
          </div>

          <PropertiesMenu
            product={product}
            propTitle={t(`product-detail.capacity_title`)}
            propType="capacity"
            propAvailable="capacityAvailable"
            additionalStyles={styles.controls__capacityProps}
          />

          <PriceTag
            price={product.priceDiscount}
            fullPrice={product.priceRegular}
            additionalStyles={styles.controls__priceTag}
          />

          <ProductActions
            product={products[productId]}
            additionalStyles={styles.controls__productActions}
          />

          <ProductSpecs
            product={product}
            specsList={DETAIL_SPECS_LIST}
            styleMainDetail
            additionalStyles={styles.controls__productSpecs}
          />
        </div>
      </section>
    </>
  );
};

export default ProductDetailMain;
