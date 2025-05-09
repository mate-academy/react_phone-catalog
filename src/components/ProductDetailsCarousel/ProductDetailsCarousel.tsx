import { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../store/GlobalProvider';
import classNames from 'classnames';

export const ProductDetailsCarousel = () => {
  const { selectedProduct } = useContext(StateContext);
  const images = selectedProduct?.images || [];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (images.length > 0) {
      setActiveIndex(0);
    }
  }, [selectedProduct, images.length]);

  const handleImageChange = (newIndex: number) => {
    if (newIndex === activeIndex) {
      return;
    }

    setIsFading(true);
    setTimeout(() => {
      setActiveIndex(newIndex);
      setIsFading(false);
    }, 300);
  };

  return (
    <div className="productDetailsCarousel__box">
      <div className="productDetailsCarousel__thumbnails">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={classNames('productDetailsCarousel__mini', {
              'productDetailsCarousel__mini--active': index === activeIndex,
            })}
            onClick={() => handleImageChange(index)}
          />
        ))}
      </div>

      <div className="productDetailsCarousel__box-main">
        <img
          src={images[activeIndex]}
          alt="main img"
          className={classNames('productDetailsCarousel__main', {
            'productDetailsCarousel__fade-out': isFading,
            'productDetailsCarousel__fade-in': !isFading,
          })}
        />
      </div>
    </div>
  );
};
