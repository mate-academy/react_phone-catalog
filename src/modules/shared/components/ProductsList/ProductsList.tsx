import React, { useEffect, useState } from 'react';
import ProductCard from '../../../ProductCard';
import { Product } from '../../../../types/product';
import { getProducts } from '../../../../utils/fetchClient';
import styles from './ProductsList.module.scss';
import { Loader } from '../Loader';
import { useSearchParams } from 'react-router-dom';

type Props = {
  type: string;
};

export const ProductsList: React.FC<Props> = ({ type }) => {
  const [items, setItems] = useState<Product[]>([]);
  const [visibleItems, setVisibleItems] = useState(items);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const perPage = searchParams.get('perPage') || 'All';
  const currentPage = searchParams.get('page') || 1;
  const startIndex = perPage === 'All' ? 0 : (+currentPage - 1) * +perPage;
  const endIndex = perPage === 'All' ? -1 : startIndex + +perPage;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await getProducts();
        const filtered = response
          .filter(product => product.category === type)
          .sort((p1, p2) => {
            switch (sort) {
              case 'age':
                return p2.year - p1.year;
              case 'price':
                return p1.price - p2.price;
              case 'title':
                return p1.name.localeCompare(p2.name);
              default:
                return 0;
            }
          });

        setItems(filtered);
      } catch (error) {
        throw error;
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    fetchProducts();
  }, [sort, type, perPage]);

  useEffect(() => {
    setVisibleItems(items.slice(startIndex, endIndex));
  }, [endIndex, startIndex, items]);

  return (
    <>
      {!isLoading ? (
        <div className={styles.list}>
          {visibleItems.map(item => (
            <div key={item.id} className={styles.list__item}>
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProductsList;
