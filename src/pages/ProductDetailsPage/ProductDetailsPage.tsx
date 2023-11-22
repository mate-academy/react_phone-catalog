import './ProductDetailsPage.scss';

import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { MAIN_URL, getProductDetails } from '../../helpers/api';
import { Loader } from '../../components/Loader';
import { Actions } from '../../components/Actions';
import { Product } from '../../types/Product';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Back } from '../../components/Back';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { ProductsContext } from '../../contexts/ProductsContext';
// import { ProductDetails } from '../../types/ProductDetails';

export const ProductDetailsPage = () => {
  // eslint-disable-next-line max-len
  const [productDetails, setProductDetails] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const { productId } = useParams();
  const { products } = useContext(ProductsContext);
  const hasProductDetails = !!Object.values(productDetails).length;
  const {
    name,
    screen,
    resolution,
    processor,
    ram,
    capacity,
    camera,
    zoom,
    cell,
    description,
    images = [],
    priceDiscount,
    priceRegular,
  } = productDetails;

  const specifications = {
    screen,
    resolution,
    processor,
    ram,
  };

  const extendedSpecifications = {
    ...specifications,
    'built in memory': capacity,
    camera,
    zoom,
    cell,
  };

  const product = products.find(item => item.itemId === productId);

  useEffect(() => {
    if (!productId) {
      return;
    }

    setIsLoading(true);

    getProductDetails(productId)
      .then(data => {
        setProductDetails(data);
        setHasError(false);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [productId]);

  const specificationsList = (specs: typeof specifications) => {
    return Object.entries(specs).map(spec => (
      <li key={spec[0]} className="ProductDetailsPage__spec">
        <span className="ProductDetailsPage__spec-name">
          {spec[0] !== 'ram' ? spec[0] : spec[0].toUpperCase()}
        </span>

        <span className="ProductDetailsPage__spec-value">
          {spec[0] !== 'cell' ? spec[1] : spec[1].join(', ')}
        </span>
      </li>
    ));
  };

  const getSuggestedProducts = (productsCount: number) => {
    const generateIndex = () => Math.floor(Math.random() * products.length);
    const result: Product[] = [];

    for (let i = 0; i < productsCount; i += 1) {
      let index = generateIndex();

      while (result.includes(products[index])) {
        index = generateIndex();
      }

      result.push(products[index]);
    }

    return result;
  };

  return (
    <div className="ProductDetailsPage">
      {isLoading && <Loader />}

      {!isLoading && hasError && (
        <div className="ProductDetailsPage__details-not-found title">
          Phone was not found
        </div>
      )}

      {!isLoading && !hasError && hasProductDetails && (
        <>
          <div className="ProductDetailsPage__breadcrumbs-wrapper">
            <BreadCrumbs />
          </div>

          <div className="ProductDetailsPage__back-wrapper">
            <Back />
          </div>

          <h1 className="ProductDetailsPage__title">
            {name}
          </h1>

          <div className="ProductDetailsPage__details">
            <div className="ProductDetailsPage__images">
              <div className="ProductDetailsPage__small-images">
                {images.map((url: string, index: number) => (
                  <button
                    type="button"
                    key={url}
                    className={classNames('ProductDetailsPage__image-wrapper', {
                      // eslint-disable-next-line max-len
                      'ProductDetailsPage__image-wrapper--active': index === activeImage,
                    })}
                    onClick={() => setActiveImage(index)}
                  >
                    <img
                      src={`${MAIN_URL}/${url}`}
                      alt={String(index)}
                      className="ProductDetailsPage__image"
                    />
                  </button>
                ))}
              </div>

              <div className="ProductDetailsPage__big-image-wrapper">
                <img
                  src={`${MAIN_URL}/${images[activeImage]}`}
                  alt="Big"
                  className="ProductDetailsPage__image"
                />
              </div>
            </div>

            <div className="ProductDetailsPage__info">
              <div className="ProductDetailsPage__price price">
                <span
                  className="price__discount price__discount--font-size--32px"
                >
                  &#36;
                  {priceDiscount}
                </span>

                <span className="price__full">
                  &#36;
                  {priceRegular}
                </span>
              </div>

              <div className="ProductDetailsPage__actions-wrapper">
                <Actions product={product} />
              </div>

              <ul
                className="
                  ProductDetailsPage__specs
                  ProductDetailsPage__specs--12px-600
                "
              >
                {specificationsList(specifications)}
              </ul>
            </div>

            <div data-cy="productDescription">
              <h2 className="ProductDetailsPage__subtitle">
                About
              </h2>

              <div className="ProductDetailsPage__about">
                {description.map((item: { title: string, text: string[] }) => {
                  return item.text.map(text => <p key={text}>{text}</p>);
                })}
              </div>
            </div>

            <div>
              <h2 className="ProductDetailsPage__subtitle">
                Tech specs
              </h2>

              <ul className="ProductDetailsPage__specs">
                {specificationsList(extendedSpecifications)}
              </ul>
            </div>
          </div>

          <ProductsSlider
            sliderTitle="You may also like"
            products={getSuggestedProducts(10)}
          />
        </>
      )}
    </div>
  );
};
