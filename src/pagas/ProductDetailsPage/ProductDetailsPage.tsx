import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import { getProductDetails } from '../../helpers/fetchClient';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { Loader } from '../../components/Loader';
import { HotPhones } from '../../components/HotPhones';
import { getProducts } from '../../api';

import './ProductDetailsPage.scss';

export const getProductById = (products: Product[], id: string) => {
  return products.find(product => product.id === id);
};

export const PRODUCTS_COLORS: { [color:string]: string } = {
  black: '#4C4C4C',
  rosegold: '#FED0C6',
  gold: '#FCDBC1',
  silver: '#F0F0EE',
  spacegray: '#8D8D92',
  green: '#A3EACC',
  yellow: '#FEE870',
  white: '#F0F0F0',
  purple: '#EDE1F9',
  red: '#C91C38',
  coral: '#FF7F50',
  midnightgreen: '#5F7170',
};

const isProductDetails = (value: unknown): value is ProductDetails => {
  if (
    typeof value === 'object'
    && value !== null
    && 'id' in value
    && 'namespaceId' in value
    && 'name' in value
    && 'capacityAvailable' in value
    && 'capacity' in value
    && 'priceRegular' in value
    && 'priceDiscount' in value
    && 'colorsAvailable' in value
    && 'color' in value
    && 'images' in value
    && 'description' in value
    && 'screen' in value
    && 'resolution' in value
    && 'processor' in value
    && 'ram' in value
    && 'camera' in value
    && 'zoom' in value
    && 'cell' in value
  ) {
    const { description } = value as ProductDetails;

    if (
      Array.isArray(description)
      && description.every(
        item => 'title' in item && 'text' in item && Array.isArray(item.text),
      )
    ) {
      return true;
    }
  }

  return false;
};

