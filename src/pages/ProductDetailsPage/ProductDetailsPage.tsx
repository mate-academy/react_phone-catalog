import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Heading } from '../../components/Heading/Heading';
import { FavoriteBtn } from '../../components/Buttons/FavoriteBtn';
import {
  FAVORITE_BTN_SIZES, PRICE_TEXT_SIZES, BTN_TITLES, BTN_SIZES, SHOWCASE_HEADINGS,
} from '../../common/constants';
import { ProductPrice } from '../../components/ProductCard/ProductPrice';
import { PrimaryBtn } from '../../components/Buttons/PrimaryBtn';
import { getDetails, getProducts, loadDetails } from '../../redux';
import { ShowcaseBlock } from '../../components/ShowcaseBlock/ShowcaseBlock';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { BackBtn } from '../../components/Buttons/BackBtn';
import { ProductGallery } from '../../components/ProductGallery/ProductGallery';
import { useRouter } from '../../components/_hooks/useRouter';
import { ProductTechSpecs } from './ProductTechSpecs';
import { ProductDescription } from './ProductDescription';
import { ErrorPage } from '../ErrorPage';

export const ProductDetailsPage = () => {
  const dispatch = useDispatch();
  const { match } = useRouter();
  const [product, setProduct] = useState<Product>();
  const productDetails: ProductDetails = useSelector(getDetails);
  const products: Product[] = useSelector(getProducts);

  const currentProduct = useMemo(() => (products.find(
    p => (p.id === match.params.productId),
  )),
  [products, match]);

  useEffect(() => {
    dispatch(loadDetails(match.params.productId));
    setProduct(currentProduct);
  }, [dispatch, match, currentProduct]);

  if (!product || !productDetails) {
    return <ErrorPage />
  }

  return (
    <div className="container">
      <article className="product">
        <section className="section product__section">
          <Breadcrumbs />
          <BackBtn />
          <Heading title={productDetails.name} />
          <div className="product__grid">
            <div className="product__column">
              <div className="product__gallery">
                <ProductGallery
                  images={productDetails.images}
                  title={productDetails.name}
                />
              </div>
            </div>
            <div className="product__column">
              <div className="product__flex-wrap">
                <ProductPrice
                  price={product.price}
                  discount={product.discount}
                  styleSize={PRICE_TEXT_SIZES.large}
                />
                <span className="product__id">
                  {`ID: ${product.id}`}
                </span>
              </div>
              <div className="product__flex-wrap product__buttons">
                <PrimaryBtn
                  title={BTN_TITLES.addToCart}
                  styleSize={BTN_SIZES.large}
                />
                <FavoriteBtn
                  productId={product.id}
                  styleSize={FAVORITE_BTN_SIZES.large}
                />
              </div>
              <ProductTechSpecs {...productDetails } shortened />
            </div>
            <div className="product__column">
              <ProductDescription { ...productDetails }/>
            </div>
            <div className="product__column">
              <h3 className="product__heading">Tech specs</h3>
              <ProductTechSpecs { ...productDetails } />
            </div>
          </div>
        </section>
        <section className="section">
          <ShowcaseBlock
            title={SHOWCASE_HEADINGS.alsoLike}
            selectedProduct={product}
          />
        </section>
      </article>
    </div>
  );
};
