import { ProductsBlock } from '@/shared/components/ProductsBlock';
import styles from './Categories.module.scss';
import container from '@/shared/styles/Container.module.scss';
import { useTranslation } from 'react-i18next';

export const Categories = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.categories}>
      <div className={container.container}>
        <div className={styles.categories__content}>
          <h3 className={styles.title}>{t('home.category.title')}</h3>
          <div className={styles.blocksWrapper}>
            <ProductsBlock
              bgColor="#6D6474"
              title="mobilePhones"
              image="img/category-phones.webp"
              category="phones"
            />
            <ProductsBlock
              bgColor="#89939A"
              title="tablets"
              image="img/category-tablets.webp"
              category="tablets"
            />
            <ProductsBlock
              bgColor="#a71747"
              title="accessories"
              image="img/category-accessories.webp"
              category="accessories"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
