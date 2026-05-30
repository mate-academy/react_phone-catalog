import React from 'react';
import styles from './ProductAbout.module.scss';
import { AnyDetailedProduct } from '../../../../types/DetailedProductTypes';
import useLanguageStore from '../../../../stores/useLanguageStore';

type Props = {
  product: AnyDetailedProduct;
  translatedDescription: { title: string; text: string[] }[];
};

export const ProductAbout: React.FC<Props> = ({
  product,
  translatedDescription,
}) => {
  const { t } = useLanguageStore();

  return (
    <div className={styles['product-about']}>
      <h3 className={styles['product-about__title']}>
        {t('prod_det_page_about')}
      </h3>

      <div className={styles['product-about__divider']}></div>

      <div className={styles['product-about__description']}>
        {product.description &&
          translatedDescription.map(
            (block: { title: string; text: string[] }, index: number) => (
              <div
                className={styles['product-about__description-block']}
                key={index}
              >
                <h4
                  className={styles['product-about__description-block-title']}
                >
                  {block.title}
                </h4>
                {block.text.map((paragraph, pIdx) => (
                  <div key={pIdx}>
                    <p
                      className={
                        styles['product-about__description-block-paragraph']
                      }
                    >
                      {paragraph}
                    </p>
                  </div>
                ))}
              </div>
            ),
          )}
      </div>
    </div>
  );
};
