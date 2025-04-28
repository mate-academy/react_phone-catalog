import styles from './ShopByCategory.module.scss';
import { useEffect, useState } from 'react';
import { ProductService } from '../../../../services/product.service';
import { IProductCard } from '../../../../interfaces/ProductCard.interface';
import { Link } from 'react-router-dom';

const ShopByCategory = () => {
  const [products, setProducts] = useState<IProductCard[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setError('');

      try {
        const data = await ProductService.getAll();

        if (data) {
          setProducts(data);
        }
      } catch (err) {
        setError('Error fetching products');
      }
    };

    fetchData();
  }, []);

  const countPhones =
    products.filter(product => product.category === 'phones');
  const countTablets =
    products.filter(product => product.category === 'tablets');
  const countAccessories =
    products.filter(product => product.category === 'accessories');

  return (
    !error && (
      <div className={styles.container}>
        <h1>Shop by category</h1>

        <div className={styles.categories}>
          <Link to={'/phones'} className={styles.categories__item}>
            <div>
              <img src="/img/category-phones.png" />
              <h3>Mobile phones</h3>
              <h4>{`${countPhones.length} models`}</h4>
            </div>
          </Link>
          <Link to={'/tablets'} className={styles.categories__item}>
            <div>
              <img src="/img/category-tablets.png" />
              <h3>Tablets</h3>
              <h4>{`${countTablets.length} models`}</h4>
            </div>
          </Link>
          <Link to={'/accessories'} className={styles.categories__item}>
            <div>
              <img src="/img/category-accessories.png" />
              <h3>Accessories</h3>
              <h4>{`${countAccessories.length} models`}</h4>
            </div>
          </Link>
        </div>
      </div>
    )
  );
};

export default ShopByCategory;
