import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProductsPage } from '../../model/services/fetchProduct';
import { CategoriesEnum } from '../../../../entities/Categories';
import { ProductDetails } from '../../model/types/productDetails';
import { MainProductSection } from '../sections/MainProductSection';
import { AboutProductSection } from '../sections/AboutProductSection';
import { SuggestedProductsSection } from '../sections/SuggestedProductsSection';
import { NotFound } from '../../../../shared/ui/NotFound';
import { TitleTag } from '../../../../shared/ui/TitleTag';
import cls from './productPage.module.scss';

function ProductPage() {
  const { category, itemId } = useParams<{
    category: string;
    itemId: string;
  }>();
  const [isLoadind, setIsLoadind] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductDetails | null>(null);

  useEffect(() => {
    setIsLoadind(true);
    fetchProductsPage(category as CategoriesEnum, itemId as string)
      .then(productDetails => setProduct(productDetails))
      .finally(() => setIsLoadind(false));
  }, [category, itemId]);

  return (
    <>
      {product ? (
        <>
          <MainProductSection isLoadind={isLoadind} product={product} />
          {product && !isLoadind && (
            <AboutProductSection product={product} isLoadind={isLoadind} />
          )}
          {!isLoadind && <SuggestedProductsSection />}
        </>
      ) : (
        <>
          <TitleTag
            Tag="h2"
            title="Product was not found"
            className={cls.notFoundTitle}
          />
          <NotFound src="img/cart-is-empty.png" alt="Cart is empty" />
        </>
      )}
    </>
  );
}

export default ProductPage;
