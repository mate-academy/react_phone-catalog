import { useEffect, useState } from 'react';
import { Product } from 'types/ProductInfo';
import { useMyContext } from 'components/Contexts/Contexts';
import { Loader } from 'components/Loader/Loader';
import NotFound from 'components/NotFound/NotFound';
import { getProductsByCategory } from 'fetch/fetchProducts';
import { CardSlider } from 'components/CardSlider/CardSlider';
import styles from './AlsoLike.module.scss';

interface AlsoLikeProps {
  currentProduct: Product;
}

const AlsoLike = ({ currentProduct }: AlsoLikeProps) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState(false);
  const { setIsLoading, setIsError } = useMyContext();

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLocalLoading(true);
        setLocalError(false);

        const categoryProducts = await getProductsByCategory(
          currentProduct.category,
        );

        const related = categoryProducts
          .filter((product: Product) => product.id !== currentProduct.id)
          .slice(0, 10);

        setRelatedProducts(related);
      } catch (e) {
        setLocalError(true);
        setIsError(true);
      } finally {
        setLocalLoading(false);
        setIsLoading(false);
      }
    };

    if (currentProduct.category) {
      fetchRelatedProducts();
    }
  }, [currentProduct.category, currentProduct.id]);

  if (localLoading) {
    return <Loader />;
  }

  if (localError) {
    return <NotFound />;
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className={styles.section}>
      <CardSlider
        products={relatedProducts}
        title="You may also like"
        option="new"
      />
    </div>
  );
};

export default AlsoLike;
