import { useEffect, useState } from 'react';
import { Product } from '../../Helpers/Types/Product';
import './ProductsSlider.scss';

type Props = {
  currentIndex: number,
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>,
  products: Product[],
};

export const ProductsSlider: React.FC<Props> = ({
  currentIndex,
  setCurrentIndex,
  products,
}) => {
  const [isLeftButtonDisabled, setIsLeftButtonDisabled] = useState(false);
  const [isRightButtonDisabled, setIsRightButtonDisabled] = useState(false);

  const scrollLeft = () => {
    setCurrentIndex(Math.max(currentIndex - 4, 0));
  };

  const scrollRight = () => {
    setCurrentIndex(Math.min(currentIndex + 4, products.length - 1));
  };

  useEffect(() => {
    setIsLeftButtonDisabled(currentIndex === 0);

    const remainingProducts = products.length - (currentIndex + 4);

    setIsRightButtonDisabled(remainingProducts <= 0);
  }, [currentIndex, products.length]);

  return (
    <>
      <div className="slider">
        <button
          type="button"
          className="slider__btn slider__btn-left"
          aria-label="Scroll to the left"
          onClick={scrollLeft}
          disabled={isLeftButtonDisabled}
        >
          {isLeftButtonDisabled ? (
            <img src="images/ArrowLeft.svg" alt="Can't scroll to the left" />
          ) : (
            <img src="images/ArrowBlack.svg" alt="Scroll to the left" />
          )}
        </button>

        <button
          type="button"
          className="slider__btn slider__btn-right"
          aria-label="Scroll to the right"
          onClick={scrollRight}
          disabled={isRightButtonDisabled}
        >
          {isRightButtonDisabled ? (
            <img
              src="images/DisabledArrow.svg"
              alt="Can't scroll to the right"
            />
          ) : (
            <img src="images/ArrowRight.svg" alt="Scroll to the right" />
          )}
        </button>
      </div>
    </>
  );
};
