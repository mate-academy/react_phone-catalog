import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { getProductDetails, getProducts } from '../../api/productsApi';
import { ProductDetails } from '../../types/ProductDetails';
import './ProductDetailsPage.scss';
import { Loader } from '../../components/Loader';
import { BreadCrambs } from '../../components/BreadCrambs';
import { PRODUCTS_COLORS } from '../../helpers/typesColor';
import { Product } from '../../types/Product';
import { ProductsSlider } from '../../components/ProductsSlider';
import { BackButton } from '../../components/BackButton';
import { ButtonFavorites } from '../../components/ButtonFavorites';
import { ButtonAddCard } from '../../components/ButtonAddCard';
import { NotFoundPage } from '../NotFoundPage';

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/';

const getProductById = (products: Product[], id: string) => {
  return products.find(product => product.itemId === id);
};

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentImg, setCurrentImg] = useState('');

  useEffect(() => {
    if (productId) {
      setIsLoading(true);
      getProductDetails(productId)
        .then((response) => {
          setProduct(response);
          setCurrentImg(response.images[0]);
        })
        .catch(() => {
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [productId]);

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then(setProducts)
      .catch(() => {
        setIsLoading(true);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, []);

  const activeProduct = product
    ? getProductById(products, product.id)
    : null;

  const suggestedProducts = useMemo(() => {
    return products.filter(item => {
      return item.category === activeProduct?.category
        && item.capacity === activeProduct?.capacity;
    });
  }, [products, activeProduct]);

  if (!product) {
    return (
      <>
        {isLoading && <Loader />}
        {!isLoading && <NotFoundPage />}
      </>
    );
  }

  const {
    name,
    images,
    namespaceId,
    colorsAvailable,
    color,
    capacity,
    capacityAvailable,
    priceDiscount,
    priceRegular,
    screen,
    resolution,
    processor,
    ram,
    description,
    camera,
    zoom,
    cell,
  } = product;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="productDetails">
          <BreadCrambs product={product} />
          <BackButton />

          {isError && (
            <p>
              Error: Unable to load data from server!
            </p>
          )}

          {!isError && (
            <>
              <h1 className="productDetails__title">{name}</h1>

              <section className="productDetails__content">
                <div className="productDetails__content--img-container">
                  <div className="productDetails__images">
                    {images.map(image => (
                      <button
                        className={
                          classNames('productDetails__images--btn', {
                            'img-active': image === currentImg,
                          })
                        }
                        type="button"
                        key={image}
                        onClick={() => setCurrentImg(image)}
                      >
                        <img
                          src={`${BASE_URL}${image}`}
                          alt={namespaceId}
                          className="productDetails__images--item"
                        />
                      </button>
                    ))}
                  </div>
                  <div className="productDetails__current--img">
                    <img
                      key={Math.random()}
                      src={`${BASE_URL}${currentImg}`}
                      alt={namespaceId}
                      className="productDetails__current--img-item"
                    />
                  </div>
                </div>

                <div className="productDetails__actions">
                  <div className="productDetails__options">
                    <p className="productDetails__options--title">
                      Available colors
                    </p>

                    <ul className="productDetails__options--list">
                      {colorsAvailable.map(colValue => (
                        <li
                          key={colValue}
                          className={classNames(
                            'productDetails__options--color', {
                              'color-active': color === colValue,
                            },
                          )}
                        >
                          <Link
                            className="productDetails__options--color-link"
                            to={`/phones/${namespaceId}-${capacity.toLowerCase()}-${colValue}`}
                            style={{
                              backgroundColor: PRODUCTS_COLORS[colValue],
                            }}
                          />
                        </li>
                      ))}
                    </ul>

                  </div>

                  <div className="productDetails__options">
                    <p className="productDetails__options--title">
                      Select capacity
                    </p>
                    <ul className="productDetails__options--list">
                      {capacityAvailable.map(capValue => (
                        <li
                          key={capValue}
                          className={classNames(
                            'productDetails__options--cap', {
                              'cap-active': capacity === capValue,
                            },
                          )}
                        >
                          <Link
                            className={classNames(
                              'productDetails__options--cap-link', {
                                'cap-active': capacity === capValue,
                              },
                            )}
                            to={`/phones/${namespaceId}-${capValue.toLowerCase()}-${color}`}
                          >
                            {capValue}
                          </Link>

                        </li>
                      ))}
                    </ul>

                  </div>

                  <div className="productDetails__price">
                    <span className="productDetails__price--discont">
                      {`$${priceDiscount}`}
                    </span>
                    <span className="productDetails__price--regular">
                      {`$${priceRegular}`}
                    </span>
                  </div>

                  {activeProduct && (
                    <div className="productDetails__buttons">
                      <ButtonAddCard product={activeProduct} />
                      <ButtonFavorites product={activeProduct} />
                    </div>
                  )}

                  <div className="productDetails__info">
                    <div className="productDetails__info--container">
                      <span className="productDetails__info--title">
                        Screen
                      </span>
                      <span className="productDetails__info--description">
                        {screen}
                      </span>
                    </div>

                    <div className="productDetails__info--container">
                      <span className="productDetails__info--title">
                        Resolution
                      </span>
                      <span className="productDetails__info--description">
                        {resolution}
                      </span>
                    </div>

                    <div className="productDetails__info--container">
                      <span className="productDetails__info--title">
                        Processor
                      </span>
                      <span className="productDetails__info--description">
                        {processor}
                      </span>
                    </div>

                    <div className="productDetails__info--container">
                      <span className="productDetails__info--title">
                        RAM
                      </span>
                      <span className="productDetails__info--description">
                        {ram}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="productDetails__id">
                  <p>{`ID: ${activeProduct?.id}`}</p>
                </div>
              </section>

              <section className="productDetails__details">
                <div className="productDetails__details--about">
                  <div className="productDetails__details--title">
                    <h2 className="productDetails__details--title-item">
                      About
                    </h2>
                  </div>

                  {description?.map(item => (
                    <article
                      className="productDetails__details--about-info"
                      key={item.title}
                    >
                      <h3
                        className="productDetails__details--about-title"
                      >
                        {item.title}
                      </h3>
                      <p
                        className="productDetails__details--about-text"
                        data-cy="productDescription"
                      >
                        {item.text}
                      </p>

                    </article>
                  ))}
                </div>

                <div className="productDetails__details--tech">
                  <div className="productDetails__details--title">
                    <h2 className="productDetails__details--title-item">
                      Tech specs
                    </h2>
                  </div>
                  <div className="productDetails__details--tech-content">
                    <div className="productDetails__details--tech-wrap">
                      <p className="productDetails__details--tech-title">
                        Screen
                      </p>
                      <p className="productDetails__details--tech-value">
                        {screen}
                      </p>
                    </div>
                    <div className="productDetails__details--tech-wrap">
                      <p className="productDetails__details--tech-title">
                        Resolution
                      </p>
                      <p className="productDetails__details--tech-value">
                        {resolution}
                      </p>
                    </div>
                    <div className="productDetails__details--tech-wrap">
                      <p className="productDetails__details--tech-title">
                        Processor
                      </p>
                      <p className="productDetails__details--tech-value">
                        {processor}
                      </p>
                    </div>

                    <div className="productDetails__details--tech-wrap">
                      <p className="productDetails__details--tech-title">
                        RAM
                      </p>
                      <p className="productDetails__details--tech-value">
                        {ram}
                      </p>
                    </div>

                    <div className="productDetails__details--tech-wrap">
                      <p className="productDetails__details--tech-title">
                        Built in memory
                      </p>
                      <p className="productDetails__details--tech-value">
                        {capacity}
                      </p>
                    </div>

                    <div className="productDetails__details--tech-wrap">
                      <p className="productDetails__details--tech-title">
                        Camera
                      </p>
                      <p className="productDetails__details--tech-value">
                        {camera}
                      </p>
                    </div>

                    <div className="productDetails__details--tech-wrap">
                      <p className="productDetails__details--tech-title">
                        Zoom
                      </p>
                      <p className="productDetails__details--tech-value">
                        {zoom}
                      </p>
                    </div>

                    <div className="productDetails__details--tech-wrap">
                      <p className="productDetails__details--tech-title">
                        Cell
                      </p>
                      <p className="productDetails__details--tech-value">
                        {cell?.join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <ProductsSlider
                products={suggestedProducts}
                title="You may also like"
                isError={isError}
                isLoading={isLoading}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};
