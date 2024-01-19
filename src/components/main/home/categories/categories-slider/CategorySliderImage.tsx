type CategorySliderImageProps = {
  src: string
  alt: string
};

export const CategorySliderImage = ({ src, alt }: CategorySliderImageProps) => (
  <li className="category-slider-image">
    <img
      className="category-slider-image__banner"
      src={src}
      alt={alt}
    />
  </li>
);
