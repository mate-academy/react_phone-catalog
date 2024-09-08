import { memo } from 'react';
import { Section } from '../../../../../shared/ui/Section';
import { ProductDetails } from '../../../model/types/productDetails';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { ProductPageForm } from '../../components/ProductPageForm/ProductPageForm';
import cls from './mainProductSection.module.scss';
import { PagePartTop } from '../../../../../features/PagePartTop';
import { Sceleton } from '../../../../../shared/ui/Sceleton/Sceleton';

interface Props {
  product: ProductDetails | null;
  isLoadind: boolean;
}

export const MainProductSection = memo(({ product, isLoadind }: Props) => {
  return (
    <Section firstSection>
      {product && !isLoadind && (
        <PagePartTop
          isLoading={isLoadind}
          title={product?.name}
          tag="h2"
          productName={product.name}
        />
      )}
      <div className={cls.main__body}>
        {isLoadind && (
          <>
            <Sceleton className={cls.slider} width={'100%'} height={560} />
            <Sceleton className={cls.form} width={'100%'} height={560} />
          </>
        )}
        {product && !isLoadind && (
          <>
            <ProductSlider product={product} className={cls.slider} />
            <ProductPageForm product={product} className={cls.form} />
          </>
        )}
      </div>
    </Section>
  );
});
