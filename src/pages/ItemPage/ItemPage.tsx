import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { AppContext } from '../../context/AppContextProvider';
import { Product } from '../../types/Product';
import { DetailedProduct } from '../../types/DetailedProduct';
import { colors, ColorsType } from '../../types/Colors';
import { TechnicalSpecifications } from '../../types/TechSpecification';
import { SortType } from '../../types/SortType';
import { ProductPrice } from '../../components/ProductPrice/ProductPrice';
import { PropertyList } from '../../components/PropertyList/PropertyList';
import { getProductById } from '../../api/fetchData';
import { Loader } from '../../components/Loader';
import { SecondNavBar } from '../../components/SecondNavBar/SecondNavBar';
/* eslint-disable-next-line */
import { ButtonAddToCart } from '../../components/ButtonAddToCart/ButtonAddToCart';
import { SlickSlider } from '../../components/SlickSlider/SlickSlider';
import './itemPage.scss';

const calcValueSpecification = (
  product: DetailedProduct,
  spec: string,
) => {
  const specValue = product[spec.toLowerCase() as keyof DetailedProduct];

  return Array.isArray(specValue) ? specValue.join(', ') : specValue;
};

const navigateTo = (
  pathname: string,
  paramOld: string,
  paramNew: string,
) => {
  const newLink = pathname.replace(
    paramOld.toLowerCase(),
    paramNew.toLowerCase(),
  );

  return `${newLink}`;
};

const chooseProperties = (product: DetailedProduct) => {
  const {
    screen,
    resolution,
    processor,
    ram,
  } = product;

  const properties = {
    screen,
    resolution,
    processor,
    ram,
  };

  return properties;
};

const bgrColor = (colorName: string) => {
  return colors[colorName as keyof ColorsType];
};

const findProductById = (id = '', products: Product[]) => {
  return products.find((product) => product.itemId === id);
};

export type Props = {
  products: Product[],
};

export const ItemPage: React.FC<Props> = ({ products }) => {
  const [product, setProduct] = useState<DetailedProduct | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mainImg, setMainImg] = useState(product?.images[0]);

  const { pathname } = useLocation();
  const { itemId = '' } = useParams();
  const { favorites, cart, isProductSelected } = useContext(AppContext);

  const isProductSelectedinFav = isProductSelected(
    product?.id || '', favorites,
  );
  const isProductSelectedinCart = isProductSelected(product?.id || '', cart);
  const selectedItem = findProductById(product?.id, products);
  const isProductFind = product && selectedItem;

  const [error, setError] = useState('');

  async function loadProductById(productId: string) {
    setIsLoading(true);

    try {
      const detailedPproductFromServer = await getProductById(productId);

      setProduct(detailedPproductFromServer);
      setMainImg(detailedPproductFromServer.images[0]);
    } catch {
      setError('Product not found');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProductById(itemId);
  }, [itemId]);

  const onChangeImage = (img: string) => {
    setMainImg(img);
  };

  return (
    <div className="page__item">
      {isLoading && (
        <div className="product-details__loader">
          <Loader />
        </div>
      )}

      {!isLoading && isProductFind && (
        <>
          <SecondNavBar />

          <div className="product-details__back">
            <Link to="/" className="product-details__link-back">Back</Link>
          </div>

          <div className="product-details">
            <h1 className="product-details__title">{product.name}</h1>
            <div className="product-details__row">
              <div className="product-details__content">
                {product.images && (
                  <div className="product-details__images-container">
                    <div className="image-list">
                      {product.images.map(img => (
                        <button
                          type="button"
                          className="image-list__box"
                          onClick={() => onChangeImage(img)}
                        >
                          <img
                            key={img}
                            alt="product"
                            src={`${img}`}
                            className={classNames(
                              'image image_small',
                              { active: img === mainImg },
                            )}
                          />
                        </button>
                      ))}
                    </div>
                    <div className="image__box">
                      <img
                        alt="product main"
                        src={`${mainImg}`}
                        className="image image_main"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="product-details__action">
                <div className="product-details__select">
                  <div className="colors">
                    <h3 className="colors__title">Available colors</h3>
                    <div className="colors__list">
                      {product.colorsAvailable.map(color => (
                        <Link
                          key={color}
                          to={{
                            pathname: `${navigateTo(pathname, product.color, color)}`,
                          }}
                          style={{ background: `${bgrColor(color)}` }}
                          className={classNames(
                            'button button_circle',
                            { active: product.color === color },
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="product-details__select">
                  <div className="capacity">
                    <h3 className="capacity__title capacity__title">
                      Select capacity
                    </h3>
                    <div className="capacity__list">
                      {product.capacityAvailable.map(capacity => (
                        <Link
                          key={capacity}
                          to={{
                            pathname: `${navigateTo(pathname, product.capacity, capacity)}`,
                          }}
                          className={classNames(
                            'button button_square',
                            { active: product.capacity === capacity },
                          )}
                        >
                          {capacity}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <ProductPrice
                  regularPrice={product.priceRegular}
                  discountPrice={product.priceDiscount}
                />
                <ButtonAddToCart
                  product={selectedItem}
                  isProductInFav={isProductSelectedinFav}
                  isProductInCart={isProductSelectedinCart}
                />
                <PropertyList properties={chooseProperties(product)} />
              </div>
            </div>
            <div className="product-details__row">
              <div className="product-details__section">
                <h2 className="product-details__subtitle">About</h2>
                <div data-cy="productDescription" className="description">
                  {product.description && (
                    product.description.map(description => (
                      <div
                        key={description.title}
                        className="description__item"
                      >
                        <h3 className="description__title">
                          {description.title}
                        </h3>
                        <p className="description__text">
                          {description.text}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="product-details__section">
                <h2 className="product-details__subtitle">Tech specs</h2>
                <div className="tech-specifications">
                  {Object.keys(TechnicalSpecifications).map(spec => (
                    <div key={spec} className="tech-specifications__item">
                      <p className="tech-specifications__text">
                        {spec}
                      </p>
                      <p className={classNames(
                        'tech-specifications__text',
                        'tech-specifications__text--bold',
                      )}
                      >
                        {calcValueSpecification(product, spec)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {error && !isProductFind && (
        <p className="page__title">Product not found</p>
      )}

      {!isLoading && (
        <section className="section">
          <h1 className="section__title">You may also like</h1>
          <SlickSlider
            products={products}
            sortBy={SortType.Random}
          />
        </section>
      )}
    </div>
  );
};
