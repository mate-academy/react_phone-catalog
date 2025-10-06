import { PageTop } from '../../shared/components/PageTop/PageTop';
import styles from './ProductDetailsPage.module.scss';
import { useParams } from 'react-router-dom';
import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';
import { useEffect, useState } from 'react';
import { ProductAbout } from './components/ProductAbout';
import { ProductTechSpecs } from './components/ProductTechSpecs/ProductTechSpecs';
import { ProductMainControls } from './components/ProductMainControls/ProductMainControls';
import { AlsoLike } from './components/AlsoLike';
import { Loader } from '../../shared/components/utils/Loader';
import productNotFound from '../../../public/img/product-not-found.png';

export const ProductDetailsPage = () => {
  const [loading, setLoading] = useState(true);

  const { productId } = useParams();

  const allProducts = [...phones, ...tablets, ...accessories];

  const product = allProducts.find(p => p.id === productId);
  const [selectedPhoto, setSelectedPhoto] = useState(product?.images[0]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    if (product) {
      setSelectedPhoto(product.images[0]);
    }
  }, [product]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : product ? (
        <>
          <PageTop
            productInfo={false}
            dropdowns={false}
            itemName={product?.name}
          />
          <div className={styles.productdetails}>
            {/* <button>Back</button> */}
            <h2
              className={styles.productdetails__title}
              style={{ marginBottom: '32px' }}
            >
              {product.name}
            </h2>
            <div className={styles['productdetails__image-container']}>
              <img
                src={selectedPhoto}
                alt=""
                className={styles.productdetails__image}
              />
            </div>
            <div className={styles['productdetails__small-images']}>
              {product.images.map(img => (
                <div
                  key={img}
                  className={`${styles['productdetails__small-image-container']} ${selectedPhoto === img ? styles.active : ''}`}
                  onClick={() => setSelectedPhoto(img)}
                >
                  <img
                    src={img}
                    alt=""
                    className={styles['productdetails__small-image']}
                  />
                </div>
              ))}
            </div>
            <ProductMainControls product={product} />
            <ProductAbout product={product} />
            <ProductTechSpecs product={product} />
            <AlsoLike currentProduct={product} />
          </div>
        </>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            style={{
              maxWidth: '500px',
              maxHeight: '500px',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
            }}
            src={productNotFound}
          />
        </div>
      )}
    </>
  );
};
