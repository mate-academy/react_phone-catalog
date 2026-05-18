import React, { memo } from 'react';
import styles from './../../../ProductPage.module.scss';
import classNames from 'classnames';
import { Divider } from '../../../../shared/atoms/Divider';
import { Typography } from '../../../../shared/atoms/Typography';
import { ProductDetails } from '../../../../../types/ProductDetails';
import { useTranslation } from 'react-i18next';
import { descriptionsUa } from '../../../../../i18n/descriptions.ua';

type Props = {
  productDetails: ProductDetails;
};

const ProductDescriptionComponent: React.FC<Props> = ({ productDetails }) => {
  const { t, i18n } = useTranslation();

  const localizedDescription =
    i18n.language === 'ua' && descriptionsUa[productDetails?.namespaceId]
      ? descriptionsUa[productDetails.namespaceId]
      : productDetails?.description;

  return (
    <div
      className={classNames(
        styles.product__block,
        styles.product__description,
        styles.about,
      )}
    >
      <Typography variant="h3" tag="h3" className={styles.about__title}>
        {t('product.about.title')}
      </Typography>

      <div className={styles.about__body}>
        <Divider />

        {localizedDescription?.map(article => (
          <article key={article.title} className={styles.article}>
            <Typography variant="h4" tag="h4" className={styles.article__title}>
              {article.title}
            </Typography>

            {article.text.map(paragraph => (
              <Typography
                key={paragraph}
                variant="body"
                tag="p"
                color="secondary"
                className={styles.article__description}
              >
                {paragraph}
              </Typography>
            ))}
          </article>
        ))}
      </div>
    </div>
  );
};

export const ProductDescription = memo(ProductDescriptionComponent);
