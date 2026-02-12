import { ProductSlider } from '../../../shared/componets/ProductSlider';
import { useProducts } from '../../../shared/Utills/ProductContext';
import styles from './AlsoLike.module.scss';

export const AlsoLike = () => {
  const { products } = useProducts();
  const dataInLocalStorage = JSON.parse(
    localStorage.getItem('recomendedProducts') || '[]',
  );

  const recommendedProducts = dataInLocalStorage.map((elem: string) => {
    return products.products?.find(product => product.itemId === elem);
  });

  return (
    <div className={styles.container}>
      {recommendedProducts.length > 0 && (
        <ProductSlider
          title={'You may also like'}
          data={recommendedProducts}
          hasDiscount={true}
        />
      )}
    </div>
  );
};
