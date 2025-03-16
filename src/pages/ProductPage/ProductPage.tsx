import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { AppContext } from '../../context/AppContext';

import styles from './ProductPage.module.scss';
import { ProductImages } from '../../components/ProductImages';
import { Configurator } from '../../components/Configurator';
import { TechSpecs } from '../../components/TechSpecs';
import { BackButton } from '../../components/BackButton';
import { ProductSlider } from '../../components/ProductSlider';
import classNames from 'classnames';
import { Loader } from '../../components/Loader';
import { ErrorComponent } from '../../components/ErrorComponent';

export const ProductPage = () => {
  const {
    handleActiveProduct,
    activeProduct,
    isLoading,
    handleRandomProducts,
    randomProducts,
    error,
  } = useContext(AppContext)!;
  const { productId } = useParams();
  const [showNotFound, setShowNotFound] = useState(false);

  useEffect(() => {
    if (productId) {
      handleActiveProduct(productId);
      handleRandomProducts();
    }

    return () => {
      handleActiveProduct(null);
    };
  }, [productId, handleActiveProduct, handleRandomProducts]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (!activeProduct && !isLoading) {
      timeoutId = setTimeout(() => {
        setShowNotFound(true);
      }, 500);
    } else {
      setShowNotFound(false);
    }

    return () => clearTimeout(timeoutId);
  }, [activeProduct, isLoading]);

  if (error) {
    return <ErrorComponent />;
  }

  return (
    <div
      className={classNames(styles.productPage, 'container', {
        'is-loading': isLoading,
      })}
    >
      {activeProduct && <Breadcrumbs productName={activeProduct?.name} />}

      <BackButton />

      {activeProduct && (
        <>
          <h2 className={styles.productPage__title}>{activeProduct?.name}</h2>

          <ProductImages />

          <Configurator />

          <article className={`${styles.productPage__about} blocksIdentation`}>
            <h3 className={styles.productPage__aboutTitle}>About</h3>

            <div className={styles.productPage__splitter} />

            {activeProduct?.description.map((info, index) => (
              <div className={styles.productPage__infoContainer} key={index}>
                <h4 className={styles.productPage__infoTitle}>{info.title}</h4>

                {info.text.map(txt => (
                  <p className={styles.productPage__infoText} key={txt}>
                    {txt}
                  </p>
                ))}
              </div>
            ))}
          </article>

          <TechSpecs />

          <ProductSlider
            productsList={randomProducts}
            title="You may also like"
          />
        </>
      )}

      {isLoading && <Loader />}

      {showNotFound && (
        <>
          <h1 className={styles.productPage__notFoundTitle}>
            Product not found
          </h1>

          <img
            className={styles.productPage__notFoundImage}
            src="../../../public/img/product-not-found.png"
            alt="Product not found image"
          />
        </>
      )}
    </div>
  );
};
