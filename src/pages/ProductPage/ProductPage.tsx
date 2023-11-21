import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDetails } from '../../api/getProducts';
import { ProductDetail } from '../../types/ProductDetails';
import styles from './ProductPage.module.scss';
import { useProducts } from '../../Store';

import { ShowLocation } from '../../components/ShowLocation';
import { GoToBack } from '../../components/GoToBack';
import { Gallery } from '../../components/Gallery';
import { Order } from '../../components/Order';
import { SpecificationsProduct } from '../../components/SpecificationsProduct';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Loader } from '../../components/Loader';

export const ProductPage = () => {
  const { product } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [productDetail, setProductDetail] = useState<ProductDetail>();
  const products = useProducts(state => state.products);
  const productId = (products
    .find(prod => prod.phoneId === productDetail?.id)?.id || '0')
    .concat('00000').slice(0, 6);

  useEffect(() => {
    setIsLoading(true);

    if (product) {
      getDetails(product)
        .then(setProductDetail)
        .finally(() => setIsLoading(false));
    }
  }, [product]);

  return (
    <>
      <ShowLocation />
      <GoToBack />
      {isLoading && <Loader />}
      {productDetail && (
        <>
          <h1>{productDetail.name}</h1>
          <div className={styles.intro}>
            <Gallery productDetail={productDetail} />
            <Order productDetail={productDetail} />
            <p className={styles.id}>{`ID: ${productId}`}</p>
          </div>
          <div className={styles.description}>
            <div className={styles.descriptionLeft}>
              <h2>About</h2>
              <hr />
              {productDetail.description.map((el) => (
                <div
                  key={el.title}
                  className={styles.descriptionElement}
                >
                  <h3>{el.title}</h3>
                  <div
                    className={styles.descriptionElementInfo}
                    data-cy="productDescription"
                  >
                    {el.text}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.descriptionRight}>
              <h2>Tech specs</h2>
              <hr />
              <SpecificationsProduct productDetail={productDetail} showAll />
            </div>
          </div>

          <ProductsSlider
            title="You may also like"
            products={products}
          />
        </>
      )}
    </>
  );
};
