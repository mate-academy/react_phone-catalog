import { useContext, useEffect, useState } from 'react';
import styles from './SuggestedProducts.module.scss';
// eslint-disable-next-line max-len
import { ProductsStateContext } from '../../../../shared/context/ProductsContext';
import { useSliderPerPage } from '../../../../shared/hooks/useSliderPerPage';
import { getIndexes } from '../../../../shared/utils/getIndexes';
import { useSwipeable } from 'react-swipeable';
// eslint-disable-next-line max-len
import { SliderLeftRoundButton } from '../../../../shared/ui/buttons/sliderLerfRound';
// eslint-disable-next-line max-len
import { SliderRightRoundButton } from '../../../../shared/ui/buttons/sliderRightRound';
import { ProductCard } from '../../../../shared/ui/productCard';
// eslint-disable-next-line max-len
import { getSuggestedProducts } from '../../../../shared/utils/getSuggestedProducts';
import { Product } from '../../../../shared/types/Product';

export const SuggestedProducts = () => {
  const { products } = useContext(ProductsStateContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [suggestedIds, setSuggestedIds] = useState<number[]>([]);
  const perPage = useSliderPerPage();

  // робимо так, щоб при натисканні на батон
  // addToFavorite не змінювались продукти в рандомній секції
  useEffect(() => {
    if (products.length > 0 && suggestedIds.length === 0) {
      const ids = getSuggestedProducts(products, 20).map(product => product.id);

      setSuggestedIds(ids);
    }
  }, [products, suggestedIds.length]);

  const suggestedProducts: Product[] = suggestedIds
    .map(id => products.find(product => product.id === id))
    .filter((product): product is Product => Boolean(product));

  const totalProducts = suggestedProducts.length;
  const { firstIndex, lastIndex } = getIndexes(perPage, currentPage);
  const currentProducts = suggestedProducts.slice(firstIndex, lastIndex);
  const safePerPage = Math.max(1, perPage);
  const totalPages = Math.max(1, Math.ceil(totalProducts / safePerPage));
  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  const isMobileOrTablet = perPage < 4;

  const handleLeftButtonClick = () => {
    if (!prevDisabled) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRightButtonClick = () => {
    if (!nextDisabled) {
      setCurrentPage(currentPage + 1);
    }
  };

  //#region Swipe
  const swipers = useSwipeable({
    onSwipedLeft: () => {
      if (isMobileOrTablet && !nextDisabled) {
        handleRightButtonClick();
      }
    },
    onSwipedRight: () => {
      if (isMobileOrTablet && !prevDisabled) {
        handleLeftButtonClick();
      }
    },

    // trackMouse: true,
    preventScrollOnSwipe: true,
  });
  //#endregion

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <h2 className={styles.categoryTitle}>You may also like</h2>
        <div className={styles.sliderButtons}>
          <SliderLeftRoundButton
            onPageChange={handleLeftButtonClick}
            prevDisabled={prevDisabled}
          />
          <SliderRightRoundButton
            onPageChange={handleRightButtonClick}
            nextDisabled={nextDisabled}
          />
        </div>
      </div>
      <div className={styles.productsOuter} {...swipers}>
        <div className={styles.products}>
          {currentProducts.map(product => (
            <ProductCard product={product} showFullPrice key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
