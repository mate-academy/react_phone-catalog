import cn from 'classnames';
import { useLocation } from 'react-router-dom';

import {
  useCallback, useEffect, useMemo, useState,
} from 'react';

import * as productDetailsActions from '../../slices/productDetailsSlice';
import * as suggestedProductsActions from '../../slices/suggestedProductsSlice';
import * as cartActions from '../../slices/cartSlice';
import * as productsActions from '../../slices/productsSlice';
import * as favouritesActions from '../../slices/favouritesSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ICartItem, IProduct } from '../../types';

import {
  Breadcrumbs,
  SectionHeader,
  BackButton,
  TechSpecs,
  Price,
  BuyButtons,
  Loader,
  ProductsSlider,
} from '../../components';

import './ProductDetailsPage.scss';

export const ProductDetailsPage = () => {
  const { pathname } = useLocation();
  const categoryId = pathname.split('/').slice(-1)[0];
  const dispatch = useAppDispatch();
  const {
    productDetails,
    loaded: productDetailsLoaded,
    hasError: hasProductDetailsError,
  } = useAppSelector(state => state.productDetails);
  const {
    allProducts,
  } = useAppSelector(state => state.products);
  const {
    cartItems,
  } = useAppSelector(state => state.cartItems);
  const {
    favouritesItems,
  } = useAppSelector(state => state.favouritesItems);
  const {
    suggestedProducts,
    hasError: hasSuggestedProductsError,
    loaded: suggestedProductsLoaded,
  } = useAppSelector(state => state.suggestedProducts);
  const availableColors: string[] = [];
  const availableCapacities: string[] = [];
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const smallTechSpecs = useMemo(() => {
    if (!productDetails) {
      return null;
    }

    return {
      OS: productDetails.android.os,
      RAM: productDetails.storage.ram,
      Memory: productDetails.storage.flash,
      Camera: productDetails.camera.primary,
    };
  }, [productDetails]);

  const techSpecs = useMemo(() => {
    if (!productDetails) {
      return null;
    }

    return {
      Screen: productDetails.display.screenSize,
      Resolution: productDetails.display.screenResolution,
      OS: productDetails.android.os,
      RAM: productDetails.storage.ram,
      Memory: productDetails.storage.flash,
      Camera: productDetails.camera.primary,
      Weight: productDetails.sizeAndWeight.weight,
      Battery: productDetails.battery.standbyTime,
    };
  }, [productDetails]);

  const currentCartItem = cartItems.find(
    item => item.product.id === selectedProduct?.id,
  );
  const hasInCart = !!currentCartItem;
  const hasInFavourites = !!favouritesItems.find(
    item => item.id === selectedProduct?.id,
  );

  const handleAddToCart = useCallback(() => {
    if (!selectedProduct) {
      return;
    }

    if (hasInCart) {
      dispatch(cartActions.deleteItem(currentCartItem.id));
    } else {
      const cartItem: ICartItem = {
        id: String(new Date().valueOf()),
        quantity: 1,
        product: selectedProduct,
      };

      dispatch(cartActions.addItem(cartItem));
    }
  }, [dispatch, selectedProduct, hasInCart, currentCartItem]);

  const handleAddToFavorites = useCallback(() => {
    if (!selectedProduct) {
      return;
    }

    if (hasInFavourites) {
      dispatch(favouritesActions.deleteItem(selectedProduct.id));
    } else {
      dispatch(favouritesActions.addItem(selectedProduct));
    }
  }, [dispatch, hasInFavourites, selectedProduct]);

  const hasLoader = (
    (!productDetailsLoaded && !hasProductDetailsError)
    || (!suggestedProductsLoaded && !hasSuggestedProductsError)
  );

  const isPageVisible = (
    (productDetailsLoaded && !hasProductDetailsError && productDetails)
    && (
      suggestedProductsLoaded && !hasSuggestedProductsError && suggestedProducts
    )
  );

  useEffect(() => {
    dispatch(productDetailsActions.fetchProductDetails(categoryId));
    dispatch(suggestedProductsActions.fetchSuggestedProducts());
    dispatch(productsActions.fetchAll());
  }, [dispatch, categoryId]);

  useEffect(() => {
    setSelectedImage(productDetails?.images[0] || '');
  }, [productDetails]);

  useEffect(() => {
    const product = allProducts.find(el => el.id === categoryId);

    setSelectedProduct(product || null);
  }, [allProducts, categoryId]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [selectedProduct]);

  return (
    <div className="product-page">
      <Breadcrumbs classNames="product-page__small-nav" />

      { hasLoader && <Loader /> }

      { isPageVisible && (
        <>
          <BackButton classNames="product-page__back-button" />
          <SectionHeader
            title={productDetails.name}
            classNames="product-page__title"
          />

          <div className="product-page__container">
            <section className="product-page__images product-images">
              <div className="product-images__side-images">
                {
                  productDetails.images.map(el => (
                    <img
                      src={`${el}`}
                      alt={productDetails.name}
                      className={cn(
                        'product-images__side-image',
                        {
                          'product-images__side-image--selected':
                            el === selectedImage,
                        },
                      )}
                      key={el}
                      role="presentation"
                      onClick={() => setSelectedImage(el)}
                    />
                  ))
                }
              </div>

              <img
                src={selectedImage}
                alt="del"
                className="product-images__main-image"
              />
            </section>

            <section className="product-page__main-info product-info">
              <div className="product-info__main">
                { !!availableColors.length
                        && (
                          <div className="product-info__available-colors">
                            <p className="product-info__title">
                              Available colors
                            </p>
                            <div className="available-colors">
                              {availableColors.map(color => (
                                <span
                                  key={color}
                                  className={cn(
                                    'available-colors__circle',
                                    'available-colors__circle--big',
                                    {
                                      'available-colors__circle--selected':
                          color === selectedColor,
                                    },
                                  )}
                                  role="presentation"
                                  onClick={() => setSelectedColor(color)}
                                >
                                  <span
                                    className="
                        available-colors__circle
                        available-colors__circle--small
                        "
                                    style={{ backgroundColor: color }}
                                  />
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                {
                  !!availableCapacities.length && (
                    <div className="product-info__capacity">
                      <p className="product-info__title">
                        Select capacity
                      </p>

                      <div className="capacities">
                        {
                          availableCapacities.map(capacity => (
                            <span
                              key={capacity}
                              className={cn(
                                'capacities__item',
                                {
                                  'capacities__item--selected':
                              capacity === selectedCapacity,
                                },
                              )}
                              role="presentation"
                              onClick={() => setSelectedCapacity(capacity)}
                            >
                              {`${capacity} GB`}
                            </span>
                          ))
                        }
                      </div>
                    </div>
                  )
                }

                {selectedProduct && (
                  <div className="product-info__buy">
                    <Price
                      discount={selectedProduct.discount}
                      price={selectedProduct.price}
                      priceFontSize={32}
                    />
                    <BuyButtons
                      containerHeight={48}
                      add={handleAddToCart}
                      isAddButtonSelected={hasInCart}
                      like={handleAddToFavorites}
                      isFavoriteButtonSelected={hasInFavourites}

                    />
                  </div>
                )}

                <TechSpecs
                  classNames="product-info__specs"
                  specs={smallTechSpecs || {}}
                />
              </div>

              <p className="product-info__id">
                {`ID: ${productDetails.id.toUpperCase()}`}
              </p>
            </section>

            <section
              className="product-page__about"
              data-cy="productDescription"
            >
              <h2 className="
                product-page__subtitle
                product-page__subtitle--about"
              >
                About
              </h2>

              <article className="about-product">
                <p className="about-product__text">
                  {productDetails.description}
                </p>

              </article>
            </section>

            <section className="product-page__specs">
              <h2 className="
                product-page__subtitle
                product-page__subtitle--specs"
              >
                Tech specs
              </h2>

              <TechSpecs
                classNames="product-page__specs-table"
                specs={techSpecs || {}}
              />
            </section>
          </div>

          <ProductsSlider
            items={suggestedProducts}
            title="You may also like"
          />
        </>
      )}
    </div>
  );
};
