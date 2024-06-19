import { useSlider } from '../../hooks/useSlider';

import { Product } from '../../types/Product';
import { ProductCards } from '../ProductCards';
import { ProductListHeader } from '../ProductListHeader/ProductListHeader';
import { ProductListSlider } from '../ProductListSlider';

import styles from './ProductList.module.scss';

type Props = {
  products: Product[];
  loading: boolean;
  isHaveSlider: boolean;
  title?: string;
  isHotPrice?: boolean;
};

export const ProductList: React.FC<Props> = ({
  products,
  // loading,
  isHaveSlider,
  title,
  isHotPrice = false,
}) => {
  // if (loading) {
  //   return <Loader />;
  // }

  // useEffect(() => {
  //   if (!products.length) {
  //     toast.error('There are no phones/tablets/accessories yet');
  //   }
  // }, [products]);

  const sliderSettings = {
    pictureWidth: 272,
    height: 500,
    step: 4,
    total: products?.length,
    gap: 16,
    autoplay: false,
    isFullScroll: false,
  };

  const { handlePrevSlide, handleNextSlide, currentIndex } = useSlider({
    ...sliderSettings,
  });

  const currentSlide = currentIndex + sliderSettings.step;

  return (
    <section className={styles.Products}>
      {isHaveSlider && (
        <ProductListHeader
          title={title}
          handlePrevSlide={handlePrevSlide}
          handleNextSlide={handleNextSlide}
          currentSlide={currentSlide}
          totalProducts={products.length}
        />
      )}

      {isHaveSlider && products.length ? (
        <ProductListSlider
          sliderSettings={sliderSettings}
          currentIndex={currentIndex}
          products={products}
          isHotPrice={isHotPrice}
        />
      ) : (
        <div className={styles.Wrapper}>
          <ProductCards isHotPrice={isHotPrice} products={products} />
        </div>
      )}
    </section>
  );
};
