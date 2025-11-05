import { useEffect, useState } from 'react';
import styles from './PicturesSlider.module.scss';
import { Slider } from '../Slider';
import { NavButton } from '../../../shared/components/NavButton';
import { useNavigate } from 'react-router-dom';
import { scrollToTop } from '../../../shared/navigate/ToTop';

export const PicturesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const scrollToCategories = () => {
    const categoriesSection = document.getElementById('categories');

    if (categoriesSection) {
      categoriesSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const scrollToSale = () => {
    const saleSection = document.getElementById('sale');

    if (saleSection) {
      saleSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const openProduct = () => {
    navigate('/phones/product/81');
    scrollToTop();
  };

  const images = [
    {
      img: './img/image/SliderImg/1.svg',
      alt: 'Img1',
      name: 'iPhone 14 Pro',
      text: 'Be the first!',
      model: 'Pro. Beyond.',
      link: openProduct,
      title: 'Now available in our store!',
      button: 'Order now',
    },
    {
      img: '',
      alt: '',
      name: 'Shop by Category',
      text: 'All models.',
      model: 'Take your pick.',
      title: 'Shopping Guides',
      button: 'Take a look',
      link: scrollToCategories,
    },
    {
      img: './img/image/SliderImg/3.png',
      alt: 'Img3',
      model: '',
      name: 'iPhones for sale',
      text: 'Savings and offers.',
      title: 'Exclusive deals',
      button: 'See all',
      link: scrollToSale,
    },
  ];

  const goNext = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  };

  const goPrev = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 500000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={styles.picturesSlider}>
      <div className={styles.sliderTrack}>
        <NavButton
          onClick={goPrev}
          childrenValue={'./img/image/Icons/VectorLeft.svg'}
          slider={true}
        />
        <Slider image={images[currentIndex]} />
        <NavButton
          onClick={goNext}
          childrenValue={'./img/image/Icons/VectorRight.svg'}
          slider={true}
        />
      </div>

      <div className={styles.pagination}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              currentIndex === index ? styles.active : ''
            }`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};