export const ProductDetailsPage = () => {
  const { productId } = useParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadError, setIsLoadError] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    let isMounted = true;

    if (productId) {
      setIsLoading(true);

      getProductDetails(productId)
        .then((response) => {
          if (isProductDetails(response)) {
            if (isMounted) {
              setProduct(response as ProductDetails);
              setCurrentImage(response.images[0]);
            }
          }
        })
        .catch(() => {
          if (isMounted) {
            setIsLoadError(true);
          }
        })
        .finally(() => {
          if (isMounted) {
            setIsLoading(false);
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [productId]);

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then(setProducts)
      .catch(() => {
        setIsLoadError(true);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, []);

  const productInList = product ? getProductById(products, product.id) : null;

  const suggestedProducts = useMemo(() => {
    return products.filter(item => {
      return item.type === productInList?.type
        && item.capacity === productInList?.capacity;
    });
  }, [products, productInList]);

  if (!product) {
    return (
      <>
        {isLoading && <Loader />}
        {isLoadError && <p>Error loading product details.</p>}
      </>
    );
  }

  if (!product) {
    return (
      <>
        {isLoading && <Loader />}
      </>
    );
  }

  const url = '../img/phones/';

  return (
    <>
      <div className="ProductDetailsPage">
        {isLoading && <Loader />}

        {!isLoadError && isLoading && product && (
          <>
            <BreadCrumbs product={product} />
            <h1 className="ProductDetailsPage__title">{product?.name}</h1>
            <section className="ProductDetailsPage__content">
              <div className="ProductDetailsPage__content-imgs-wrapper">
                <div className="ProductDetailsPage__images">
                  {product?.images.map(image => (
                    <button
                      key={image}
                      type="button"
                      className={cn('ProductDetailsPage__images-button', {
                        'image-active': image === currentImage,
                      })}
                      onClick={() => setCurrentImage(image)}
                    >
                      <img
                        src={`${url}${image}`}
                        alt={product?.namespaceId}
                        className="ProductDetailsPage__images-item"
                      />
                    </button>
                  ))}

                </div>

                <div
                  className="ProductDetailsPage__current-image"
                  key={Math.random()}
                >
                  <img
                    src={`${url}${currentImage}`}
                    alt={product?.namespaceId}
                    className="ProductDetailsPage__current-image-item"
                  />
                </div>
              </div>

              <div className="ProductDetailsPage__actions">
                <div className="ProductDetailsPage__options">
                  <p className="ProductDetailsPage__options-title">
                    Available colors
                  </p>

                  <ul className="ProductDetailsPage__options-list">
                    {product?.colorsAvailable.map(colorValue => (
                      <li
                        key={colorValue}
                        className={cn('ProductDetailsPage__options-color', {
                          'color-option-active':
                            product?.color === colorValue,
                        })}
                      >
                        <Link
                          style={{
                            backgroundColor: PRODUCTS_COLORS[colorValue],
                          }}
                          to={`/phones/${product?.namespaceId}/${product?.capacity.toLowerCase()}/${colorValue}`}
                          className="ProductDetailsPage__options-color-link"
                        />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="ProductDetailsPage__options">
                  <p className="ProductDetailsPage__options-title">
                    Select capacity
                  </p>

                  <ul className="ProductDetailsPage__options-list">
                    {product?.capacityAvailable.map(capValue => (
                      <li
                        key={capValue}
                        className={cn(
                          'ProductDetailsPage__options-cap', {
                            'capacity-option-active':
                              product?.capacity === capValue,
                          },
                        )}
                      >
                        <Link
                          to={`/phones/${product?.namespaceId}-${capValue.toLowerCase()}-${product?.color}`}
                          className="ProductDetailsPage__options-cap-link"
                        >
                          {capValue}
                        </Link>
                      </li>
                    ))}
                  </ul>

                </div>

                <div className="ProductDetailsPage__prices">
                  <span className="ProductDetailsPage__prices-now">
                    {`$${product?.priceRegular}`}
                  </span>

                  <span className="ProductDetailsPage__prices-before">
                    {`$${product?.priceDiscount}`}
                  </span>
                </div>

                <div className="ProductDetailsPage__info">
                  <div className="ProductDetailsPage__info-container">
                    <span className="ProductDetailsPage__info-title">
                      Screen
                    </span>
                    <span
                      className="ProductDetailsPage__info-specification"
                    >
                      {product?.screen}
                    </span>
                  </div>

                  <div className="ProductDetailsPage__info-container">
                    <span className="ProductDetailsPage__info-title">
                      Resolution
                    </span>
                    <span
                      className="ProductDetailsPage__info-specification"
                    >
                      {product?.resolution}
                    </span>
                  </div>

                  <div className="ProductDetailsPage__info-container">
                    <span className="ProductDetailsPage__info-title">
                      Processor
                    </span>
                    <span
                      className="ProductDetailsPage__info-specification"
                    >
                      {product?.processor}
                    </span>
                  </div>

                  <div className="ProductCard__info-container">
                    <span className="ProductDetailsPage__info-title">
                      RAM
                    </span>
                    <span
                      className="ProductDetailsPage__info-specification"
                    >
                      {product?.ram}
                    </span>
                  </div>
                </div>
              </div>

              <div className="ProductDetailsPage__id">
                <p>{`ID: ${productInList?.id}`}</p>
              </div>
            </section>
            <section className="ProductDetailsPage__more">
              <div className="ProductDetailsPage__more-about">
                <div className="ProductDetailsPage__more-title">
                  <h2 className="ProductDetailsPage__more-title-item">
                    About
                  </h2>
                </div>

                {product?.description.map(item => (
                  <article
                    key={item.title}
                    className="ProductDetailsPage__more-about-article"
                  >
                    <h3
                      className="ProductDetailsPage__more-about-art-title"
                    >
                      {item.title}
                    </h3>

                    <p
                      className="ProductDetailsPage__more-about-art-info"
                      data-cy="productDescription"
                    >
                      {item.text}
                    </p>
                  </article>
                ))}
              </div>

              <div className="ProductDetailsPage__more-tech">
                <div className="ProductDetailsPage__more-title">
                  <h2 className="ProductDetailsPage__more-title-item">
                    Tech specs
                  </h2>
                </div>

                <div className="ProductDetailsPage__more-tech-content">
                  <div className="ProductDetailsPage__more-tech-wrap">
                    <p className="ProductDetailsPage__more-tech-property">
                      Screen
                    </p>
                    <p className="ProductDetailsPage__more-tech-value">
                      {product?.screen}
                    </p>
                  </div>

                  <div className="ProductDetailsPage__more-tech-wrap">
                    <p className="ProductDetailsPage__more-tech-property">
                      Resolution
                    </p>
                    <p className="ProductDetailsPage__more-tech-value">
                      {product?.resolution}
                    </p>
                  </div>

                  <div className="ProductDetailsPage__more-tech-wrap">
                    <p className="ProductDetailsPage__more-tech-property">
                      Processor
                    </p>
                    <p className="ProductDetailsPage__more-tech-value">
                      {product?.processor}
                    </p>
                  </div>

                  <div className="ProductDetailsPage__more-tech-wrap">
                    <p className="ProductDetailsPage__more-tech-property">
                      RAM
                    </p>
                    <p className="ProductDetailsPage__more-tech-value">
                      {product?.ram}
                    </p>
                  </div>

                  <div className="ProductDetailsPage__more-tech-wrap">
                    <p className="ProductDetailsPage__more-tech-property">
                      Built in memory
                    </p>
                    <p className="ProductDetailsPage__more-tech-value">
                      {product?.capacity}
                    </p>
                  </div>

                  <div className="ProductDetailsPage__more-tech-wrap">
                    <p className="ProductDetailsPage__more-tech-property">
                      Camera
                    </p>
                    <p className="ProductDetailsPage__more-tech-value">
                      {product?.camera}
                    </p>
                  </div>

                  <div className="ProductDetailsPage__more-tech-wrap">
                    <p className="ProductDetailsPage__more-tech-property">
                      Zoom
                    </p>
                    <p className="ProductDetailsPage__more-tech-value">
                      {product?.zoom}
                    </p>
                  </div>

                  <div
                    className="ProductDetailsPage__more-tech-wrap"
                  >
                    <p className="ProductDetailsPage__more-tech-property">
                      Cell
                    </p>
                    <p className="ProductDetailsPage__more-tech-value">
                      {product?.cell.join(', ')}
                    </p>
                  </div>
                </div>

              </div>
            </section>
            <HotPhones phones={suggestedProducts} />
          </>
        )}
      </div>
    </>
  );
};
