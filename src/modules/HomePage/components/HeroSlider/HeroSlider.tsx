import styles from './HeroSlider.module.scss';
import { slides } from './slides';
import { useEffect, useState } from 'react';

export const HeroSlider = () => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const imageContainerClassName = 'picturesSlider__imageContainer';

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setCurrentSlideIndex(currentIndex => {
                if (currentIndex === slides.length - 1) {
                    return 0;
                }

                return currentIndex + 1;
            });
        }, 5000);

        return () => {
            window.clearInterval(intervalId);
        };
    }, []);

    const goToSlide = (slideIndex: number) => {
        setCurrentSlideIndex(slideIndex);
    };

    const showPreviousSlide = () => {
        setCurrentSlideIndex(currentIndex => {
            if (currentIndex === 0) {
                return slides.length - 1;
            }

            return currentIndex - 1;
        });
    };

    const showNextSlide = () => {
        setCurrentSlideIndex(currentIndex => {
            if (currentIndex === slides.length - 1) {
                return 0;
            }

            return currentIndex + 1;
        });
    };

    return (
        <section
            className={styles.picturesSlider}
            aria-label="Featured products"
            aria-roledescription="carousel"
        >
            <div className={styles.picturesSlider__carousel}>
                <button
                    className={`${styles.picturesSlider__arrow} ${styles['picturesSlider__arrow--previous']}`}
                    type="button"
                    onClick={showPreviousSlide}
                    aria-label="Show previous slide"
                />
                <div className={styles.picturesSlider__viewport}>
                    <div
                        className={styles.picturesSlider__track}
                        style={{
                            transform: `translateX(-${currentSlideIndex * 100}%)`,
                        }}
                    >
                        {slides.map((slide, index) => (
                            <article
                                key={slide.id}
                                className={styles.picturesSlider__slide}
                                aria-hidden={currentSlideIndex !== index}
                            >
                                <div
                                    className={
                                        styles.picturesSlider__headingContainer
                                    }
                                >
                                    <h2
                                        className={
                                            styles.picturesSlider__heading
                                        }
                                    >
                                        {slide.heading}
                                    </h2>
                                    <p
                                        className={
                                            styles.picturesSlider__tagline_2
                                        }
                                    >
                                        Be the first.
                                    </p>
                                    <div
                                        className={
                                            styles.picturesSlider__orderNow
                                        }
                                    >
                                        ORDER NOW
                                    </div>
                                </div>

                                <div className={styles.picturesSlider__product}>
                                    <h3
                                        className={
                                            styles.picturesSlider__productName
                                        }
                                    >
                                        {slide.productName}
                                    </h3>

                                    <p
                                        className={
                                            styles.picturesSlider__tagline
                                        }
                                    >
                                        {slide.tagline}
                                    </p>

                                    <div
                                        className={
                                            styles[imageContainerClassName]
                                        }
                                    >
                                        <img
                                            className={
                                                styles.picturesSlider__image
                                            }
                                            src={slide.image}
                                            alt={slide.imageAlt}
                                        />
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
                <button
                    className={`${styles.picturesSlider__arrow} ${styles['picturesSlider__arrow--next']}`}
                    type="button"
                    onClick={showNextSlide}
                    aria-label="Show next slide"
                />
            </div>
            <div
                className={styles.picturesSlider__indicators}
                aria-label="Choose a slide"
            >
                {slides.map((slide, index) => {
                    const isActive = currentSlideIndex === index;
                    const indicatorClassName = `${styles.picturesSlider__indicator} ${
                        isActive
                            ? styles['picturesSlider__indicator--active']
                            : ''
                    }`;

                    return (
                        <button
                            key={slide.id}
                            className={indicatorClassName}
                            type="button"
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            aria-current={isActive ? 'true' : undefined}
                        />
                    );
                })}
            </div>
        </section>
    );
};
