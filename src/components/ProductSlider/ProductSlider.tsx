import './ProductSlider.scss';

type ProductSliderProps = {
  page: number;
};

export const ProductSlider: React.FC<ProductSliderProps> = ({
  page,
  children,
}) => (
  <div className="slider">
    <div
      className="slider__wrapper"
      style={{ transform: `translateX(${-100 * page}%)` }}
      data-cy="cardsContainer"
    >
      {children}
    </div>
  </div>
);
