import styles from './BannerSlider.module.scss';
import ChevronIcon from '../../img/icons/ChevronIcon.svg';
import React, {useState} from 'react';



export const BannerSlider: React.FC = () => {

  const sliderImages = [
    './img/banner-1.png',
    './img/banner-2.png',
    './img/banner-3.png'
  ]

  let [displayedImageIndex, setDisplayedImageIndex] = useState(0)

  const incrementDisplayedImageIndex = () => {
    if(displayedImageIndex === sliderImages.length-1) {
      displayedImageIndex = 0;

    } else {
      displayedImageIndex++

    }
    setDisplayedImageIndex(displayedImageIndex)
  }

  const decrementDisplayedImageIndex = () => {
    if(displayedImageIndex === 0) {
      displayedImageIndex = (sliderImages.length-1)

    } else {
      displayedImageIndex--

    }
    setDisplayedImageIndex(displayedImageIndex)
  }

    setTimeout(incrementDisplayedImageIndex,3000);


  return (
    <div className={styles.bannerSlider}>
      <div className={styles.topWrapper}>
        <div className={styles.buttons}>
          <button className={styles.arrowButton} onClick={decrementDisplayedImageIndex}>
            <img src={ChevronIcon} alt="scroll" className={styles.iconPrev} />
          </button>

          <div className={styles.container}>
            <div
              className={styles.sliderWrapper}
              style={{ transform: `translateX(-${displayedImageIndex * 100}%)` }}
            >
              {sliderImages.map((image, index) => (
                <img key={index} src={image} className={styles.slide} alt={`Slide ${index + 1}`} />
              ))}
            </div>
          </div>

          <button className={styles.arrowButton} onClick={incrementDisplayedImageIndex}>
            <img src={ChevronIcon} alt="scroll" className={styles.iconNext} />
          </button>
        </div>
      </div>
    </div>
  );
};
