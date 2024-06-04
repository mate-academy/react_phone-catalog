import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

import { useCallback, useEffect, useMemo, useState } from 'react';

import * as productDetailsActions from '../../slices/productDetailsSlice';
import * as suggestedProductsActions from '../../slices/suggestedProductsSlice';
import * as cartActions from '../../slices/cartSlice';
import * as favouritesActions from '../../slices/favouritesSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ICartItem } from '../../types';

import {
  Breadcrumbs,
  SectionHeader,
  BackButton,
  TechSpecs,
  Price,
  BuyButtons,
  Loader,
  ProductsSlider,
  ErrorMessage,
} from '../../components';

import './ProductDetailsPage.scss';
import { getColor, getNewProductPath } from '../../utils';

export const ProductDetailsPage = () => {
  const { pathname } = useLocation();
  const productId = pathname.split('/').slice(-1)[0];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    selectedProductDetails,
    selectedProduct,
    loaded: productDetailsLoaded,
    hasError: hasProductDetailsError,
  } = useAppSelector(state => state.productDetails);
  const { allProducts } = useAppSelector(state => state.products);
  const { cartItems } = useAppSelector(state => state.cartItems);
  const { favouritesItems } = useAppSelector(state => state.favouritesItems);
  const {
    suggestedProducts,
    hasError: hasSuggestedProductsError,
    loaded: suggestedProductsLoaded,
  } = useAppSelector(state => state.suggestedProducts);
  const availableColors: string[] =
    selectedProductDetails?.colorsAvailable || [];
  const availableCapacities: string[] =
    selectedProductDetails?.capacityAvailable || [];
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');

  const smallTechSpecs = useMemo(() => {
    if (!selectedProductDetails) {
      return null;
    }

    return {
      Screen: selectedProductDetails.screen,
      Resolution: selectedProductDetails.resolution,
      Processor: selectedProductDetails.processor,
      RAM: selectedProductDetails.ram,
    };
  }, [selectedProductDetails]);

  const techSpecs = useMemo(() => {
    if (!selectedProductDetails) {
      return null;
    }

    return {
      Screen: selectedProductDetails.screen,
      Resolution: selectedProductDetails.resolution,
      Processor: selectedProductDetails.processor,
      RAM: selectedProductDetails.ram,
      Memory: selectedProductDetails.capacity,
      Camera: selectedProductDetails.camera,
      Zoom: selectedProductDetails.zoom,
      Cell: selectedProductDetails.cell.join(', '),
    };
  }, [selectedProductDetails]);

  const currentCartItem = cartItems.find(
    item => item.product.itemId === selectedProduct?.itemId,
  );
  const hasInCart = !!currentCartItem;
  const hasInFavourites = !!favouritesItems.find(
    item => item.itemId === selectedProduct?.itemId,
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
      dispatch(favouritesActions.deleteItem(selectedProduct.itemId));
    } else {
      dispatch(favouritesActions.addItem(selectedProduct));
    }
  }, [dispatch, hasInFavourites, selectedProduct]);

  const hasLoader =
    (!productDetailsLoaded && !hasProductDetailsError) ||
    (!suggestedProductsLoaded && !hasSuggestedProductsError) ||
    !allProducts.length;

  const hasInfo =
    productDetailsLoaded &&
    !hasProductDetailsError &&
    suggestedProductsLoaded &&
    !hasSuggestedProductsError &&
    !!suggestedProducts.length &&
    !!selectedProduct &&
    !!selectedProductDetails;

  const hasError =
    (hasProductDetailsError && productDetailsLoaded) ||
    (!hasLoader &&
      !selectedProduct &&
      !selectedProductDetails &&
      !!allProducts.length);

  const selectNewProduct = useCallback(
    (capacity: string, color: string) => {
      if (!selectedProductDetails) {
        return;
      }

      navigate(
        getNewProductPath(selectedProductDetails.namespaceId, capacity, color),
      );
    },
    [navigate, selectedProductDetails],
  );

  useEffect(() => {
    if (allProducts.length) {
      dispatch(productDetailsActions.fetchProductDetails({ id: productId }));
    }
  }, [dispatch, productId, allProducts]);

  useEffect(() => {
    dispatch(suggestedProductsActions.fetchSuggestedProducts());
  }, [dispatch, productId]);

  useEffect(() => {
    setSelectedImage(selectedProductDetails?.images[0] || '');
    setSelectedColor(selectedProductDetails?.color || '');
    setSelectedCapacity(selectedProductDetails?.capacity || '');
  }, [selectedProductDetails]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [selectedProduct]);

  useEffect(
    () => () => {
      dispatch(productDetailsActions.resetStore());
    },
    [dispatch],
  );

  return (
    <div className="product-page">
      <Breadcrumbs classNames="product-page__small-nav" />

      {hasLoader && <Loader />}

      {hasInfo && (
        <>
          <BackButton classNames="product-page__back-button" />
          <SectionHeader
            title={selectedProductDetails.name}
            classNames="product-page__title"
          />

          <div className="product-page__container">
            <div
              className="
                product-page__info-container
                product-page__info-container--first-part
              "
            >
              <section className="product-page__images product-images">
                <div className="product-images__side-images">
                  {selectedProductDetails.images.map(el => (
                    <img
                      src={`${el}`}
                      alt={selectedProductDetails.name}
                      className={cn('product-images__side-image', {
                        'product-images__side-image--selected':
                          el === selectedImage,
                      })}
                      key={el}
                      role="presentation"
                      onClick={() => setSelectedImage(el)}
                    />
                  ))}
                </div>

                <img
                  src={selectedImage}
                  alt={selectedProductDetails.name}
                  className="product-images__main-image"
                />
              </section>

              <section className="product-page__main-info product-info">
                <div className="product-info__main">
                  {!!availableColors.length && (
                    <div className="product-info__available-colors">
                      <p className="product-info__title">Available colors</p>
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
                            onClick={() =>
                              selectNewProduct(selectedCapacity, color)
                            }
                          >
                            <span
                              className="
                        available-colors__circle
                        available-colors__circle--small
                        "
                              style={{ backgroundColor: getColor(color) }}
                            />
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {!!availableCapacities.length && (
                    <div className="product-info__capacity">
                      <p className="product-info__title">Select capacity</p>

                      <div className="capacities">
                        {availableCapacities.map(capacity => (
                          <span
                            key={capacity}
                            className={cn('capacities__item', {
                              'capacities__item--selected':
                                capacity === selectedCapacity,
                            })}
                            role="presentation"
                            onClick={() =>
                              selectNewProduct(capacity, selectedColor)
                            }
                          >
                            {`${capacity}`}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProduct && (
                    <div className="product-info__buy">
                      <Price
                        discountPrice={selectedProduct.price}
                        fullPrice={selectedProduct.fullPrice}
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
                  {`ID: ${selectedProductDetails.id.toUpperCase()}`}
                </p>
              </section>
            </div>

            <div className="product-page__info-container">
              <section
                className="product-page__about"
                data-cy="productDescription"
              >
                <h2
                  className="
                product-page__subtitle
                product-page__subtitle--about"
                >
                  About
                </h2>

                {selectedProductDetails.description.map(el => (
                  <article className="about-product" key={el.text}>
                    <h3 className="about-product__title">{el.title}</h3>

                    <p className="about-product__text">{el.text}</p>
                  </article>
                ))}
              </section>

              <section className="product-page__specs">
                <h2
                  className="
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
          </div>

          <ProductsSlider items={suggestedProducts} title="You may also like" />
        </>
      )}

      {hasError && <ErrorMessage title="Product was not found" />}
    </div>
  );
};
