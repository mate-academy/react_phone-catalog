import { useTranslation } from 'react-i18next';

import { Typography } from '@/components/atoms';
import { BackButton } from '@/components/molecules';
import {
  Breadcrumbs,
  CommentsSection,
  ProductDescription,
  ProductPurchase,
  ProductRating,
  ProductSection,
  ProductSlider,
  ProductSpecs,
} from '@/components/organisms';
import { YouMayAlsoLike } from '@/components/organisms/YouMayAlsoLike';

import { getProductSpecs } from '@/entities/product/lib/getProductSpecs';

import type { AnyProductDetails, Product } from '@/shared/types';
import type { WithImageUrls, With360ImageUrls } from '@/shared/types';

import ukDescriptions from '@/shared/i18n/product-descriptions-uk.json';

import styles from './ProductTemplate.module.scss';

type Props = {
  product: WithImageUrls<Product>;
  productDetails: With360ImageUrls<AnyProductDetails>;
};

export const ProductTemplate = ({ product, productDetails }: Props) => {
  const { t, i18n } = useTranslation();

  const specs = getProductSpecs(productDetails, t);

  const ukrainianDescription = ukDescriptions.find(
    (item) =>
      item.category === product.category && item.id === productDetails.id,
  );

  const description =
    i18n.language.startsWith('uk') && ukrainianDescription ?
      ukrainianDescription.description.map((item) => ({
        title: item.title,
        text: item.text.join(' '),
      }))
    : productDetails.description;

  return (
    <div className={styles.container}>
      <Breadcrumbs
        items={[
          {
            label: t(product.category),
            to: `/${product.category}`,
          },
          {
            label: product.name,
          },
        ]}
        className={styles.breadcrumbs}
      />

      <BackButton
        className={styles.backButton}
        fallback={`/${product.category}`}
      >
        {t('back')}
      </BackButton>

      <div className={styles.titleRow}>
        <Typography
          variant="h2"
          className={styles.title}
        >
          {product.name}
        </Typography>
        <ProductRating namespaceId={productDetails.namespace_id} />
      </div>

      <div className={styles.info}>
        <ProductSlider
          key={productDetails.id}
          productId={product.id}
          images={productDetails.imageUrls}
          images360={productDetails.image360Urls ?? []}
          name={productDetails.name}
          className={styles.slider}
        />

        <span className={styles.separator} />

        <ProductPurchase
          product={product}
          productDetails={productDetails}
          className={styles.purchase}
        />
      </div>

      <ProductSection
        title={t('about')}
        className={styles.firstSection}
      >
        <ProductDescription description={description} />
      </ProductSection>

      <span className={styles.separator} />

      <ProductSection
        title={t('techSpecs')}
        className={styles.secondSection}
      >
        <ProductSpecs specs={specs} />
      </ProductSection>

      <CommentsSection
        key={productDetails.namespace_id}
        namespaceId={productDetails.namespace_id}
        category={product.category}
        productId={productDetails.id}

        className={styles.comments}
      />

      <YouMayAlsoLike
        category={product.category}
        currentProductId={product.id}
      />
    </div>
  );
};
