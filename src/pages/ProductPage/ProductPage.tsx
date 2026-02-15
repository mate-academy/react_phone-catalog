import './ProductPage.scss';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import * as fullProductService from '../../api/fullProducts';
import * as productService from '../../api/products';
import { FullProduct } from '../../types/FullProduct';
import { Loader } from '../../components/Loader';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Product } from '../../types/Product';
import { SuggestedProducts } from '../../components/SuggestedProducts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { actions as likedActions } from '../../features/likedProducts';
// eslint-disable-next-line max-len
import { actions as AddToCartActions } from '../../features/addedToCartProducts';

export const ProductPage = () => {
  const [product, setProduct] = useState<FullProduct>();
  const [recomendedProduct, setRecomendedProduct] = useState<Product[]>();
  const [productsData, setProductsData] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isProductLoading, setProductIsLoading] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorProducts, setErrorProducts] = useState<string>('');

  const { productId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [selectedImg, setSelectedImg] = useState(product?.images[0]);

  const selectedProductId = productId ?? null;
  const [, productType] = pathname.split('/');

  useEffect(() => {
    setIsLoading(true);

    if (!selectedProductId) {
      setErrorMessage('Page not found');
      setIsLoading(false);

      return;
    }

    switch (productType) {
      case 'phones':
        fullProductService
          .getPhones()
          .then(data => {
            if (!data) {
              throw new Error('No data received');
            }

            const phones = data.find(phone => phone.id === selectedProductId);

            if (!phones) {
              throw new Error('Product not found');
            }

            setProduct(phones);
          })
          .catch(() => setErrorMessage('Something went wrong'))
          .finally(() => setIsLoading(false));
        break;

      case 'tablets':
        fullProductService
          .getTablets()
          .then(data => {
            if (!data) {
              throw new Error('No data received');
            }

            const tablets = data.find(
              tablet => tablet.id === selectedProductId,
            );

            if (!tablets) {
              throw new Error('Product not found');
            }

            setProduct(tablets);
          })
          .catch(() => {
            setErrorMessage('something went wrong');
          })
          .finally(() => setIsLoading(false));
        break;

      case 'accessories':
        fullProductService
          .getAccessories()
          .then(data => {
            if (!data) {
              throw new Error('No data received');
            }

            const accessories = data.find(
              accessore => accessore.id === selectedProductId,
            );

            if (!accessories) {
              throw new Error('Product not found');
            }

            setProduct(accessories);
          })
          .catch(() => {
            setErrorMessage('something went wrong');
          })
          .finally(() => setIsLoading(false));
        break;

      default:
        break;
    }
  }, [selectedProductId]);

  useEffect(() => {
    if (product?.images.length) {
      setSelectedImg(product.images[0]);
    }
  }, [product]);

  const getSuggestedProducts = (products: Product[]) => {
    if (!products) {
      throw new Error();
    }

    const suggestedProducts = [...products]
      .filter(ch => ch.category === productType)
      .filter(ch => ch.capacity === product?.capacity);

    if (!suggestedProducts) {
      throw new Error();
    }

    setRecomendedProduct(suggestedProducts);
  };

  useEffect(() => {
    setProductIsLoading(true);

    productService
      .getProducts()
      .then(data => {
        getSuggestedProducts(data);
        setProductsData(data);
      })
      .catch(error => setErrorProducts(`Something went wrong ${error}`))
      .finally(() => setProductIsLoading(false));
  }, [product, productType]);

  function goBack() {
    return navigate(-1);
  }

  const formatColorName = (color: string) => {
    const formattedColor = color
      .replace(/^(midnight|space|sierra|sky)/, '')
      .trim();

    const colorMap: Record<string, string> = {
      midnight: '#111',
      graphite: '#666',
      rosegold: 'pink',
      'rose gold': 'pink',
      starlight: 'beige',
    };

    return colorMap[color] || formattedColor;
  };

  const handleColorChange = (newColor: string) => {
    if (!product) {
      return;
    }

    const newProductId: string = `${product.namespaceId}-${product.capacity.toLowerCase()}-${newColor.replace(/\s/g, '-')}`;

    navigate(`/${productType}/${newProductId}`);
  };

  const handleCapacityChange = (capacity: string) => {
    if (!product) {
      return;
    }

    const newProductId: string = `${product.namespaceId}-${capacity.toLowerCase()}-${product.color.replace(' ', '-')}`;

    navigate(`/${productType}/${newProductId}`);
  };

  const dispatch = useDispatch();
  const likedProducts = useSelector((state: RootState) => state.likedProducts);
  const addedToCartProducts = useSelector(
    (state: RootState) => state.addedToCartProducts,
  );

  const likedProduct = likedProducts.find(
    likeToProduct => likeToProduct.itemId === product?.id,
  );
  const addedToCartProduct = addedToCartProducts.find(
    cartProduct => cartProduct.itemId === product?.id,
  );

  const handleLikeClick = (fullProduct: FullProduct) => {
    if (!likedProduct) {
      const likeProductClick = productsData?.find(
        productData => productData.itemId === fullProduct.id,
      );

      if (!likeProductClick) {
        return;
      }

      dispatch(likedActions.add(likeProductClick));
    } else {
      dispatch(likedActions.deleteOne(fullProduct.id));
    }
  };

  const handleAddToCartClick = (fullProduct: FullProduct) => {
    if (!addedToCartProduct) {
      const productCartClick = productsData?.find(
        productData => productData.itemId === fullProduct.id,
      );

      if (!productCartClick) {
        return;
      }

      dispatch(AddToCartActions.add(productCartClick));
    } else {
      dispatch(AddToCartActions.deleteOne(fullProduct.id));
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : errorMessage ? (
        <ErrorMessage message={errorMessage} />
      ) : (
        <div className="productPage">
          <div className="productPage__top">
            <nav className="productPage__nav">
              <Link to={'/'} className="nav__home" />
              <div className="nav__next-step" />
              <p className="nav__title nav__title--category">
                {productType.charAt(0).toUpperCase() + productType.slice(1)}
              </p>
              <div className="nav__next-step" />
              <p className="nav__title">{product?.name}</p>
            </nav>

            <p className="productPage__back" onClick={goBack}>
              <span className="productPage__back-icon" />
              Back
            </p>

            <h1 className="productPage__title">{product?.name}</h1>

            <div className="productPage__product">
              <div className="pictures-product">
                <ul className="pictures-product__pictures-slides">
                  {product?.images.map(img => (
                    <li
                      className={classNames('pictures-slides__slide', {
                        'pictures-slides__slide--current': img === selectedImg,
                      })}
                      onClick={() => setSelectedImg(img)}
                      key={img}
                    >
                      <img
                        src={img}
                        alt={`${productType} img`}
                        className="pictures-slides__img"
                      />
                    </li>
                  ))}
                </ul>
                <div className="pictures-product__selected">
                  <img
                    src={selectedImg}
                    alt={product?.name}
                    className="selected__picture"
                  />
                </div>
              </div>

              <div className="settings-product">
                <div className="settings-product__color-settings">
                  <p className="color-settings__title">Available colors</p>
                  <ul className="color-settings__color-slides">
                    {product?.colorsAvailable.map(color => {
                      const formattedColor = formatColorName(color);

                      return (
                        <li
                          key={color}
                          className={classNames('color-settings__slide', {
                            'color-settings__slide--current':
                              color === product?.color,
                          })}
                          onClick={() => handleColorChange(color)}
                        >
                          <div
                            className="color-settings__color"
                            style={{
                              backgroundColor: formattedColor,
                            }}
                            title={color}
                          ></div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="settings-product__capacity-settings">
                  <p className="capacity-settings__title">Select capacity</p>
                  <ul className="capacity-settings__capacity-slides">
                    {product?.capacityAvailable.map(capacity => {
                      return (
                        <li
                          key={capacity}
                          className={classNames('capacity-settings__slide', {
                            'capacity-settings__slide--current':
                              capacity === product?.capacity,
                          })}
                          onClick={() => handleCapacityChange(capacity)}
                        >
                          <div className="capacity-settings__capacity">
                            {capacity}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="settings-product__purchase">
                  {product?.priceDiscount ? (
                    <div className="purchase__sale">
                      <p className="purchase__price">{`$${product?.priceDiscount}`}</p>
                      <p className="purchase__price purchase__price--discount">
                        {`$${product?.priceRegular}`}
                      </p>
                    </div>
                  ) : (
                    <p className="purchase__price">{`$${product?.priceRegular}`}</p>
                  )}

                  <div className="purchase__buttons">
                    <button
                      className={classNames('buttons', 'buttons--add-to-cart', {
                        'buttons--add-to-cart--active': addedToCartProduct,
                      })}
                      onClick={() => {
                        if (product) {
                          handleAddToCartClick(product);
                        }
                      }}
                    >
                      {addedToCartProduct ? 'Added to cart' : 'Add to cart'}
                    </button>

                    <button
                      className={classNames('buttons', 'buttons--like', {
                        'buttons--like--active': likedProduct,
                      })}
                      onClick={() => {
                        if (product) {
                          handleLikeClick(product);
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="settings-product__info">
                  <div className="info__category">
                    <p className="info__category--name">Screen</p>
                    <p className="info__category--value">{product?.screen}</p>
                  </div>
                  <div className="info__category">
                    <p className="info__category--name">Resolution</p>
                    <p className="info__category--value">
                      {product?.resolution}
                    </p>
                  </div>
                  <div className="info__category">
                    <p className="info__category--name">Processor</p>
                    <p className="info__category--value">
                      {product?.processor}
                    </p>
                  </div>
                  <div className="info__category">
                    <p className="info__category--name">RAM</p>
                    <p className="info__category--value">{product?.ram}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="productPage__full-info">
            <div className="full-info__about">
              <h2 className="full-info__title">About</h2>
              <div className="full-info__content-about">
                {product?.description.map(describe => (
                  <div className="content-about" key={describe.title}>
                    <h3 className="content-about__title">{describe.title}</h3>
                    <p className="content-about__text">{describe.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="full-info__tech-specs">
              <h2 className="full-info__title">Tech specs</h2>
              <div className="full-info__info-tech">
                <div className="info-tech__category">
                  <p className="info-tech__category--name">Screen</p>
                  <p className="info-tech__category--value">
                    {product?.screen}
                  </p>
                </div>
                <div className="info-tech__category">
                  <p className="info-tech__category--name">Resolution</p>
                  <p className="info-tech__category--value">
                    {product?.resolution}
                  </p>
                </div>
                <div className="info-tech__category">
                  <p className="info-tech__category--name">Processor</p>
                  <p className="info-tech__category--value">
                    {product?.processor}
                  </p>
                </div>
                <div className="info-tech__category">
                  <p className="info-tech__category--name">RAM</p>
                  <p className="info-tech__category--value">{product?.ram}</p>
                </div>
                <div className="info-tech__category">
                  <p className="info-tech__category--name">Built in memory</p>
                  <p className="info-tech__category--value">
                    {product?.capacity}
                  </p>
                </div>
                <div className="info-tech__category">
                  <p className="info-tech__category--name">Camera</p>
                  <p className="info-tech__category--value">
                    {product?.camera}
                  </p>
                </div>
                <div className="info-tech__category">
                  <p className="info-tech__category--name">Zoom</p>
                  <p className="info-tech__category--value">{product?.zoom}</p>
                </div>
                <div className="info-tech__category">
                  <p className="info-tech__category--name">Cell</p>
                  <p className="info-tech__category--value">
                    {product?.cell.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="productPage__recomandation">
            {isProductLoading ? (
              <Loader />
            ) : (
              <SuggestedProducts
                errorMessage={errorProducts}
                sortedProducts={recomendedProduct}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
