import styles from './ProductsList.module.scss';
import { useTabs } from '../../../../ProductsContext/TabsContext';
import { useState } from 'react';
import { CardProduct, ProductsStyleTitleMap } from '../../../shared';
import { ProductsStyleMode } from '../../../shared/types/types';
import { NoCategory } from '../../../shared/components/NoCategory';
import { useParams } from 'react-router-dom';
import { getSuggestedProducts } from '../../hooks/SuggestedProducts';
import { NavButton } from '../../../shared/components/NavButton';

interface ProductsListType {
  productsStyle: ProductsStyleMode;
}

export const ProductsList: React.FC<ProductsListType> = ({ productsStyle }) => {
  const { productsList } = useTabs();
  const { id } = useParams();

  const isProducts = !productsList || productsList.length === 0;

  let products = productsList
    .filter(product => product.fullPrice > product.price)
    .sort((a, b) => b.price - a.price);

  let sale = true;

  if (productsStyle === ProductsStyleMode.New) {
    const newestYear = Math.max(...productsList.map(p => p.year));

    products = productsList.filter(product => product.year === newestYear);
    sale = false;
  }

  if (productsStyle === ProductsStyleMode.Also && id) {
    products = getSuggestedProducts(id, products, 8);
  }

  const itemsPerPage = 4;
  const [index, setIndex] = useState(0);

  const totalSlides = products.length - itemsPerPage + 1;

  const goNext = () => {
    if (index < totalSlides - 1) {
      setIndex(i => i + 1);
    }
  };

  const goPrev = () => {
    if (index > 0) {
      setIndex(i => i - 1);
    }
  };

  const visibleProducts = products.slice(index, index + itemsPerPage);

  return (
    <div className={styles.container}>
      <div className={styles.elementsTitle}>
        <h2 className={styles.title}>
          {productsStyle === ProductsStyleMode.New
            ? ProductsStyleTitleMap.new
            : productsStyle === ProductsStyleMode.Hot
              ? ProductsStyleTitleMap.hot
              : ProductsStyleTitleMap.also}
        </h2>

        <div className={styles.buttons}>
          <NavButton
            onClick={goPrev}
            disabled={index === 0}
            childrenValue={'./img/image/Icons/VectorLeft.svg'}
          />

          <NavButton
            onClick={goNext}
            disabled={index === totalSlides - 1}
            childrenValue={'./img/image/Icons/VectorRight.svg'}
          />
        </div>
      </div>

      {isProducts ? (
        <NoCategory />
      ) : (
        <div className={styles.productsList}>
          {visibleProducts.map(element => (
            <CardProduct key={element.id} element={element} sale={sale} />
          ))}
        </div>
      )}
    </div>
  );
};
