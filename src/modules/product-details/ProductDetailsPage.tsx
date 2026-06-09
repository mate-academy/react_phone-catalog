import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getAccessories,
  getPhones,
  getTablets,
} from '../../services/product.api';
import { Phone } from '../../types/phone';
import { Tablet } from '../../types/tablet';
import { Accessorie } from '../../types/accessorie';
import styles from './ProductDetailsPage.module.scss';
import { Loader } from '../shared/components/UI/Loader';
import { ProductDetailsList } from './components/ProductDetailsList';

type AnyProduct = Phone | Tablet | Accessorie;

export const ProductDetailsPage = () => {
  const { productId } = useParams<{
    productId: string;
  }>();
  const [products, setProducts] = useState<AnyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) {
      return;
    }

    const fetchData = async () => {
      const [phones, tablets, accessories] = await Promise.all([
        getPhones(),
        getTablets(),
        getAccessories(),
      ]);

      const allProducts = [...phones, ...tablets, ...accessories];
      const foundProduct = allProducts.find(
        product => product.id === productId,
      );

      if (foundProduct) {
        setProducts([foundProduct]);
      }

      setLoading(false);
    };

    fetchData();
  }, [productId]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (products.length === 0) {
    return <div>Product not found</div>;
  }

  return (
    <div className={styles.productDetailsPage}>
      <div className={styles.container}>
        <ProductDetailsList
          products={products}
          title={productId || 'Products Details'}
        />
      </div>
    </div>
  );
};
