import { useState } from "react";
import { Props } from "../types";

export function ProductSlider({ products }: Props) {
  const [current, setCurrent] = useState(0);

  function nextSlide() {
    setCurrent((prev) => (prev + 1) % products.length);
  }

  function prevSlide() {
    setCurrent((prev) =>
      prev === 0 ? products.length - 1 : prev - 1
    );
  }

  const product = products[current];

  return (
    <div className="slider">
      <button onClick={prevSlide} className="nav left">
        {"<"}
      </button>

      <div className="slide">
        <div className="slide-content">
          <h2>{product.title}</h2>
          {product.subtitle && <p>{product.subtitle}</p>}
          {product.ctaText && (
            <button>{product.ctaText}</button>
          )}
        </div>

        <div className="slide-image">
          <img src={product.image} alt={product.title} />
        </div>
      </div>

      <button onClick={nextSlide} className="nav right">
        {">"}
      </button>
    </div>
  );
}