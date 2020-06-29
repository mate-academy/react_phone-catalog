import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import './ProductDetailsPage.scss';
import { PhoneWasNotFound } from '../PhoneWasNotFound/PhoneWasNotFound';
import { techInfo } from '../../helpers/techInfo';
import { getProducts, getProductDetails } from '../../helpers/api';
import { PRODUCTS_SPECS } from '../../helpers/config';
import ProductsSlider from '../ProductsSlider/ProductsSlider';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { GoBack } from '../GoBack/GoBack';
import ButtonFavor from '../ButtonFavor/ButtonFavor';
import ButtonAddToCart from '../ButtonAddToCart/ButtonAddToCart';
import Loading from '../Loading/Loading';
import ProductInfo from '../ProductInfo/ProductInfo';
import ProductImages from '../ProductImages/ProductImages';

export const ProductDetailsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productInfo, setProductInfo] = useState<Product>();
  const [productDetails, setProductDetails] = useState<ProdactDetails>();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
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
      setErrorMessage('Oops! Reload page, please222');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getProducts().then(data => setProducts(data));
    loadProductDetails(productId);
  }, [productId, match.params.productId]);

  useEffect(() => {
    if (products.length) {
      const goodInfo = products.find(item => item.id === match.params.productId);

      setProductInfo(goodInfo);
    }
  }, [products, match.params.productId]);

  const price = useMemo(
    () => (productInfo && productInfo.discount > 0
      ? productInfo.price - ((productInfo.price / 100) * productInfo.discount)
      : productInfo && productInfo.price),
    [productInfo],
  );

  return (
    <>
      <section className="ProdactPage__Section">
        {isLoading
          && (

            <Loading
              isLoaded={isLoaded}
              errorMessage={errorMessage}
            />
          )}
        {isLoaded && productInfo === undefined && <PhoneWasNotFound />}
        {isLoaded && productDetails && productInfo && (
          <>
            <article className="ProdactPage">
              <Breadcrumbs />
              <GoBack />
              <h1 className="ProdactPage__Heading">{productDetails.name}</h1>
              <div className="ProdactPage__Content">
                <div className="ProdactPage__Column">
                  <ProductImages productDetails={productDetails} />
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
                  <ProductInfo
                    productInfo={productInfo}
                    productDetails={productDetails}
                  />
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
                        <li
                          className="ProdactPage__SpecsItem"
                          key={item.name}
                        >
                          <p className="ProdactPage__SpecsTitle">
                            {item.name}
                          </p>
                          <p className="ProdactPage__SpecsFeature">
                            {productInfo
                              && techInfo(productInfo, productDetails, item.name, item.order)}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              </div>
            </article>
            <ProductsSlider title="You may also like" visibleProducts={brandProducts} />
          </>
        )}
      </section>
    </>
  );
};
