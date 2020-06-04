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

  return (
    <div className="container">
      {(product && productDetails) && (
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
                <div className="product__specs">
                  <div className="product__spec">
                    <span className="product__spec-title">Screen</span>
                    <span className="product__spec-info">
                      {productDetails.display.screenSize}
                    </span>
                  </div>
                  <div className="product__spec">
                    <span className="product__spec-title">Resolution</span>
                    <span className="product__spec-info">
                      {productDetails.display.screenResolution}
                    </span>
                  </div>
                  <div className="product__spec">
                    <span className="product__spec-title">Battery</span>
                    <span className="product__spec-info">
                      {productDetails.battery.type}
                    </span>
                  </div>
                  <div className="product__spec">
                    <span className="product__spec-title">RAM</span>
                    <span className="product__spec-info">
                      {productDetails.storage.ram || '1000 MB'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="product__column">
                <h3 className="product__heading">About</h3>
                <p className="product__paragraph">
                  {productDetails.description}
                </p>
                {productDetails.additionalFeatures && (
                  <>
                    <h4 className="product__subheading">Features</h4>
                    <p className="product__paragraph">
                      {productDetails.additionalFeatures}
                    </p>
                  </>
                )}
              </div>
              <div className="product__column">
                <h3 className="product__heading">Tech specs</h3>
                <div className="product__specs product__specs--text-md">
                  <div className="product__spec">
                    <span className="product__spec-title">Screen</span>
                    <span className="product__spec-info">
                      {productDetails.display.screenSize}
                    </span>
                  </div>
                  <div className="product__spec">
                    <span className="product__spec-title">Resolution</span>
                    <span className="product__spec-info">
                      {productDetails.display.screenResolution}
                    </span>
                  </div>
                  <div className="product__spec">
                    <span className="product__spec-title">Processor</span>
                    <span className="product__spec-info">
                      {productDetails.hardware.cpu}
                    </span>
                  </div>
                  <div className="product__spec">
                    <span className="product__spec-title">Storage</span>
                    <span className="product__spec-info">
                      {productDetails.storage.flash || '32000MB'}
                    </span>
                  </div>
                  <div className="product__spec">
                    <span className="product__spec-title">RAM</span>
                    <span className="product__spec-info">
                      {productDetails.storage.ram || '1000 MB'}
                    </span>
                  </div>
                  <div className="product__spec">
                    <span className="product__spec-title">OS</span>
                    <span className="product__spec-info">
                      {productDetails.android.os}
                    </span>
                  </div>
                  <div className="product__spec">
                    <span className="product__spec-title">Battery</span>
                    <span className="product__spec-info">
                      {productDetails.battery.type}
                    </span>
                  </div>
                  <div className="product__spec">
                    <span className="product__spec-title">Weight</span>
                    <span className="product__spec-info">
                      {productDetails.sizeAndWeight.weight}
                    </span>
                  </div>
                </div>
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
      )}
    </div>
  );
};
