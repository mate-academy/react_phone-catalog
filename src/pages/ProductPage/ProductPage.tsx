/* eslint-disable prettier/prettier */
//hooks
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { useEffect } from 'react';

//styles
import styles from './ProductPage.module.scss';

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


export const ProductPage = () => {
  const { data: allProducts = [], isLoading } = useProducts();
  const { productId } = useParams<{ productId: string }>();
  const product = allProducts.find(el => el.id === productId) || null;
  const recomend =
    allProducts.filter(el => el.namespaceId === product?.namespaceId);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
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
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
              }}
            />
          );
        })}
      </Carousel>
    </div>
  );
};
