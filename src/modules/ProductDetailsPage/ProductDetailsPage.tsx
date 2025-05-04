import React, { useEffect, useMemo, useState } from 'react';
import styles from './ProductDetailsPage.module.scss';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../../shared/Breadcrumb';
import { ProductGallery } from '../../components/ProductGallery';
import { ProductOptions } from '../../components/ProductOptions';
import { AboutProduct } from './About/AboutProduct';
import ProductInfo from '../../shared/Product/ProductInfo';
import { RecommendedProduct } from '../../components/RecomendetProduct';
import { useProducts } from '../../contexts/ProductsContext';
import { ProductType } from '../../types/ProductType';
import { Loading } from '../../shared/Loading';

export const ProductDetailsPage: React.FC = () => {
  const { products: recommendedProducts, error, isLoading } = useProducts();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const pathnames = useMemo(() => {
    return location.pathname.split('/').filter(Boolean);
  }, [location.pathname]);

  const category = pathnames[0];
  const [product, setProduct] = useState<ProductType | null>(null);
  const [img, setImg] = useState('');
  const [localLoading, setLocalLoading] = useState(true);
  const [localError, setLocalError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLocalLoading(true);

        await new Promise(resolve => setTimeout(resolve, 300));

        const res = await fetch(`/api/${category}.json`);
        const data: ProductType[] = await res.json();

        const foundProduct = data.find(p => p.id === id);

        if (foundProduct) {
          setProduct(foundProduct);
          setImg(foundProduct.images[0]);
        } else {
          setProduct(null);
        }
      } catch (err) {
        setLocalError(true);
      } finally {
        setLocalLoading(false);
      }
    };

    fetchProduct();
  }, [category, id]);

  const info = useMemo(
    () => [
      { title: 'Screen', value: product?.screen },
      { title: 'Resolution', value: product?.resolution },
      { title: 'Processor', value: product?.processor },
      { title: 'RAM', value: product?.ram },
      { title: 'Capacity', value: product?.capacity },
      { title: 'Camera', value: product?.camera },
      { title: 'Zoom', value: product?.zoom },
      { title: 'Cell', value: product?.cell },
    ],
    [product],
  );

  if (localLoading) {
    return <Loading />;
  }

  if (localError) {
    return <h2>Something went wrong</h2>;
  }

  if (!product) {
    return <h2>Product not found</h2>;
  }

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
              <h1 className={styles.productDetails__title}>{product.name}</h1>

              <div className={styles.productDetails__wrapper}>
                <ProductGallery img={img} setImg={setImg} product={product} />
                <ProductOptions product={product} />
              </div>

              <div className={styles.productDetails__description}>
                <AboutProduct product={product} />

                <div className={styles.productDetails__tech}>
                  <h3 className={styles.productDetails__subtitle}>
                    Tech specs
                  </h3>
                  <ProductInfo info={info} />
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {!isLoading && !error && (
        <RecommendedProduct products={recommendedProducts} />
      )}
    </main>
  );
};
