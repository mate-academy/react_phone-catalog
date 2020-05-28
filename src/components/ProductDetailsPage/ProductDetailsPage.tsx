import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import cn from 'classnames';
import './ProductDetailsPage.scss';

import { getProducts, getProductDetails } from '../../helpers/api';

// type Props = RouteComponentProps<{
//   productId: string;
// }>;

export const ProductDetailsPage: React.FC = () => {
  const [products, setProducts] = useState<Slide[]>([]);
  const [productInfo, setProductInfo] = useState<Slide>();
  const [productDetails, setProductDetails] = useState<ProdactDetails>();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const match: Match = useRouteMatch();
  const { productId } = useParams();

  const loadProductDetails = async (goodId: string) => {
    setIsLoading(true);

    try {
      const data = await getProductDetails(goodId);
      const preparedProductDetails = { ...data };

      setProductDetails(preparedProductDetails);
      setIsLoaded(true);
    } catch (error) {
      setErrorMessage(String(error));
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getProducts().then(data => setProducts(data));
  }, []);

  useEffect(() => {
    if (products.length) {
      const goodInfo = products.find(item => item.id === match.params.productId);

      setProductInfo(goodInfo);
    }
  }, [products, match.params.productId]);

  useEffect(() => {
    loadProductDetails(productId);
  }, [productId]);

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

  // console.log('productInfo', productInfo);
  // console.log('productDetails', productDetails);

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
        {isLoading && isLoaded && ''}
        {productDetails && (
          <article className="ProdactPage">
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
                  <div className="ProdactPage__Buttons">
                    <div className="ProdactPage__Buttons--main">
                      <button
                        type="button"
                        className="card__button-cart"
                      >
                        Add to cart
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="card__button-favor"
                      >
                        favor
                      </button>
                    </div>
                  </div>
                </section>
                {/* <section className="GoodPage__Info">
                  <GoodTechInfo
                    goodDetail={goodDetail}
                    goodInfo={goodInfo}
                  />
                </section> */}
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
                  <ul>
                    {/* <GoodSpecsInfo
                      goodDetail={goodDetail}
                      goodInfo={goodInfo}
                    /> */}
                  </ul>
                </section>
              </div>
            </div>
          </article>
        )}
      </section>
      {/* <CardSlider goods={sliderItems} title="You may also like" /> */}
    </>
  );
};
