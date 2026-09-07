import { useContext, useState } from 'react';
import { Button } from '../../../components/Button/Button';
import { ProductSlider } from '../ProductSlider/ProductSlider';
import styles from './SliderSection.module.scss';
import { ProductFull } from '../../../types/Product_full';
import { ErrorContext } from '../../../store/ErrorContext';
import { Loader } from '../../../components/Loader';

type Props = {
  products: ProductFull[];
  title: string;
};

export const SliderSection: React.FC<Props> = ({ products, title }) => {
  const { isLoading, errorMessage } = useContext(ErrorContext);

  const [index, setIndex] = useState(0);

  const lastIndex = Math.ceil(products.length / 4) - 1;

  const handleLeftClick = () => {
    setIndex(prev => (prev === 0 ? 0 : prev - 1));
  };

  const handleRightClick = () => {
    setIndex(prev => (prev === lastIndex ? prev : prev + 1));
  };

  return (
    <div className={styles.sliderSection}>
      <h2 className={styles.sliderSection__title}>{title}</h2>
      {isLoading && <Loader />}
      {!isLoading && errorMessage && (
        <div className="error">
          <p className="errorMessage">{errorMessage}</p>
          <button
            className="errorButton"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      )}
      {!errorMessage && !isLoading && products.length === 0 && (
        <p className="errorMessage">No products found</p>
      )}
      {!errorMessage && !isLoading && products.length > 0 && (
        <>
          <div className={styles.sliderSection__controls}>
            <Button
              textContent=""
              className={
                ['arrow', index === 0 && 'arrow--disabled'].filter(
                  Boolean,
                ) as string[]
              }
              onClick={() => handleLeftClick()}
            />
            <Button
              textContent=""
              className={
                [
                  'arrow',
                  'arrow--right',
                  index === lastIndex && 'arrow--disabled',
                ].filter(Boolean) as string[]
              }
              onClick={() => handleRightClick()}
            />
          </div>
          <div className={styles.sliderSection__slider}>
            <ProductSlider index={index} width={1136} products={products} />
          </div>
        </>
      )}
    </div>
  );
};
