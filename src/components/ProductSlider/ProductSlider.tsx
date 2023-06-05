import './ProductSlider.scss';

type ProductSliderProps = {
  page: number;
  gap?: number;
};

export const ProductSlider: React.FC<ProductSliderProps> = ({
  page, children, gap,
}) => (
  <ul className="slider" style={{ transform: `translateX(${-100 * page}%)`, gap }}>
    {/* {children} */}
    {Array.isArray(children) && children.map(child => (
      <li className="slider__item" key={child.key}>
        {child}
      </li>
    ))}
  </ul>
);
