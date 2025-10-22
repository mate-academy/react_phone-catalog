// CustomBannerSlider.tsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './CustomBannerSlider.module.scss'; // Використовуємо окремі стилі

// Дані для слайдів (можна імпортувати з іншого файлу)
const initialSlides = [
  {
    id: 1,
    title: 'Now available in our store! 👌',
    subtitle: 'Be the first!',
    btnText: 'ORDER NOW',
    image: '/src/images/hero-iphone-17-pro.jpg',
    rightTitle: 'iPhone 14 Pro',
    rightSubtitle: 'Pro. Beyond.',
  },
  {
    id: 2,
    title: 'The future is here 🚀',
    subtitle: 'Discover iPad Pro 13',
    btnText: 'SHOP NOW',
    image: '/src/images/hero-apple-iPad-Pro-13.jpg',
    rightTitle: 'iPad Pro',
    rightSubtitle: 'Power meets portability.',
  },
  {
    id: 3,
    title: 'New era of watches ⌚',
    subtitle: 'Discover apple watch ultra 3',
    btnText: 'SHOP NOW',
    image: '/src/images/hero-apple-watch-ultra-3.jpg',
    rightTitle: 'Apple Watch Ultra 3',
    rightSubtitle: 'Go further.',
  },
];

const SLIDE_DURATION = 500; // Тривалість анімації (ms)
const AUTOPLAY_INTERVAL = 5000; // Інтервал автопрокрутки (ms)

const CustomBannerSlider: React.FC = () => {
  // Стан для управління порядком слайдів (для нескінченного циклу)
  const [slides, setSlides] = useState(initialSlides);

  // Ref для доступу до DOM-елемента, який буде рухатися
  const sliderInnerRef = useRef<HTMLDivElement>(null);

  // Стан для запобігання багаторазовим клікам під час анімації
  const isAnimatingRef = useRef(false);

  // Функція для переходу до наступного слайда (схожа на вашу JS-логіку)
  const nextSlide = useCallback(() => {
    if (isAnimatingRef.current) {
      return;
    }

    isAnimatingRef.current = true;

    const slider = sliderInnerRef.current;

    if (!slider) {
      return;
    }

    // 1. Анімований зсув
    slider.style.transition = `transform ${SLIDE_DURATION}ms ease-in-out`;
    slider.style.transform = `translateX(-100%)`;

    // 2. Скидання після анімації
    setTimeout(() => {
      // Оновлюємо стан: переміщуємо перший елемент в кінець
      setSlides(prevSlides => [...prevSlides.slice(1), prevSlides[0]]);

      // Скидаємо стилі для миттєвого переходу
      slider.style.transition = 'none';
      slider.style.transform = 'translateX(0)';

      isAnimatingRef.current = false;
    }, SLIDE_DURATION);
  }, []);

  // Функція для переходу до попереднього слайда
  const prevSlide = useCallback(() => {
    if (isAnimatingRef.current) {
      return;
    }

    isAnimatingRef.current = true;

    const slider = sliderInnerRef.current;

    if (!slider) {
      return;
    }

    // 1. Оновлюємо стан: переміщуємо останній елемент на початок
    setSlides(prevSlides => {
      const last = prevSlides[prevSlides.length - 1];
      const rest = prevSlides.slice(0, prevSlides.length - 1);

      return [last, ...rest];
    });

    // Цей таймаут потрібен, щоб React встиг оновити DOM перед застосуванням transition
    // В оригінальному JS це був 'none' + 'transform: -100%' + 'setTimeout(10ms)'
    setTimeout(() => {
      // 2. Миттєвий зсув після переміщення елемента в DOM (React State Update)
      slider.style.transition = 'none';
      slider.style.transform = `translateX(-100%)`;

      // 3. Анімований зсув назад
      setTimeout(() => {
        slider.style.transition = `transform ${SLIDE_DURATION}ms ease-in-out`;
        slider.style.transform = 'translateX(0)';

        isAnimatingRef.current = false;
      }, 10); // Малий таймаут 10 мс для "спрацьовування" анімації
    }, 0); // Таймаут 0 мс для запуску після render
  }, []);

  // Хук для автопрокрутки
  useEffect(() => {
    const intervalId = setInterval(nextSlide, AUTOPLAY_INTERVAL);

    // Cleanup function - очищаємо інтервал при демонтажі компонента
    return () => clearInterval(intervalId);
  }, [nextSlide]); // Перезапускаємо інтервал, якщо nextSlide змінився (завдяки useCallback не зміниться)

  // Хук для адаптивності: встановлення початкового зсуву (для prev/next)
  useEffect(() => {
    // Забезпечуємо початковий зсув -100% для роботи prevSlide (як у вашому JS)
    const slider = sliderInnerRef.current;

    if (slider) {
      // Це потрібно тільки якщо ми використовуємо логіку зсуву для prev/next
      // Оскільки ми керуємо порядком елементів через state, це не завжди необхідно
      // але ми залишаємо це, щоб імітувати вашу JS-логіку.
      slider.style.transform = 'translateX(0)';
    }
  }, []);

  // Функція для визначення поточного активного індикатора (пагінація)
  // Активний слайд - завжди перший елемент у масиві slides
  const getActiveIndex = () => {
    return initialSlides.findIndex(s => s.id === slides[0].id);
  };

  return (
    <div className={styles.sliderList}>
      <button
        className={`${styles.navBtn} ${styles.prevBtn}`}
        onClick={prevSlide}
        aria-label="Previous Slide"
        disabled={isAnimatingRef.current} // Блокування під час анімації
      >
        <img
          className={styles.navBtnImg}
          src="src/images/icons/arrow-left-black.svg"
          alt="arrow left"
        />
      </button>

      <div className={styles.sliderInner} ref={sliderInnerRef}>
        {/* Мапуємо слайди в поточному порядку */}
        {slides.map(slide => (
          <div key={slide.id} className={styles.slide}>
            {/* Контент слайда */}
            <div className={styles.left}>
              <h2>{slide.title}</h2>
              <p>{slide.subtitle}</p>
              <button className={styles.btn}>{slide.btnText}</button>
            </div>

            <div className={styles.right}>
              <div className={styles.rightContent}>
                {slide.rightTitle && <h3>{slide.rightTitle}</h3>}
                {slide.rightSubtitle && <p>{slide.rightSubtitle}</p>}
              </div>
              {/* У реальному проєкті використовуйте <picture> або <img src={...} /> */}
              <img src={slide.image} alt={slide.rightTitle} />
            </div>
          </div>
        ))}
      </div>

      <button
        className={`${styles.navBtn} ${styles.nextBtn}`}
        onClick={nextSlide}
        aria-label="Next Slide"
        disabled={isAnimatingRef.current} // Блокування під час анімації
      >
        <img
          className={styles.navBtnImg}
          src="src/images/icons/arrow-right-black.svg"
          alt="arrow right"
        />
      </button>

      {/* Пагінація */}
      <div className={styles.pagination}>
        {initialSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.customBullet} ${getActiveIndex() === index ? styles.activeBullet : ''}`}
            // Додаємо можливість кліку для переходу до слайда
            onClick={() => {
              // Логіка кліку на пагінацію вимагає більшої складності
              // Для простоти, ми можемо реалізувати простий перехід до наступного
              // або просто залишити лише індикацію.
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomBannerSlider;
