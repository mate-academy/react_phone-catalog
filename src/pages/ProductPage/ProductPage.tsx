//hooks
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

//styles
import styles from './ProductPage.module.scss';

//types
import { ProductDetailed } from '../../types/product';

//components
import { Loader } from '../../components/Loader';
import { Header } from './components/Header';
import { Articles } from './components/Articles';
import { TechSpecs } from './components/TechSpecs';
import { Carousel } from '../../components/Carousel';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductCard } from '../../components/ProductCard';
import { NotFoundPage } from '../NotFoundPage';

//services
import classNames from 'classnames';
import { getProductsByType } from '../../services/api';

export const ProductPage = () => {
  const [products, setProducts] = useState<ProductDetailed[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { productId } = useParams<{ productId: string }>();
  const product = products.find(el => el.id === productId) || null;
  const recomend = products.filter(
    el => el.namespaceId === product?.namespaceId,
  );
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    async function loadProducts() {
      try {
        scrollToTop();
        setIsLoading(true);
        const [phones, tablets, accessories] = await Promise.all([
          getProductsByType('phones'),
          getProductsByType('tablets'),
          getProductsByType('accessories'),
        ]);

        setProducts([...phones, ...tablets, ...accessories]);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (isLoading) {
    return <Loader className={styles.loader} />;
  }

  if (product === null) {
    return <NotFoundPage />;
  }

  return (
    <div className={styles.page}>
      <Breadcrumbs
        mainLoc={product.category}
        currentLoc={product.name}
        className={styles.breadcrumbs}
      />

      <Breadcrumbs
        backType={true}
        mainLoc={product.category}
        className={styles.backButton}
      />

      <h2 className={styles.title}>{product.name}</h2>

      <Header product={product} className={styles.header} />

      <section className={styles.about}>
        <h3 className={styles.sectionTitle}>About</h3>

        <hr className={styles.divider} />

        <Articles description={product.description} />
      </section>

      <section className={styles.techSpecs}>
        <h3 className={styles.sectionTitle}>Tech specs</h3>

        <hr className={classNames(styles.divider, styles['divider--specs'])} />

        <TechSpecs product={product} className={styles.spec} />
      </section>

      <Carousel title={'You may also like'} className={styles.carousel}>
        {recomend.map(p => {
          return (
            <ProductCard
              key={p.id}
              product={p}
              className={styles.productCard}
              onClick={() => {
                navigate(`/${p.category}/${p.id}`);
                scrollToTop();
              }}
            />
          );
        })}
      </Carousel>
    </div>
  );
};
