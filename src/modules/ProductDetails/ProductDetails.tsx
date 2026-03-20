import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Pagetoolbar } from '../../components/layout/Pagetoolbar';
import { ProductDetailsType } from '../../types/types';
import styles from './ProductDetails.module.scss';

export const ProductDetails = () => {
  const { category, productId } = useParams();
  const [product, setProduct] = useState<ProductDetailsType | undefined>(
    undefined,
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/${category}.json`);
      const json: ProductDetailsType[] = await response.json();
      const currentProduct = json.find(item => item.id === productId);

      setProduct(currentProduct);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Pagetoolbar
        breadcrumbs
        breadcrumbsName={product && product.name}
        back
        title={product ? product.name : 'Product not found'}
      />
    </div>
  );
};
