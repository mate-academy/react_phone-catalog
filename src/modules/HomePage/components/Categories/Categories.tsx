import { Title } from '../../../../components/Title';
import { Product } from '../../../shared/types/Product';
import { ProductCategory } from '../ProductCategory';
import styles from './Categories.module.scss';

export const Categories = ({ products }: { products: Product[] }) => {
  const phonesCount = products.filter(p => p.category === 'phones').length;
  const tabletsCount = products.filter(p => p.category === 'tablets').length;
  const accessoriesCount = products.filter(
    p => p.category === 'accessories',
  ).length;

  return (
    <section className={styles.categories}>
      <Title text={'Shop by category'} level={2} />
      <div className={styles.categories__list}>
        <ProductCategory
          title={'Mobile phones'}
          image={'/img/image 6.png'}
          count={phonesCount}
          backgroundColor={'#6D6474'}
          link="phones"
        />
        <ProductCategory
          title={'Tablets'}
          image={'/img/image 5.png'}
          count={tabletsCount}
          backgroundColor={'#8D8D92'}
          link="tablets"
        />
        <ProductCategory
          title={'Accessories'}
          image={'/img/image 7.png'}
          count={accessoriesCount}
          backgroundColor={'#973D5F'}
          link="accessories"
        />
      </div>
    </section>
  );
};
