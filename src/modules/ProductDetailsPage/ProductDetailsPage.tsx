import React, { useEffect, useMemo, useState } from 'react';
import styles from './ProductDetailsPage.module.scss';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../../shared/Breadcrumb';
import classNames from 'classnames';
import { ProductType } from '../../types/ProductType';

export const ProductDetailsPage: React.FC = () => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [img, setImg] = useState('');
  const [fade, setFade] = useState(false);

  const { id } = useParams();

  const location = useLocation();
  const pathnames = useMemo(() => {
    return location.pathname.split('/').filter(x => x);
  }, [location.pathname]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`api/${pathnames[0]}.json`);
        const data = await res.json();

        const findProduct = data.find((p: ProductType) => p.id === id);

        setProduct(findProduct);
        setImg(findProduct?.images[0]);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, [id, pathnames]);

  const handleImageChange = (newImage: string) => {
    if (img !== newImage) {
      setFade(true);

      setTimeout(() => {
        setImg(newImage);
        setFade(false);
      }, 300);
    }
  };

  return (
    <main>
      <section className={styles.productDetails}>
        <div className={styles.container}>
          <Breadcrumb pathnames={pathnames} />
          <button
            className={styles.productDetails__btn}
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <div className={styles.productDetails__content}>
            <article className={styles.productDetails__product}>
              <h1 className={styles.productDetails__title}>{product?.name}</h1>

              <div className={styles.gallery}>
                <div className={styles.gallery__large}>
                  <img
                    src={img}
                    alt=""
                    className={classNames(
                      styles.gallery__img,
                      fade && styles['fade-out'],
                    )}
                  />
                </div>
                <ul className={styles.gallery__list}>
                  {product?.images &&
                    product.images.map(image => (
                      <li
                        key={image}
                        className={styles.gallery__item}
                        onClick={() => handleImageChange(image)}
                      >
                        <img
                          src={image}
                          alt={image}
                          className={styles.gallery__img}
                        />
                      </li>
                    ))}
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
};
