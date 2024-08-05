import styles from './ShopByCategory.module.scss';
import { Link } from 'react-router-dom';
import { categories } from '../../utils/Arrays';
import { useEffect, useState } from 'react';
import { getProductsByCategory } from '../../utils/fetchClient';

export const ShopByCategory: React.FC = () => {
  const [phonesTotal, setPhonesTotal] = useState(0);
  const [tabletsTotal, setTabletsTotal] = useState(0);
  const [accessoriesTotal, setAccessoriesTotal] = useState(0);

  useEffect(() => {
    const getProductsTotal = async () => {
      const productCategories = ['phones', 'tablets', 'accessories'];

      const ProductsTotal = await Promise.all(
        productCategories.map(productCategory =>
          getProductsByCategory(productCategory),
        ),
      );

      setPhonesTotal(ProductsTotal[0].length);
      setTabletsTotal(ProductsTotal[1].length);
      setAccessoriesTotal(ProductsTotal[2].length);
    };

    getProductsTotal();
  }, []);

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Shop by category</h2>

      {categories.map(category => (
        <div key={category.id} className={styles.category}>
          <Link to={category.path} className={styles.categoryLink}>
            <img
              src={category.image}
              alt={category.name}
              className={styles.categoryImg}
            />
            <h3 className={styles.categoryTitle}>{category.name}</h3>
            <p className={styles.categoryInfo}>
              {(category.name === 'Mobile phones' && `${phonesTotal} models`) ||
                (category.name === 'Tablets' && `${tabletsTotal} models`) ||
                (category.name === 'Accessories' &&
                  `${accessoriesTotal} models`)}
            </p>
          </Link>
        </div>
      ))}
    </section>
  );
};
