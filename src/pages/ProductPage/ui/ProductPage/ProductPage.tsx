import { useParams } from 'react-router-dom';
import { Section } from '../../../../shared/ui/Section';
import { TitleTag } from '../../../../shared/ui/TitleTag/TitleTag';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../../model/services/fetchProduct';
import { CategoriesEnum } from '../../../../entities/Categories';
import { ProductDetails } from '../../model/types/productDetails';
import cls from './productPage.module.scss';
import { ProductSlider } from '../ProductSlider/ProductSlider';

function ProductPage() {
  const { category, itemId } = useParams();
  const [isLoadind, setIsLoadind] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductDetails | null>(null);

  useEffect(() => {
    setIsLoadind(true);
    fetchProducts(category as CategoriesEnum, itemId as string)
      .then(productDetails => setProduct(productDetails))
      .finally(() => setIsLoadind(false));
  }, [category, itemId]);

  return (
    <>
      <Section firstSection>
        {product && !isLoadind && <TitleTag Tag="h2" title={product?.name} />}
        <div className={cls.main__body}>
          {product && (
            <ProductSlider product={product} className={cls.slider} />
          )}
        </div>
      </Section>
    </>
  );
}

export default ProductPage;
