import './ProductDetails.style.scss';

import { useEffect } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import { loadProducts } from '../../../features/ProductsSlice/ProductsSlice';

import { Breadcrumbs } from '../../shared/Breadcrumbs/Breadcrumbs';
import { BackButton } from '../../shared/BackButton/BackButton';
import { Slider } from '../../shared/Slider/Slider';
import { ProductPrice } from '../../shared/ProductCard/ProductPrice/ProductPrice';
import { ProductTechSpecs } from '../../shared/ProductCard/ProductTechSpecs/ProductTechSpec';
import { ProductCardButtons } from '../../shared/ProductCard/ProductCardButtons/ProductCardButtons';
import { CustomSwiper } from '../../shared/Swiper/Swiper';

import { useCustomNavigation } from '../../../utils/customHooks';
import { PageNotFound } from '../PageNotFound/PageNotFound';
import { loadProductDetails } from '../../../features/ProductDetailsSlice/ProductDetailsSlice';
import { Skeleton } from '../../shared/Skeleton/Skeleton';
import { useParams } from 'react-router-dom';

export const ProductDetails = () => {
  const dispatch = useAppDispatch();

  const allProducts = useAppSelector(state => state.products.products);
  const recommendations = allProducts.slice(0, 20);

  const { loading, productDetails } = useAppSelector(
    state => state.productDetails,
  );

  const { id: productId } = useParams();
  const { doNavigation } = useCustomNavigation();

  const shortTechSpecs = {
    screen: productDetails?.screen,
    resolution: productDetails?.resolution,
    processor: productDetails?.processor,
    ram: productDetails?.ram,
  };
  const extendedTechSpecs = {
    ...shortTechSpecs,
    'built in memory': productDetails?.capacity,
    camera: productDetails?.camera || 'not applicable',
    zoom: productDetails?.zoom || 'not applicable',
    cell: productDetails?.cell || 'not applicable',
  };

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  useEffect(() => {
    if (!allProducts || allProducts.length === 0) {
      return;
    }

    const product = allProducts.find(p => p.itemId === productId);

    if (product) {
      dispatch(
        loadProductDetails({ category: product.category, id: product.itemId }),
      );
    }
  }, [allProducts, productId, dispatch]);

  if (loading) {
    return <Skeleton page="productDetails" />;
  }

  if (productDetails) {
    return (
      <div className="product-page">
        <div className="product-page__crumbs">
          <Breadcrumbs />
        </div>

        <div className="product-page__backbutton">
          <BackButton />
        </div>

        <div className="product-page__content">
          <h1 className="product-page__title">{productDetails.name}</h1>

          <div className="product-page__sections">
            <div className="product-page__section product-page__section--design">
              <div className="product-page__product-design">
                <CustomSwiper
                  page="productDetails"
                  thumbs={productDetails.images}
                />
              </div>

              <div className="product-page__sidebar sidebar">
                <div className="sidebar__options">
                  <div className="sidebar__options__block">
                    <p className="sidebar__options__title">available colors</p>

                    <div className="sidebar__options__wrap">
                      {productDetails.colorsAvailable.map((color: string) => {
                        const normalizeColor = color
                          .split(' ')
                          .join('-')
                          .toLowerCase();

                        return (
                          <div
                            key={color}
                            className={classNames(
                              'sidebar__options__color-wrap',
                              {
                                'sidebar__options__color-wrap--picked':
                                  color === productDetails.color,
                              },
                            )}
                            onClick={() =>
                              doNavigation({ product: productDetails, color })
                            }
                          >
                            <div
                              className={`sidebar__options__color sidebar__options__color--${normalizeColor}`}
                            ></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="sidebar__options__block sidebar__options__block--capacity">
                    <p className="sidebar__options__title">select capacity</p>
                    <div className="sidebar__options__wrap">
                      {productDetails.capacityAvailable.map(
                        (capacity: string) => (
                          <p
                            key={capacity}
                            className={classNames(
                              'sidebar__options__capacity',
                              {
                                'sidebar__options__capacity--picked':
                                  capacity === productDetails.capacity,
                              },
                            )}
                            onClick={() =>
                              doNavigation({
                                product: productDetails,
                                capacity,
                              })
                            }
                          >
                            {capacity}
                          </p>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                <div className="sidebar__actions">
                  <ProductPrice
                    regularPrice={productDetails.priceRegular}
                    discountPrice={productDetails.priceDiscount}
                  />

                  <ProductCardButtons
                    id={productDetails.id}
                    productPage={true}
                  />
                </div>

                <div className="sidebar__tech-specs">
                  <ProductTechSpecs specs={shortTechSpecs} />
                </div>
              </div>
            </div>

            <div className="product-page__section product-page__section--info">
              <div className="product-page__article article">
                <h3 className="article__title">about</h3>

                <div className="article__paragraphs">
                  {productDetails.description.map(
                    (info: { title: string; text: string[] }) => {
                      const { title, text } = info;

                      return (
                        <div key={title} className="article__paragraph__text">
                          {text}
                        </div>
                      );
                    },
                  )}
                </div>
              </div>

              <div className="product-page__tech-specs tech-specs">
                <h3 className="tech-specs__title">tech specs</h3>
                <div className="tech-specs__content">
                  <ProductTechSpecs specs={extendedTechSpecs} />
                </div>
              </div>
            </div>
          </div>

          <div className="product-page__slider">
            <Slider category={'mayLike'} products={recommendations} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="product-page__backbutton">
        <BackButton />
      </div>
      <PageNotFound />;
    </>
  );
};
