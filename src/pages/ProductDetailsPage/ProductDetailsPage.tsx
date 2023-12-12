import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProductDetails } from '../../features/productDetailsSlice';
import { fetchProducts } from '../../features/productsSlice';
import { Loader } from '../../components/Loader';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { BackButton } from '../../components/BackButton';
import { getProductDiscount } from '../../utils/getProductDiscount';

import { Product } from '../../types/Product';
import { Status } from '../../types/Status';

import './ProductDetailsPage.scss';

const productColors = ['#fcdbc1', '#5f7170', '#4c4c4c', '#f0f0f0'];
const productCapacities = [64, 256, 512];

export const ProductDetailsPage = () => {
  const [productImgId, SetProductImgId] = useState(0);
  const [productColorId, SetProductColorId] = useState(0);
  const [productCapacityId, SetProductCapacityId] = useState(0);

  const dispatch = useAppDispatch();

  const {
    products,
    status: productsStatus,
  } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const {
    productDetails,
    status: productDetailsStatus,
  } = useAppSelector(state => state.productDetails);
  const { productId } = useParams();

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetails(productId));
    }
  }, [productId]);

  const product = useMemo(() => {
    return products.find(item => item.id === productId);
  }, [products, productId]) as Product;

  const discountPrice = useMemo(() => {
    if (product) {
      return getProductDiscount(product);
    }

    return 0;
  }, [product]);

  const suggestedProducts = useMemo(() => {
    return products.filter((_, id) => id >= 4 && id < 16);
  }, [products]);

  return (
    <>
      {(productDetailsStatus === Status.LOADING
          || productsStatus === Status.LOADING)
        && <Loader />}

      {(productDetailsStatus === Status.IDLE
          && productsStatus === Status.IDLE)
        && (
          <>
            <Breadcrumbs />

            <BackButton />

            <section className="Page-Section ProductDetail">
              <h1 className="ProductDetail-SectionTitle SectionTitle">
                {productDetails?.name}
              </h1>

              <aside className="ProductDetail-ImagesContainer">
                <ul className="ProductDetail-ImgList">
                  {productDetails?.images.map((url, id) => (
                    <li className="ProductDetail-ListItem" key={url}>
                      <button
                        type="button"
                        className={cn(
                          'ProductDetail-ImgButton',
                          // eslint-disable-next-line max-len
                          { 'ProductDetail-ImgButton_active': productImgId === id },
                        )}
                        onClick={() => SetProductImgId(id)}
                      >
                        <img
                          className="ProductDetail-ImgSmall"
                          src={url}
                          alt="product small"
                          width="80"
                          height="78"
                        />
                      </button>

                    </li>
                  ))}
                </ul>
              </aside>

              <img
                className="ProductDetail-Img"
                src={productDetails?.images[productImgId]}
                alt="product"
                width="464"
              />

              <div className="ProductDetail-Right">
                <div className="ProductDetail-Colors">
                  <span className="ProductDetail-SelectLabel">
                    Available colors
                  </span>

                  <ul className="ProductDetail-SelectList">
                    {productColors.map((color, id) => (
                      <li className="ProductDetail-ColorItem" key={color}>
                        <button
                          className={cn(
                            'ProductDetail-ColorButton',
                            // eslint-disable-next-line max-len
                            { 'ProductDetail-ColorButton_active': productColorId === id },
                          )}
                          type="button"
                          onClick={() => SetProductColorId(id)}
                        >
                          <span
                            className="ProductDetail-ColorCircle"
                            style={{ backgroundColor: color }}
                          />
                        </button>
                      </li>
                    ))}
                  </ul>

                  <hr className="ProductDetail-Break" />
                </div>

                <div className="ProductDetail-Capacities">
                  <span className="ProductDetail-SelectLabel">
                    Select capacity
                  </span>

                  <ul className="ProductDetail-SelectList">
                    {productCapacities.map((capacity, id) => (
                      <li className="ProductDetail-CapacityItem" key={capacity}>
                        <button
                          className={cn(
                            'ProductDetail-CapacityButton',
                            // eslint-disable-next-line max-len
                            { 'ProductDetail-CapacityButton_active': productCapacityId === id },
                          )}
                          type="button"
                          onClick={() => SetProductCapacityId(id)}
                        >
                          {`${capacity} GB`}
                        </button>
                      </li>
                    ))}
                  </ul>

                  <hr className="ProductDetail-Break" />
                </div>

                <div className="ProductDetail-Prices">
                  <span className="ProductDetail-DiscountPrice">
                    {`$${discountPrice}`}
                  </span>

                  {product && discountPrice !== product.price
                  && (
                    <span className="ProductDetail-Price">
                      {`$${product.price}`}
                    </span>
                  )}
                </div>

                <div className="ProductDetail-Buttons">
                  <button
                    className="ProductDetail-Button Button"
                    type="button"
                  >
                    Add to cart
                  </button>

                  <button
                    className="ProductDetail-Icon Icon Icon_heart"
                    type="button"
                    aria-label="Heart"
                  />
                </div>

                <div className="ProductDetail-Specs">
                  <div className="ProductDetail-Spec">
                    <span className="ProductDetail-Label">Screen</span>

                    <span className="ProductDetail-Value">
                      {productDetails?.display.screenSize}
                    </span>
                  </div>

                  <div className="ProductDetail-Spec">
                    <span className="ProductDetail-Label">Resolution</span>

                    <span className="ProductDetail-Value">
                      {productDetails?.display.screenResolution}
                    </span>
                  </div>

                  <div className="ProductDetail-Spec">
                    <span className="ProductDetail-Label">Processor</span>

                    <span className="ProductDetail-Value">
                      {productDetails?.hardware.cpu}
                    </span>
                  </div>

                  <div className="ProductDetail-Spec">
                    <span className="ProductDetail-Label">RAM</span>
                    <span className="ProductDetail-Value">
                      {productDetails?.storage.ram}
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="ProductDetail-About"
                data-cy="productDescription"
              >
                <span className="ProductDetail-AboutTitle">
                  About
                </span>

                <hr className="ProductDetail-Break" />

                <div className="ProductDetail-AboutDescription">
                  {productDetails?.description}
                </div>
              </div>

              <div className="ProductDetail-Tech">
                <span className="ProductDetail-TechTitle">Tech specs</span>

                <hr className="ProductDetail-Break" />

                <div className="ProductDetail-TechSpecs">
                  <div className="ProductDetail-TechSpec">
                    <span className="ProductDetail-TechLabel">
                      Screen
                    </span>

                    {productDetails?.display.screenSize}
                  </div>

                  <div className="ProductDetail-TechSpec">
                    <span className="ProductDetail-TechLabel">
                      Resolution
                    </span>

                    {productDetails?.display.screenResolution}
                  </div>

                  <div className="ProductDetail-TechSpec">
                    <span className="ProductDetail-TechLabel">
                      Processor
                    </span>

                    {productDetails?.hardware.cpu}
                  </div>

                  <div className="ProductDetail-TechSpec">
                    <span className="ProductDetail-TechLabel">
                      RAM
                    </span>

                    {productDetails?.storage.ram}
                  </div>

                  <div className="ProductDetail-TechSpec">
                    <span className="ProductDetail-TechLabel">
                      Built in memory
                    </span>

                    {productDetails?.storage.flash}
                  </div>

                  <div className="ProductDetail-TechSpec">
                    <span className="ProductDetail-TechLabel">
                      Camera
                    </span>

                    {productDetails?.camera.primary}
                  </div>

                  <div className="ProductDetail-TechSpec">
                    <span className="ProductDetail-TechLabel">
                      Additional features
                    </span>

                    {productDetails?.additionalFeatures}
                  </div>

                  <div className="ProductDetail-TechSpec">
                    <span className="ProductDetail-TechLabel">
                      Battery standby time
                    </span>

                    {productDetails?.battery.standbyTime}
                  </div>
                </div>
              </div>
            </section>

            <section className="Page-Section">
              <ProductsSlider
                products={suggestedProducts}
                title="You may also like"
              />
            </section>
          </>
        )}
    </>
  );
};
