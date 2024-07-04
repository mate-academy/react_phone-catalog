import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import './ProductDetailsPage.scss';
import { Link, useOutletContext, useParams } from 'react-router-dom';

import { Accessory } from '../../types/Accessory';
import { Phone } from '../../types/Phone';
import cn from 'classnames';
import {
  getAccessories,
  getPhones,
  getProducts,
  getSuggestedProducts,
  getTablets,
} from '../../api/fetchClient';
import { Product } from '../../types/Product';
import { Loader } from '../Loader';
import { ProductsSlider } from '../ProductsSlider';
import { ItemsContext } from '../../ItemsContext';

type Props = {
  productPage: string;
};

type Detailed = Accessory | Phone;

export const ProductDetailsPage: React.FC<Props> = ({ productPage }) => {
  const { itemId } = useParams();

  const darkTheme = useOutletContext<boolean>();

  const [products, setProducts] = useState<Product[]>([]);

  const [detailedProducts, setDetailedProducts] = useState<Detailed[]>([]);

  const currentDetailedProduct = useMemo(() => {
    return detailedProducts.find(item => itemId === item.id);
  }, [detailedProducts, itemId]);

  const {
    favoriteProducts,
    setFavoriteProducts,
    items,
    setItems,
    setAllPrices,
  } = useContext(ItemsContext);

  const [loader, setLoader] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  const [selectedImage, setSelectedImage] = useState(
    currentDetailedProduct?.images[0],
  );

  const [selectedColor, setSelectedColor] = useState(
    currentDetailedProduct?.color,
  );

  const [selectedCapacity, setSelectedCapacity] = useState(
    currentDetailedProduct?.capacity,
  );

  const [isFavorite, setIsFavorite] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const currentProductFavorite = favoriteProducts.find(
    item => item.itemId === currentDetailedProduct?.id,
  );

  const currentProductInCart = items.find(
    item => item.product.itemId === itemId,
  );

  useEffect(() => {
    if (currentProductFavorite) {
      setIsFavorite(true);
    }
  }, [currentProductFavorite]);

  useEffect(() => {
    if (currentProductInCart) {
      setIsSelected(true);
    }
  }, [currentProductInCart]);

  useEffect(() => {
    if (currentDetailedProduct) {
      setSelectedImage(currentDetailedProduct.images[0]);
      setSelectedCapacity(currentDetailedProduct.capacity);
      setSelectedColor(currentDetailedProduct.color);
    }
  }, [currentDetailedProduct]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const randomProducts = useMemo(() => {
    return getSuggestedProducts(products, 10);
  }, [products]);

  const loadProducts = useCallback(() => {
    switch (productPage) {
      case 'Tablets':
        getTablets()
          .then(setDetailedProducts)
          .catch(error => {
            setErrorMessage(true);
            throw error;
          })
          .finally(() => setLoader(false));

        break;

      case 'Accessories':
        getAccessories()
          .then(setDetailedProducts)
          .catch(error => {
            setErrorMessage(true);
            throw error;
          })
          .finally(() => setLoader(false));

        break;

      case 'Phones':
        getPhones()
          .then(setDetailedProducts)
          .catch(error => {
            setErrorMessage(true);
            throw error;
          })
          .finally(() => setLoader(false));

        break;
    }
  }, [productPage]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleAddToCartDetailed = (
    currentId: string,
    isProductSelected: boolean,
  ) => {
    setIsSelected(true);

    const newSelectedProduct = products.find(
      currentProduct => currentProduct.itemId === currentId,
    );

    if (!isProductSelected && newSelectedProduct) {
      setItems(currentIitems => [
        ...currentIitems,
        { product: newSelectedProduct, id: newSelectedProduct.id, quantity: 1 },
      ]);

      setAllPrices(currentPrices => [
        ...currentPrices,
        {
          id: newSelectedProduct.id,
          sum: newSelectedProduct.price,
        },
      ]);
    }
  };

  const handleAddToFavoritesDetailed = (
    currentId: string,
    isProductFavorite: boolean,
  ) => {
    const newFavoriteProduct = products.find(
      currentProduct => currentProduct.itemId === currentId,
    );

    if (isProductFavorite && newFavoriteProduct) {
      setFavoriteProducts(currentFavoriteProducts =>
        currentFavoriteProducts.filter(
          currentProduct => currentProduct.id !== newFavoriteProduct.id,
        ),
      );
    }

    if (!isProductFavorite && newFavoriteProduct) {
      setFavoriteProducts(currentFavoriteProducts => [
        ...currentFavoriteProducts,
        newFavoriteProduct,
      ]);
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <div className="page">
      {loader && <Loader />}
      {!currentDetailedProduct && (
        <p className="product-not-found">Product was not found</p>
      )}
      {currentDetailedProduct && (
        <main className="product-details-page">
          <div className="product-details-page__container">
            <div className="product-details-page__bread-crumbs bread-crumbs">
              <Link
                to="/"
                className={cn('bread-crumbs__home-link icon-home', {
                  'bread-crumbs__home-link--dark-theme': darkTheme,
                })}
              ></Link>
              <div className="bread-crumbs__arrow icon-arrow-right"></div>
              <Link to=".." className="bread-crumbs__link">
                {productPage}
              </Link>
              <div className="bread-crumbs__arrow icon-arrow-right"></div>
              <p className="bread-crumbs__link bread-crumbs__link--selected">
                {currentDetailedProduct.name}
              </p>
            </div>

            <div className="product-details-page__back-nav back-nav">
              <div className="back-nav__arrow icon-arrow-left"></div>
              <Link to=".." className="back-nav__link">
                Back
              </Link>
            </div>

            <section className="product-details-page__product product">
              <h1 className="product__title title">
                {currentDetailedProduct.name}
              </h1>
              <div className="product__main-info">
                <div className="product__media">
                  <div className="product__big-photo">
                    <img src={selectedImage} alt="Image" />
                  </div>
                  <div className="product__small-photos">
                    {currentDetailedProduct.images.map(image => (
                      <a
                        className={cn('image', {
                          'image--selected': image === selectedImage,
                          'image--dark-theme': darkTheme,
                          'image--dark-theme-selected':
                            image === selectedImage && darkTheme,
                        })}
                        key={image}
                      >
                        <img
                          src={image}
                          alt="Image"
                          onClick={() => setSelectedImage(image)}
                        />
                      </a>
                    ))}
                  </div>
                </div>
                <div className="product__characteristics">
                  <div className="product__colors">
                    <p className="product__char-subtitle">Available colors</p>
                    <div className="product__colors-container">
                      {currentDetailedProduct.colorsAvailable.map(color => (
                        <div
                          key={color}
                          className={cn('product__color-box', {
                            'product__color-box--selected':
                              color === selectedColor,
                            'product__color-box--dark-theme': darkTheme,
                            'product__color-box--dark-theme-selected':
                              color === selectedColor && darkTheme,
                          })}
                        >
                          <button
                            className="product__color"
                            type="button"
                            onClick={() => setSelectedColor(color)}
                            style={{ backgroundColor: `${color}` }}
                          />
                        </div>
                      ))}
                    </div>
                    <p className="product__id">ID: 802390</p>
                  </div>

                  <div className="product__capacity">
                    <p className="product__char-subtitle">Select capacity</p>
                    <div className="product__capacity-container">
                      {currentDetailedProduct.capacityAvailable.map(
                        capacity => (
                          <button
                            key={capacity}
                            className={cn('product__capacity-value', {
                              'product__capacity-value--selected':
                                capacity === selectedCapacity,
                            })}
                            type="button"
                            onClick={() => setSelectedCapacity(capacity)}
                          >
                            {`${capacity}`}
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="product__price">
                    <p className="product__discount-price">{`$${currentDetailedProduct.priceDiscount}`}</p>
                    <p className="product__regular-price">{`$${currentDetailedProduct.priceRegular}`}</p>
                  </div>

                  <div className="product__actions actions">
                    {isSelected ? (
                      <button
                        type="button"
                        className={cn(
                          'actions__add-to-cart-button add-to-cart-button',
                          {
                            'add-to-cart-button--selected': isSelected,
                          },
                        )}
                      >
                        Added
                      </button>
                    ) : (
                      <button
                        type="button"
                        className={cn(
                          'actions__add-to-cart-button add-to-cart-button',
                          {
                            'add-to-cart-button--selected': isSelected,
                          },
                        )}
                        onClick={() =>
                          handleAddToCartDetailed(
                            currentDetailedProduct.id,
                            isSelected,
                          )
                        }
                      >
                        Add to cart
                      </button>
                    )}

                    <button
                      type="button"
                      className={cn('actions__button button icon-favorites', {
                        'icon-favorites-filled button--selected': isFavorite,
                        'icon-favorites--dark-theme': darkTheme,
                      })}
                      onClick={() =>
                        handleAddToFavoritesDetailed(
                          currentDetailedProduct.id,
                          isFavorite,
                        )
                      }
                    ></button>
                  </div>

                  <div
                    className="product__product-info
                 product__product-info product-info--short"
                  >
                    <div className="product-info__item">
                      <p className="product-info__text">Screen</p>
                      <p className="product-info__value">
                        {currentDetailedProduct.screen}
                      </p>
                    </div>
                    <div className="product-info__item">
                      <p className="product-info__text">Capacity</p>
                      <p className="product-info__value">
                        {currentDetailedProduct.resolution}
                      </p>
                    </div>
                    <div className="product-info__item">
                      <p className="product-info__text">Capacity</p>
                      <p className="product-info__value">
                        {currentDetailedProduct.processor}
                      </p>
                    </div>
                    <div className="product-info__item">
                      <p className="product-info__text">RAM</p>
                      <p className="product-info__value">
                        {currentDetailedProduct.ram}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="product__additional-info">
                <div className="product__about">
                  <h3 className="product__subtitle">About</h3>
                  <div className="product__about-box">
                    {currentDetailedProduct.description.map(
                      currentDescription => (
                        <div key={currentDescription.title}>
                          <p className="product__about-name">
                            {currentDescription.title}
                          </p>
                          <p className="product__about-text">
                            {currentDescription.text}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
                <div className="product__tech">
                  <h3 className="product__subtitle">Tech specs</h3>
                  <div
                    className="product__product-info product-info
                  product__product-info--tech"
                  >
                    <div className="product-info__item">
                      <p className="product-info__text">Screen</p>
                      <p className="product-info__value">
                        {currentDetailedProduct.screen}
                      </p>
                    </div>

                    <div className="product-info__item">
                      <p className="product-info__text">Resolution</p>
                      <p className="product-info__value">
                        {currentDetailedProduct.resolution}
                      </p>
                    </div>

                    <div className="product-info__item">
                      <p className="product-info__text">Processor</p>
                      <p className="product-info__value">
                        {currentDetailedProduct.processor}
                      </p>
                    </div>

                    <div className="product-info__item">
                      <p className="product-info__text">RAM</p>
                      <p className="product-info__value">
                        {currentDetailedProduct.ram}
                      </p>
                    </div>

                    <div className="product-info__item">
                      <p className="product-info__text">Built in memory</p>
                      <p className="product-info__value">
                        {currentDetailedProduct.capacity}
                      </p>
                    </div>

                    <div className="product-info__item">
                      <p className="product-info__text">Cell</p>
                      <p className="product-info__value">
                        {currentDetailedProduct.cell}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <ProductsSlider
              title="You may also like"
              products={randomProducts}
              discount={false}
              darkTheme={darkTheme}
            />
          </div>
        </main>
      )}
      {errorMessage && <p>Product was not found</p>}
    </div>
  );
};
