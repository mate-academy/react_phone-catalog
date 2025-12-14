import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../shared/componets/Loader/Loader';
import styles from './ProductDetailsPage.module.scss';
import { useProducts } from '../shared/Utills/ProductContext/ProductContext';
import { BreadCrumbs } from '../shared/componets/Breadcrumbs/Breadcrumbs';
import { BackButton } from './components/BackButton/BackButton';

import { TechSpec } from './components/TechSpec/TechSpec';
import { ImageSlider } from './components/ImageSlider/ImageSlider';

export const ProductDetailsPage = () => {
  const { products } = useProducts();
  const [isLoad] = useState(false);
  const { productId, category } = useParams();

  const selectedProduct = useMemo(() => {
    if (category === 'phones') {
      return products.phones?.find(product => product.id === productId) ?? null;
    }

    if (category === 'accessories') {
      return (
        products.accessories?.find(product => product.id === productId) ?? null
      );
    }

    if (category === 'tablets') {
      return (
        products.tablets?.find(product => product.id === productId) ?? null
      );
    }

    return null;
  }, [products, productId, category]);

  if (isLoad) {
    return <Loader />;
  }

  return (
    <div className={styles.product__details}>
      <BreadCrumbs />

      <BackButton />

      <h2>{selectedProduct?.name}</h2>

      <div className={styles.wrapper}>
        <ImageSlider images={selectedProduct?.images} />

        <TechSpec product={selectedProduct} />
      </div>

      <div className={styles.div}>
        <section className={styles.about}>
          <h3>About</h3>

          {selectedProduct?.description.map((desc, index) => (
            <React.Fragment key={index}>
              <h4>{desc.title}</h4>
              <p>{desc.text}</p>
            </React.Fragment>
          ))}
        </section>

        <section className={styles.tech__spec}>
          <h3>Tech specs</h3>

          <div>
            <p>Screen</p>
            <p>{selectedProduct?.screen}</p>
          </div>

          <div>
            <p>Resolution</p>
            <p>{selectedProduct?.resolution}</p>
          </div>

          <div>
            <p>Processor</p>
            <p>{selectedProduct?.processor}</p>
          </div>

          <div>
            <p>RAM</p>
            <p>{selectedProduct?.ram}</p>
          </div>

          <div>
            <p>Built in memory</p>
            <p>{selectedProduct?.capacity}</p>
          </div>

          <div>
            <p>Camera</p>
            <p>{selectedProduct?.camera}</p>
          </div>

          <div>
            <p>Zoom</p>
            <p>{selectedProduct?.zoom}</p>
          </div>

          <div>
            <p>Cell</p>

            <div className={styles.cell__container}>
              {selectedProduct?.cell.map((c, i) => (
                <p key={i}>
                  {c}
                  {i !== selectedProduct.cell.length - 1 && ','}
                </p>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
