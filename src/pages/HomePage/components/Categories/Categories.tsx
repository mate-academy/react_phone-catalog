import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../../../store/ProductContext';
import { productCategories } from '../../../../constants/productCategories';
import { ProductGeneral } from '../../../../types/ProductGeneral';
import { Category } from '../../../../types/Category';
import styles from './Categories.module.scss';

const getProductNumber = (category: string, products: ProductGeneral[]) =>
  [...products].filter(product => product.category === category).length;

type Props = { category: Category };

const CategoryCard: React.FC<Props> = ({ category }) => {
  const { products } = useContext(ProductContext);
  const { id, categoryName: name, color, categoryImg: img } = category;

  return (
    <div className={styles.category}>
      <Link to={`${id}`} className="link ">
        <div
          className={styles.category__link}
          style={{ backgroundColor: color }}
        >
          <img
            src={img}
            alt={name}
            className={`${styles.category__img} hover--scale`}
          />
        </div>
        <p className="text--category-title link">{name}</p>
        <p className={`${styles.category__number} text--grey`}>
          {`${getProductNumber(id, products)} models`}
        </p>
      </Link>
    </div>
  );
};

export const Categories = () => {
  return (
    <section className={styles.categories}>
      <h2 className={`${styles.categories__title} text--section-title`}>
        Shop by category
      </h2>
      <div className={styles.categories__container}>
        {productCategories.map(category => (
          <CategoryCard category={category} key={category.id} />
        ))}
      </div>
    </section>
  );
};
