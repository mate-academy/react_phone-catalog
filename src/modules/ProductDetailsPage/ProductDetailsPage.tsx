import { useEffect, useMemo, useState } from 'react';
import { CATEGORY_TYPE } from '../../constants/categoryTypes';
import {
  getAccessories,
  getPhones,
  getProducts,
  getTablets,
} from '../../utils/api';
import { CategoryProduct } from '../../types/CategoryProduct';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import styles from './ProductDetailsPage.module.scss';
import { Product } from '../../types/Product';
import { ProductDetails } from './components/ProductDetails';

type Props = {
  productType: string;
};

export const ProductDetailsPage: React.FC<Props> = ({ productType }) => {
  const [categoryProducts, setCategoryProducts] = useState<CategoryProduct[]>(
    [],
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { productId } = useParams();

  const categoryToRequestMap = useMemo(() => {
    return {
      [CATEGORY_TYPE.PHONES]: getPhones,
      [CATEGORY_TYPE.TABLETS]: getTablets,
      [CATEGORY_TYPE.ACCESSORIES]: getAccessories,
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError('');
      try {
        const productsFromApi = await getProducts();

        setProducts(productsFromApi);

        const request = categoryToRequestMap[productType];
        const categoryProductsFromApi = await request();

        setCategoryProducts(categoryProductsFromApi);
      } catch {
        setError('Product was not found');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [productType, categoryToRequestMap]);

  const selectedProduct = categoryProducts.find(
    product => productId === product.id,
  );

  const product = products.find(item => item.itemId === productId);

  const getSuggestedProducts = products
    .filter(productItem => productItem.category === selectedProduct?.category)
    .slice(4, 14);

  return (
    <div>
      {isLoading && <Loader />}

      {error && !isLoading && (
        <>
          <h3 className={styles.productDetails__error}>{error}</h3>
          <img
            className={styles.productDetails__errorImg}
            src="img/product-not-found.png"
            alt="error"
          />
        </>
      )}

      {!isLoading && selectedProduct && product && (
        <ProductDetails
          productDetails={selectedProduct}
          product={product}
          suggestedProducts={getSuggestedProducts}
        />
      )}
    </div>
  );
};
