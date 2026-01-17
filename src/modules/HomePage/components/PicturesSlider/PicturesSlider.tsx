import { useEffect, useState } from 'react';
import styles from './PicturesSlider.module.scss';

const slides = [
  {
    id: 'iphone-14-pro',
    title: 'Now available in our store!',
    subtitle: 'Be the first!',
    productName: 'iPhone 14 Pro',
    productSlogan: 'Pro. Beyond.',
    image: '../../../../../public/img/category-phones.webp',
  },
  {
    id: 'ipad-pro',
    title: 'New Tablets Arrived!',
    subtitle: 'Supercharged.',
    productName: 'iPad Pro',
    productSlogan: 'M1 Chip inside.',
    image: '../../../../../public/img/category-tablets.png',
  },
  {
    id: 'apple-watch',
    title: 'Accessories Collection',
    subtitle: 'Enhance your life.',
    productName: 'Apple Watch',
    productSlogan: 'S6 Chip inside.',
    image: '../../../../../public/img/category-accessories.webp',
  },
];

export const PicturesSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.banner}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>

      <div className={styles.container}>
        {/* Arrows */}
        <button
          className={`${styles.navButton} ${styles.prev}`}
          onClick={handlePrev}
          aria-label="Previous slide"
        />
        <button
          className={`${styles.navButton} ${styles.next}`}
          onClick={handleNext}
          aria-label="Next slide"
        />

        {/* Slider */}
        <div className={styles.sliderWrapper}>
          <div className={styles.sliderWindow}>
            <div
              className={styles.sliderTrack}
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
              }}
            >
              {slides.map(slide => (
                <div key={slide.id} className={styles.slide}>
                  <div className={styles.textSection}>
                    <h2 className={styles.gradientTitle}>
                      <span className={styles.gradientText}>{slide.title}</span>
                    </h2>
                    <p className={styles.subtitle}>{slide.subtitle}</p>
                    <button className={styles.orderButton}>ORDER NOW</button>
                  </div>

                  <div className={styles.imageSection}>
                    <div className={styles.productInfo}>
                      <h3 className={styles.productName}>
                        {slide.productName}
                      </h3>
                      <p className={styles.productSlogan}>
                        {slide.productSlogan}
                      </p>
                    </div>

                    <div className={styles.imageContainer}>
                      <img
                        src={slide.image}
                        alt={slide.productName}
                        className={styles.productImg}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                className={`${styles.dot} ${
                  index === activeIndex ? styles.active : ''
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
