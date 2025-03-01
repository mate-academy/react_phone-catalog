import { useState, useEffect } from "react";
import "./MainSlider.scss";

export const MainSlider = () => {
  const slides = [
    { path: "/img/main-banners/banner-accessories.png" },
    { path: "/img/main-banners/banner-phones.png" },
    { path: "/img/main-banners/banner-tablets.png" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Автоматична зміна слайдів кожні 3 секунди (можеш закоментувати)
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     nextSlide();
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="slider-container">
     

      <div className="slider">
      <button className="slider-btn prev" onClick={prevSlide}>
        ❮
      </button>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? "active" : ""}`}
          >
            <img src={slide.path} alt={`Slide ${index + 1}`} />
          </div>
        ))}
        <button className="slider-btn next" onClick={nextSlide}>
        ❯
      </button>
      </div>

      

      <div className="pagination">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
