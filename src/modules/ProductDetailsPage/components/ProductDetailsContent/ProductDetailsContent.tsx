//#region imports
import { Breadcrumbs } from '../../../shared/components/Breadcrumbs';
import { BackButton } from '../../../shared/components/BackButton';
import { ProductDetails } from '../../../shared/types/ProductDetails';
import { About } from '../About';
import { TechSpecsBlock } from '../TechSpecsBlock';
import { ProductSlider } from '../../../shared/components/ProductSlider';
import { ProductGallery } from '../ProductGallery';
import { MainParams } from '../MainParams';
import { Product } from '../../../shared/types/Product';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { useSuggestedProducts } from '../../hooks/useSuggestedProducts';
import { extractTechSpecs } from '../../services/extractTechSpecs';
import baseStyles from './base.module.scss';
// #endregion

type Props = {
  productDetails: ProductDetails;
  product: Product;
};

export const ProductDetailsContent: React.FC<Props> = ({
  productDetails,
  product,
}) => {
  const { t } = useTranslation('productDetails');
  const { t: tCategories } = useTranslation('categories');

  const techSpecs = useMemo(
    () => extractTechSpecs(productDetails),
    [productDetails],
  );

  const category = useMemo(
    () => tCategories(`categories.${productDetails.category}`),
    [productDetails.category, tCategories],
  );

  const suggestedProducts = useSuggestedProducts();

  return (
    <div>
      <div className={baseStyles.topBar}>
        <Breadcrumbs
          items={[
            {
              label: category,
              to: `/${productDetails.category}`,
            },
            {
              label: productDetails.name,
            },
          ]}
        />

        <BackButton />
      </div>

      <h2 className={baseStyles.title}>{productDetails.name}</h2>

      <div className={baseStyles.productDetails}>
        <div className={baseStyles.productMain}>
          <div className={baseStyles.gallery}>
            <ProductGallery allImages={productDetails.images} />
          </div>

          <div className={baseStyles.mainParams}>
            <MainParams productDetails={productDetails} product={product} />
          </div>
        </div>

        <div className={baseStyles.descriptionBlock}>
          <div className={baseStyles.about}>
            <About id={productDetails.id} />
          </div>

          <div className={baseStyles.techSpecs}>
            <TechSpecsBlock techSpecs={techSpecs} />
          </div>
        </div>

        {suggestedProducts.length > 0 && (
          <ProductSlider
            title={t('youMayAlsoLike')}
            products={suggestedProducts}
          />
        )}
      </div>
    </div>
  );
};
