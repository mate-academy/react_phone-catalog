import './SimilarProduct.scss';
import { Link } from 'react-router-dom';
import { Product } from '../Product';
import React, { useRef, useState, useEffect } from 'react';
import { ProductItem } from '../types/Phone';
import classNames from 'classnames';

interface Props {
  products: ProductItem[];
  title: string;
  link?: boolean;
}

export const SimilarProduct: React.FC<Props> = ({ products, title, link }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState<number>(0);
  const [maxScroll, setMaxScroll] = useState<number>(0);

  useEffect(() => {
    const el = sliderRef.current;

    if (el) {
      setMaxScroll(el.scrollWidth - el.clientWidth);
    }
  }, [products]);

  const scrollSlider = (direction: number) => {
    const el = sliderRef.current;

    if (!el) {
      return;
    }

    const start = el.scrollLeft;
    let end = start + direction * 288;

    if (end < 0) {
      end = 0;
    }

    if (end > maxScroll) {
      end = maxScroll;
    }

    const duration = 200;
    const startTime = performance.now();

    const animate = (t: number) => {
      const progress = Math.min((t - startTime) / duration, 1);

      el.scrollLeft = start + (end - start) * progress;
      setScroll(el.scrollLeft);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <section className="similar-products-wrapper">
      <div className="title-with-buttons">
        <h1 className="slider-title">{title}</h1>
        <div className="buttons__slider">
          <button
            onClick={() => scrollSlider(-1)}
            className={classNames('button__move-catalog', {
              'is-disabled': scroll === 0,
            })}
            disabled={scroll === 0}
          >
            <img
              className="button__left"
              src="../../../public/imgForProject/icon/Catalog_Right-button.png"
              alt="left"
            />
          </button>

          <button
            onClick={() => scrollSlider(1)}
            className={classNames('button__move-catalog', {
              'is-disabled': scroll >= maxScroll,
            })}
            disabled={scroll >= maxScroll}
          >
            <img
              src="../../../public/imgForProject/icon/Catalog_Right-button.png"
              alt="right"
            />
          </button>
        </div>
      </div>

      <div className="similar-products" ref={sliderRef}>
        {products.map(item => (
          <Link
            to={`${link ? item.category : '..'}/${item.itemId}`}
            key={item.id}
            className="card card_in_similar-page"
          >
            <Product product={item} />
          </Link>
        ))}
      </div>
    </section>
  );
};
