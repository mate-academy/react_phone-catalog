import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import cn from 'classnames';
import './ProductDetailsPage.scss';

import { getProducts, getProductDetails } from '../../helpers/api';
import { PRODUCTS_INFO, PRODUCTS_SPECS } from '../../helpers/config';
import ProductsSlider from '../ProductsSlider/ProductsSlider';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { GoBack } from '../GoBack/GoBack';

import ButtonFavor from '../ButtonFavor/ButtonFavor';
import ButtonAddToCart from '../ButtonAddToCart/ButtonAddToCart';

export const ProductDetailsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productInfo, setProductInfo] = useState<Product>();
  const [productDetails, setProductDetails] = useState<ProdactDetails>();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [brandProducts, setBrandProducts] = useState<Product[]>([]);

  const match: Match = useRouteMatch();
  const { productId } = useParams();

  useEffect(() => {
    getProducts().then(data => setBrandProducts(data
      .filter((product: Product) => product.discount === 0)
      .sort((a: Product, b: Product) => a.discount - b.discount)));
  }, []);

  const loadProductDetails = async (goodId: string) => {
    setIsLoading(true);

    try {
      const data = await getProductDetails(goodId);
      const preparedProductDetails = { ...data };

      setProductDetails(preparedProductDetails);
      setIsLoaded(true);
    } catch (error) {
      setErrorMessage('Oops! Reload page, please');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getProducts().then(data => setProducts(data));
    loadProductDetails(productId);
  }, [productId]);

  useEffect(() => {
    if (products.length) {
      const goodInfo = products.find(item => item.id === match.params.productId);

      setProductInfo(goodInfo);
    }
  }, [products, match.params.productId]);

  const handleImages = (e: React.MouseEvent<HTMLElement>, i: number) => {
    e.preventDefault();
    setActiveImageIndex(i);
  };

  const price = useMemo(
    () => (productInfo && productInfo.discount > 0
      ? productInfo.price - ((productInfo.price / 100) * productInfo.discount)
      : productInfo && productInfo.price),
    [productInfo],
  );

  const techInfo = (param: string, order: string) => {
    let value = '';

    if (order === 'info') {
      switch (param) {
        case 'Screen':
          value = productInfo?.screen || '';
          break;

        case 'RAM':
          value = productInfo?.ram || '';
          break;

        case 'Built in memory':
          value = productInfo?.capacity || '';
          break;
        default:
      }
    }

    if (order === 'detail') {
      switch (param) {
        case 'Resolution':
          value = productDetails?.display.screenResolution || '';
          break;

        case 'Processor':
          value = productDetails?.hardware.cpu || '';
          break;

        case 'Camera':
          value = productDetails?.camera.primary || '';
          break;

        case 'Zoom':
          value = productDetails?.camera.zoom || '';
          break;

        case 'Cell':
          value = productDetails?.connectivity.cell || '';
          break;
        default:
      }
    }

    return value || 'unknown';
  };


  return (
    <>
      <section className="ProdactPage__Section">
        {errorMessage && <div>{errorMessage}</div>}
        {isLoading

        && (
          <div className="Loading">
            Loading...
          </div>
        )}
        {isLoaded && productDetails && productInfo && (

          && (
            <div className="Loading">
              <Loading
                isLoaded={isLoaded}
                errorMessage={errorMessage}
              />
            </div>
          )}
        {isLoading && isLoaded && ''}
        {productDetails && (

          <article className="ProdactPage">
            <Breadcrumbs />
            <GoBack />
            <h1 className="ProdactPage__Heading">{productDetails.name}</h1>
            <div className="ProdactPage__Content">
              <div className="ProdactPage__Column">
                <section className="ProdactPage__Images">
                  <ul className="ProdactPage__ImageList">
                    {productDetails.images.map((image, i) => (
                      <li
                        className={cn({
                          'ProdactPage__Image--current': i === activeImageIndex,
                        },
                        'ProdactPage__ImageItem')}
                        key={image}
                      >
                        <a href="./#" onClick={e => handleImages(e, i)}>
                          <img
                            src={image}
                            alt={productDetails.name}
                            className="ProdactPage__Image"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                  <img
                    src={productDetails.images[activeImageIndex]}
                    alt={productDetails.name}
                    className="ProdactPage__ImageBig"
                  />
                </section>
              </div>
              <div className="ProdactPage__Column">
                <span className="ProdactPage__Id">
                  ID:
                  {' '}
                  {productInfo && productInfo.id}
                </span>
                <section className="ProdactPage__NarrowBlock">
                  <div className="ProdactPage__Price">
                    <span className="ProdactPage__Price--actual">
                      {price}
                    </span>
                    {(productInfo && productInfo.discount > 0) && (
                      <span className="ProdactPage__Price--full">
                        {productInfo.price}
                      </span>
                    )}
                  </div>
                  <div className="Card__ButtonWrap">
                    <ButtonAddToCart
                      product={productInfo}
                      ClassNameForBtn="ButtonCart--width"
                    />
                    <ButtonFavor product={productInfo} />
                  </div>
                </section>
                <section className="ProdactPage__Info">
                  <ul className="ProdactPage__InfoList">
                    {PRODUCTS_INFO.map(item => (
                      <li className="ProdactPage__InfoItem">
                        <p className="ProdactPage__InfoTitle">
                          {item.name}
                        </p>
                        <p className="ProdactPage__InfoFeature">
                          {productInfo
                            && techInfo(item.name, item.order)}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
              <div className="ProdactPage__Column">
                <section className="ProdactPage__Description">
                  <h2 className="ProdactPage__SubHeading">About</h2>
                  {productInfo && productInfo.snippet}
                  <div className="ProdactPage__MoreInfo">
                    <h3 className="ProdactPage__MoreInfo--SubHeading">More info</h3>
                    {productDetails && productDetails.description}
                  </div>
                </section>
              </div>
              <div className="ProdactPage__Column">
                <section className="ProdactPage__TechSpecs">
                  <h2 className="ProdactPage__SubHeading">Tech specs</h2>
                  <ul className="ProdactPage__SpecsList">
                    {PRODUCTS_SPECS.map(item => (
                      <li className="ProdactPage__SpecsItem">
                        <p className="ProdactPage__SpecsTitle">
                          {item.name}
                        </p>
                        <p className="ProdactPage__SpecsFeature">
                          {productInfo
                            && techInfo(item.name, item.order)}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </article>
        )}
      </section>
      <ProductsSlider title="You may also like" visibleProducts={brandProducts} />
    </>
  );
};
