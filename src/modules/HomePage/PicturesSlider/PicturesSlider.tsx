import { useEffect, useState } from 'react';
// import './PicturesSlider.module.scss';
import strokeLeft from '../../../../public/img/icons/StrokeLeft.svg';
import strokeRight from '../../../../public/img/icons/StrokeRight.svg';


import image1 from '../../../../public/img/PicturesSlider/Apple1.jpg';
import image2 from '../../../../public/img/PicturesSlider/Apple2.jpg';
import image3 from '../../../../public/img/PicturesSlider/Apple3.jpg';
import image4 from '../../../../public/img/PicturesSlider/Apple8.jpg'
import image5 from '../../../../public/img/PicturesSlider/Apple9.jpg';
import image7 from '../../../../public/img/PicturesSlider/Apple11.jpg';

const images = [ image7, image4,image1, image2, image3, image5 ];

export const PicturesSlider: React.FC = () => {
  const [imageIndex, setImageIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage()
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  const prevImage = () => {
    setImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }

  const handleDotClick = (index: number) => {
    setImageIndex(index)
  }

  return (
    <section className='section'>
      <div className="slider-container">
        <img src={images[imageIndex]} alt={`Slider-${imageIndex + 1}`}
          className="slider-image"/>
      </div>

      <div className='section__icons'>
        <button onClick={prevImage} className='section__icon section__icon--left'>
          <img src={strokeLeft} alt="Previous"/>
        </button>
        <button onClick={nextImage} className='section__icon section__icon--right'>
          <img src={strokeRight} alt="Next"/>
        </button>
      </div>
      <div className="slider-indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={`slider-indicator ${index === imageIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}>
          </span>
        ))}
      </div>
    </section>

    // <section className='section'>
    //   <div className="slider-container">
    //     <img src={images[imageIndex]} alt={`Slider-${imageIndex + 1}`}
    //       className="slider-image"/>
    //   </div>

    //   <div className='section__icons'>
    //     <button onClick={prevImage} className='section__icon section__icon--left'>
    //       <img src={strokeLeft} alt="Previous"/>
    //     </button>
    //     <button onClick={nextImage} className='section__icon section__icon--right'>
    //       <img src={strokeRight} alt="Next"/>
    //     </button>
    //   </div>
    //   <div className="slider-indicators">
    //     {images.map((_, index) => (
    //       <span
    //         key={index}
    //         className={`slider-indicator ${index === imageIndex ? 'active' : ''}`}
    //         onClick={() => handleDotClick(index)}>
    //       </span>
    //     ))}
    //   </div>
    // </section>
  )
}
