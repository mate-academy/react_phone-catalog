/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Breadcrumbs } from '../../Breadcrumbs';
import { getProductDetails } from '../../../api/getProducts';
import { ProductsContext } from '../../ProductProvider';
import { ProductsSlider } from '../../ProductsSlider';
import { Loader } from '../../Loader';
import { BackButton } from '../../BackButton';
import { CartContext } from '../../CartProvider';
import { FavouriteContext } from '../../FavouriteProvider';

export const ProductDetailsPage: React.FC = () => {
  const { products, loading, suggestedProducts } = useContext(ProductsContext);
  const { cart, addToCart } = useContext(CartContext);
  const { favourites, isFavouriteToggle } = useContext(FavouriteContext);
  const { productId } = useParams();
  const product = useMemo(() => {
    return products.find(productItem => productItem.id === productId);
  }, [products, productId]);
  const [productDetails, setProductDetails] = useState<ProductDetails>();
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    try {
      getProductDetails(`${productId}`)
        .then(result => {
          setProductDetails(result);
          setLoadingDetails(true);
        });
    } catch (error) {
      setLoadingDetails(false);
    }
  }, [productId]);

  const techSpecs = {
    Screen: productDetails?.display.screenSize,
    Resolution: productDetails?.display.screenResolution,
    Processor: productDetails?.hardware.cpu,
    Ram: productDetails?.storage.ram,
  };
  const techSpecsList = Object.entries(techSpecs);

  const techSpecsAll = {
    ...techSpecs,
    Bluetooth: productDetails?.connectivity.bluetooth,
    Camera: productDetails?.camera.primary,
    Battery: productDetails?.battery.type,
  };

  const techSpecsAllList = Object.entries(techSpecsAll);

  return (
    <div className="productsDetailsPage">
      <div className="productsDetailsPage__nav">
        <Breadcrumbs />
      </div>

      <BackButton />

      { !loadingDetails || !loading
        ? <Loader />
        : (
          <div className="productsDetailsPage__item">
            { !productDetails
              ? (
                <h1 className="productsDetailsPage__title">
                  {`${product?.type} ${product?.name} was not found`}
                </h1>
              )
              : (
                <>
                  <h1 className="productsDetailsPage__title">
                    {productDetails?.name}
                  </h1>
                  <div className="productsDetailsPage__content">
                    <div className="productsDetailsPage__gallery">
                      <ul className="productsDetailsPage__photos">
                        {productDetails?.images.map((image, index) => (
                          <li
                            key={image}
                            className="productsDetailsPage__photo"
                          >
                            <button
                              type="button"
                              className={classNames(
                                'productsDetailsPage__photo-button',
                                {
                                  'productsDetailsPage__photo-button--isActive':
                              index === activeIndex,
                                },
                              )}
                              onClick={() => setActiveIndex(index)}
                            >
                              <img
                                src={image}
                                alt={productDetails.name}
                                className="productsDetailsPage__photo-image"
                              />
                            </button>
                          </li>
                        ))}
                      </ul>
                      <div className="productsDetailsPage__mainFoto">
                        <img
                          src={productDetails?.images[activeIndex]}
                          alt={productDetails?.name}
                          className="productsDetailsPage__photo-image"
                        />
                      </div>
                    </div>
                    <div className="productsDetailsPage__card">
                      <div className="productsDetailsPage__cardId">
                        ID:
                        {' '}
                        {productDetails?.id}
                      </div>
                      <div className="productsDetailsPage__line" />

                      {product && (
                        <>
                          <div className="productsDetailsPage__cost">
                            <div className="productsDetailsPage__price">
                              {product.discount > 0
                                ? `$${Math.round(product.price - (product.price * (product.discount / 100)))}`
                                : `$${product.price}`}
                            </div>
                            {product.discount > 0 && (
                              <div
                                className="productsDetailsPage__priceInitial"
                              >
                                $
                                {product.price}
                              </div>
                            )}
                          </div>

                          <div
                            className="
                              productCard__buttons
                              productCard__buttons--details"
                          >
                            <button
                              type="button"
                              className={classNames(
                                'productCard__buttonToCart',
                                'productCard__buttonToCart--details',
                                {
                                  'productCard__buttonToCart--inCart':
                              cart.some(item => item.id === product.id),
                                },
                              )}
                              disabled={cart.some(
                                item => item.id === product.id,
                              )}
                              onClick={() => addToCart(product)}
                            >
                              {
                                cart.some(item => item.id === product.id)
                                  ? 'Added to cart'
                                  : 'Add to cart'
                              }
                            </button>
                            <button
                              type="button"
                              className={classNames(
                                'productCard__buttonToFavourites',
                                'productCard__buttonToFavourites--details',
                                {
                                  // eslint-disable-next-line max-len
                                  'productCard__buttonToFavourites--isFavourite':
                              favourites.some(item => item.id === product.id),
                                },
                              )}
                              onClick={() => isFavouriteToggle(product)}
                            />
                          </div>
                        </>
                      )}
                      <div className="
                        productCard__tech-specs
                        productCard__tech-specs--details"
                      >
                        {
                          techSpecsList.map(techItem => (
                            <div
                              className="productCard__tech-specs-item"
                              key={techItem[0]}
                            >
                              <div
                                className="productCard__tech-specs-name"
                              >
                                {techItem[0]}
                              </div>
                              <div className="productCard__tech-specs-value">
                                {techItem[1] || '-'}
                              </div>
                            </div>
                          ))
                        }
                      </div>

                    </div>
                  </div>
                  <div className="productsDetailsPage__content">
                    <div className="productsDetailsPage__about">
                      <h2 className="productsDetailsPage__title-content">
                        About
                      </h2>
                      <div className="productsDetailsPage__line" />
                      <div className="productsDetailsPage__about-text">
                        {productDetails?.description}
                      </div>
                    </div>
                    <div className="productsDetailsPage__techSpecs">
                      <h2 className="productsDetailsPage__title-content">
                        Tech specs
                      </h2>
                      <div className="
                        productsDetailsPage__line
                        productsDetailsPage__line--techSpecs"
                      />
                      <div className="
                        productCard__tech-specs
                        productCard__tech-specs--details"
                      >
                        {
                          techSpecsAllList.map(techItem => (
                            <div
                              className="productCard__tech-specs-item"
                              key={techItem[0]}
                            >
                              <div
                                className="
                                  productCard__tech-specs-name
                                  productCard__tech-specs-name--details"
                              >
                                {techItem[0]}
                              </div>
                              <div className="
                                productCard__tech-specs-value
                                productCard__tech-specs-value--details"
                              >
                                {techItem[1] || '-'}
                              </div>
                            </div>
                          ))
                        }
                      </div>

                    </div>
                  </div>

                  <div className="productsDetailsPage__slider">
                    <ProductsSlider
                      title="You may also like"
                      products={suggestedProducts}
                    />
                  </div>
                </>
              )}

          </div>
        )}
    </div>
  );
};
