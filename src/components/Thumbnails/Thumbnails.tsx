import React, { useEffect, useState, useMemo} from 'react';
import { Link } from 'react-router-dom'
import styles from './Thumbnails.module.scss'

type Product = {
  id: string;
  category: string
}



export const Thumbnails: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const categories = ['phones','tablets','accessories']

  useEffect(() => {

    const fetchProductData = async () => {
      try {
        const response = await fetch(`https://meljaszuk.github.io/react_phone-catalog/api/products.json`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();

  }, []);



    const memoizedCounts = useMemo(() => {
      let categoryCounts = {
        phones:0,
        tablets:0,
        accessories:0
      }
      for(const product of products) {
        if (product.category === categories[0]) {
          categoryCounts['phones']++
        }
        if (product.category === categories[1]) {
          categoryCounts['tablets']++
        }
        if (product.category === categories[2]) {
          categoryCounts['accessories']++
        }
      }
      return categoryCounts
    }, [products]);


  return (
    <div className={styles.categories}>
      <h1 className={styles.title}>Shop by category</h1>

      <div className={styles.categoryContainer}>
      {categories.map((category) => (
        <div className={styles.category} key={category}>
          <Link to="/" className={styles.link}>
            <img
              src={`./img/category-${category}.png`}
              className={styles.image}
            />

            <h2 className={styles.category__title}>
            {category.charAt(0).toUpperCase() + category.slice(1)} {memoizedCounts[category as keyof typeof memoizedCounts]} items
            </h2>

            <span className={styles.category__subtitle}>
              <span className={styles.category__subtitle}>
              </span>
            </span>
          </Link>
        </div>
      ))}
      </div>
    </div>
  )
}
