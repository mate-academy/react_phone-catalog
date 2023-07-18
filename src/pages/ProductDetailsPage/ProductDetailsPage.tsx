import {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Loader } from '../../components/Loader/Loader';
import { ProductsNav } from '../../components/ProductsNav/ProductsNav';
import { Context } from '../../context/Context';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import CategoriesList from '../../api/CategoriesList.json';
import { Product } from '../../types/Product';
import { BackButton } from '../../components/BackButton/BackButton';
import {
  AddToCartButton,
} from '../../components/AddToCartButton/AddToCartButton';
import { LikeButton } from '../../components/LikeButton/LikeButton';
import { getProductDetails } from '../../api/Products';
import { Error } from '../../types/ErrorType';
import './ProductDetailsPage.scss';

const colorsList = ['pink', 'grey', 'black', 'white'];
const capacityList = [16, 256, 512];

export const ProductDetailsPage: React.FC = () => {
  const {
    isLoading, products, setIsError, setIsLoading,
    selectedProduct, setSelectedProduct,
  } = useContext(Context);
  const { productId = '' } = useParams();
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState(
    selectedProduct?.images[0],
  );
  const [selectedColor, setSelectedColor] = useState(colorsList[0]);
  const [selectedCapacity, setSelectedCapacity] = useState(capacityList[0]);

  const priceWithDiscount = (product: Product) => {
    return product.price - (product.discount * product.price) / 100;
  };

  const product = products.find(
    item => item.id === selectedProduct?.id,
  );

  const newPrice = product ? priceWithDiscount(product) : 0;

  const featuresLong = {
    keys: ['screen', 'resolution', 'processor', 'RAM', 'built in memory',
      'android', 'bluetooth', 'battery'],
    values: [
      `${selectedProduct?.display.screenSize}`,
      `${selectedProduct?.display.screenResolution}`,
      `${selectedProduct?.hardware.cpu}`,
      `${selectedProduct?.storage.ram}`,
      `${selectedProduct?.storage.flash}`,
      `${selectedProduct?.android.os}`,
      `${selectedProduct?.connectivity.bluetooth}`,
      `${selectedProduct?.battery.standbyTime}`,
    ],
  };

  const currentCategory = location.pathname.split('/').slice(1)[0];

  const productCategory = useMemo(() => {
    const list = CategoriesList.filter(
      item => item.type === currentCategory,
    )[0];

    return list.itemType;
  }, [location]);

  const getRecommendations = (
    items: Product[], category: string, currentId: string,
  ) => {
    return items
      .filter(item => (item.type === category)
        && (currentId !== item.id))
      .sort((product1, product2) => (
        product2.price - product1.price
      ));
  };

  const getProductInfo = async (id: string) => {
    setIsError(null);

    try {
      const item = await getProductDetails(id);

      setSelectedProduct(item);
    } catch {
      setIsError(Error.GET_PRODUCT_DETAILS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedProduct && productId.length > 0) {
      getProductInfo(productId);
    }
  }, [productId]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="product-details">
          <ProductsNav data-cy="breadCrumbs" />
          <BackButton data-cy="backButton" />
          <div className="product-details__title">{selectedProduct?.name}</div>

          <div className="product-details__content">
            <div className="product-details__top">
              <div className="product-details__slider slider">
                <div className="slider__col">
                  {selectedProduct?.images.map((image) => (
                    <button
                      key={image}
                      aria-label="image"
                      type="button"
                      className={classNames('slider__button', {
                        'slider__button--active':
                        selectedImage === image,
                      })}
                      style={{ backgroundImage: `url(${image})` }}
                      onClick={() => setSelectedImage(image)}
                    />
                  ))}
                </div>
                <div
                  className="slider__main"
                  style={{ backgroundImage: `url(${selectedImage})` }}
                />
              </div>

              <div className="product-details__action">
                <div className="product-details__select">
                  <p className="product-details__small-text">
                    Available colors
                  </p>
                  <ul className="product-details__select-buttons colors">
                    {colorsList.map((el, index) => (
                      <div
                        key={el}
                        role="button"
                        className={classNames(
                          'colors__item-circle',
                          {
                            'colors__item-circle--is-active':
                            selectedColor === el,
                          },
                        )}
                        tabIndex={index}
                        onClick={() => setSelectedColor(el)}
                        onKeyDown={() => setSelectedColor(el)}
                      >
                        <li
                          className={classNames(
                            'colors__item',
                            `colors__item--${el}`,
                          )}
                        />
                      </div>
                    ))}
                  </ul>
                </div>

                <div className="product-details__select">
                  <p className="product-details__small-text">
                    Select capacity
                  </p>
                  <div className="product-details__select-buttons capacity">
                    {capacityList.map(el => (
                      <button
                        key={el}
                        type="button"
                        className={classNames(
                          'capacity__item',
                          {
                            'capacity__item--is-active':
                              selectedCapacity === el,
                          },
                        )}
                        onClick={() => setSelectedCapacity(el)}
                      >
                        {`${el} GB`}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="product-details__prices">
                  <span className="product-card__price">{`$${product?.price}`}</span>
                  {product?.discount !== 0
                    && (
                      <span className="product-card__discount">
                        {`$${newPrice}`}

                      </span>
                    )}
                </div>

                {product
                  && (
                    <div className="product-details__actions-button">
                      <AddToCartButton
                        product={product}
                        size="big"
                      />
                      <LikeButton
                        product={product}
                        size="big"
                      />
                    </div>
                  )}

                <div className="product-details__features">
                  <ul className="product-details__list">
                    {featuresLong.keys.slice(0, 4).map((key) => (
                      <li key={key} className="product-details__key">
                        {key}
                      </li>
                    ))}
                  </ul>

                  <ul className="product-details__list">
                    {featuresLong.values.slice(0, 4).map((value) => (
                      <li key={value} className="product-details__value">
                        {value}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="product-details__botom">
              {selectedProduct && (
                <div
                  className="product-details__description"
                  data-cy="productDescription"
                >
                  <h2 className="product-details__subtitle">About</h2>

                  <div className="product-details__text">
                    {selectedProduct.description}
                  </div>
                </div>
              )}

              <div className="product-details__tech-specs">
                <h2 className="product-details__subtitle">Tech specs</h2>
                <div className="product-details__features">
                  <ul className="product-details__list">
                    {featuresLong.keys.map((key) => (
                      <li key={key} className="product-details__key">
                        {key}
                      </li>
                    ))}
                  </ul>

                  <ul className="product-details__list">
                    {featuresLong.values.map((value) => (
                      <li key={value} className="product-details__value">
                        {value}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <ProductsSlider
            title="You may also like"
            products={getRecommendations(products, productCategory, productId)}
          />
        </div>
      )}
    </div>
  );
};
