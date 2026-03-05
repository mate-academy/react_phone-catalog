import { useMemo } from 'react';
import styles from './HomePage.module.scss';
import bannerPhone from '../../items/image 6.png';
import bannerTablet from '../../items/image 5.png';
import bannerAcs from '../../items/image 7.png';
import phonesData from '../../../public/api/products.json';
import { PictureSlider } from '../PictureSlider/PictureSlider';
import { ProductSlider } from '../ProductSlider/ProductSlider';
import { CategoryCard } from '../CategoryCard/CategoryCard';
import { Navigation } from '../Navigation/Navigation';
import { Footer } from '../Footer/Footer';

export const HomePage = () => {
  const newPhones = useMemo(() => phonesData.filter(p => p.year === 2022), []);

  const hotPhones = useMemo(
    () => phonesData.filter(p => p.fullPrice - p.price > 50),
    [],
  );

  const categories = [
    {
      title: 'Mobile phones',
      count: 95,
      image: bannerPhone,
      link: '/phones',
      wrapperClassName: '',
    },
    {
      title: 'Tablets',
      count: 24,
      image: bannerTablet,
      link: '/tablets',
      wrapperClassName: '',
    },
    {
      title: 'Accessories',
      count: 100,
      image: bannerAcs,
      link: '/accessories',
      wrapperClassName: styles.category_image_wrapper_accessories,
    },
  ];

  return (
    <div className={styles.page}>
      <h1 className={styles.visually_hidden}>Product Catalog</h1>
      <Navigation />

      <main className={styles.main}>
        <section>
          <PictureSlider />
        </section>

        <ProductSlider title="Brand new models" products={newPhones} />

        <section className={styles.category_section}>
          <div className={styles.category_inner}>
            <h2 className={styles.category_text}>Shop by category</h2>
            <div className={styles.categories}>
              {categories.map(cat => (
                <CategoryCard
                  key={cat.title}
                  title={cat.title}
                  count={cat.count}
                  image={cat.image}
                  link={cat.link}
                  className={styles.category_card}
                  wrapperClassName={cat.wrapperClassName}
                />
              ))}
            </div>
          </div>
        </section>

        <ProductSlider title="Hot prices" products={hotPhones} />
      </main>

      <Footer />
    </div>
  );
};
