import { useEffect, useMemo, useState } from 'react';
import './ProductDetailsPage.scss';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../api/functionsRequestsApi';
import { ProductCompleted } from '../../types/ProductCompleted';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { Product } from '../../types/Product';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { useGlobalContext } from '../../context/GlobalContext';
import { ProductDetails } from './components/ProductDetails';
import { ButtonBack } from '../shared/components/Buttons/ButtonBack';
import { useLanguage } from '../../context/LanguageContext';
import { ProductDetailsSkeleton } from './components/ProductDetailsSkeleton';

type Status = 'error' | 'success' | 'loading';

export const ProductDetailsPage = () => {
  const [activeProduct, setActiveProduct] = useState<ProductCompleted | null>(
    null,
  );
  const [status, setStatus] = useState<Status>('loading');
  const { productId } = useParams<{ productId: string }>();
  const { allProducts } = useGlobalContext();
  const { texts } = useLanguage();

  //#region functions

  useEffect(() => {
    window.scrollTo({
      behavior: 'instant',
      top: 0,
    });
  }, [activeProduct]);

  useEffect(() => {
    setTimeout(() => {
      getProductDetails(productId!)
        .then(product => {
          setActiveProduct(product);
          setStatus('success');
        })
        .catch(() => {
          setStatus('error');
        });
    }, 300);
  }, [productId]);

  const alsoLike = useMemo(() => {
    if (activeProduct) {
      const randomProducts: Product[] = allProducts.filter(
        product =>
          product.category === activeProduct.category &&
          product.price > activeProduct.priceRegular - 200 &&
          product.price < activeProduct.priceRegular + 200 &&
          product.itemId !== activeProduct.id,
      );

      return randomProducts;
    } else {
      return allProducts.slice(0, 10);
    }
  }, [activeProduct, allProducts]);

  //#endregion functions
  if (status === 'loading') {
    return <ProductDetailsSkeleton />;
  } else if (status === 'error') {
    return (
      <section className="section section--product-was-not-found">
        <h1 className="product-details-page__not-found-title">
          {texts.productWasNotFound}
        </h1>
        <img
          className="product-details-page__not-found-img"
          src="/img/product-not-found.png"
          alt="product-not-found"
        />
      </section>
    );
  } else {
    return (
      <div className="product-details-page">
        <div className="container container--product-details-page">
          {activeProduct && (
            <section className="section section--head">
              <Breadcrumbs
                className="product-details-page__breadcrumbs"
                category={activeProduct.category}
                productName={activeProduct.name}
              />
              <ButtonBack className="product-details-page__button-back" />
            </section>
          )}
          {status === 'success' && activeProduct && (
            <section className="section section--body">
              <ProductDetails
                className="product-details-page__product-details"
                activeProduct={activeProduct}
              />
            </section>
          )}
          {activeProduct && allProducts && (
            <section className="section section--products-slider">
              <ProductsSlider
                className="product-details-page__products-slider"
                title={texts.youMayAlsoLike}
                items={alsoLike}
                showDiscount={false}
              />
            </section>
          )}
        </div>
      </div>
    );
  }
};
