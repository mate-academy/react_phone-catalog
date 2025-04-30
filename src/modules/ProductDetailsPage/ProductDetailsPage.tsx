import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import notFoundImg from 'assets/img/ui/product-not-found.png';

import { useProductsContext } from 'contexts/ProductsContext';
import { ProductsSlider } from 'modules/HomePage/components/ProductsSlider';
import { NotFoundPage } from 'modules/NotFoundPage';
import { Error } from 'shared/components/layout/Error';
import { Loader } from 'shared/components/layout/Loader';
import { Breadcrumbs } from 'shared/components/ui/Breadcrumbs';
import { GoBack } from 'shared/components/ui/GoBack';
import { ProductCategory } from 'shared/constants/productCategory';
import {
  getProductsByCategory,
  getSuggestedProducts,
} from 'shared/services/services';
import { Product } from 'shared/types/Product';

import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage: React.FC = () => {
  const { category, id } = useParams();
  const { productsByCategory } = useProductsContext();
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [detailedProduct, setDetailedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!category || !id) return;

    const loadProduct = async () => {
      try {
        setLoading(true);
        const allProducts = await getProductsByCategory(
          category as ProductCategory,
        );

        const curProduct = allProducts.find(p => p.id === id) || null;

        setDetailedProduct(curProduct);

        if (curProduct) {
          const suggested = await getSuggestedProducts(
            productsByCategory[category as ProductCategory],
            curProduct.id,
          );

          setSuggestedProducts(suggested);
        }
      } catch (err) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productsByCategory, category, id]);

  let content = null;

  if (loading) {
    content = <Loader />;
  } else if (error) {
    content = <Error message={error} />;
  } else if (!detailedProduct) {
    content = (
      <NotFoundPage imageSrc={notFoundImg} message="Product not found" />
    );
  } else {
    content = (
      <>
        <Breadcrumbs />

        <GoBack />

        <p>{detailedProduct.name}</p>

        <ProductsSlider
          key={id}
          products={suggestedProducts}
          showDiscount={true}
          title="You may also like"
        />
      </>
    );
  }

  return <div className={styles.productPage}>{content}</div>;
};
