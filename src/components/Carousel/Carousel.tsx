import { useEffect, useRef, useState } from 'react';
import Card from '../Card/Card';
import styles from './style.module.scss';

interface Product {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

interface CarouselProps {
  title?: string;
  type?: 'hot-prices' | 'brand-new' | 'recommendations';
  currentProductId?: string;
  currentCategory?: string;
}

const Carousel = ({
  title = 'You may also like',
  type = 'recommendations',
  currentProductId,
  currentCategory,
}: CarouselProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.BASE_URL}api/products.json`,
        );
        const data: Product[] = await response.json();

        let filteredProducts: Product[] = [];

        if (type === 'hot-prices') {
          filteredProducts = [...data]
            .sort((a, b) => {
              const discountA = a.fullPrice - a.price;
              const discountB = b.fullPrice - b.price;

              return discountB - discountA;
            })
            .slice(0, 10);
        } else if (type === 'brand-new') {
          const uniqueModels = new Map<string, Product>();

          data.forEach(product => {
            const baseModelId = product.itemId.split('-').slice(0, 3).join('-');

            if (
              !uniqueModels.has(baseModelId) ||
              product.capacity === '128GB'
            ) {
              uniqueModels.set(baseModelId, product);
            }
          });
          filteredProducts = Array.from(uniqueModels.values())
            .sort((a, b) => b.year - a.year)
            .slice(0, 10);
        } else if (type === 'recommendations') {
          filteredProducts = data
            .filter(product => {
              if (product.itemId === currentProductId) {
                return false;
              }

              if (currentCategory && product.category !== currentCategory) {
                return false;
              }

              return true;
            })
            .sort(() => Math.random() - 0.5)
            .slice(0, 12);
        }

        setProducts(filteredProducts);
      } catch (error) {
        setProducts([]);
      }
    };

    fetchProducts();
  }, [type, currentProductId, currentCategory]);

  const checkScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const carousel = carouselRef.current;

    if (carousel) {
      carousel.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);

      return () => {
        carousel.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, [products]);

  const handleScrollLeft = () => {
    if (carouselRef.current) {
      const cardWidth = 272;

      carouselRef.current.scrollBy({
        left: -cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollRight = () => {
    if (carouselRef.current) {
      const cardWidth = 272;

      carouselRef.current.scrollBy({
        left: cardWidth,
        behavior: 'smooth',
      });
    }
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <section className={styles.modelCatalog}>
      <div className={styles.modelCatalog_label}>
        <h2>{title}</h2>
        <div className={styles.modelCatalog_label_buttons}>
          <button
            className={`${styles.modelCatalog_label_buttons_arrow} ${!canScrollLeft ? styles.disabled : ''}`}
            onClick={handleScrollLeft}
            aria-label="Scroll left"
          >
            <img
              src={`${import.meta.env.BASE_URL}img/icons/Arrow_Left.svg`}
              alt="Previous"
            />
          </button>
          <button
            className={`${styles.modelCatalog_label_buttons_arrow} ${!canScrollRight ? styles.disabled : ''}`}
            onClick={handleScrollRight}
            aria-label="Scroll right"
          >
            <img
              src={`${import.meta.env.BASE_URL}img/icons/Arrow_Right.svg`}
              alt="Next"
            />
          </button>
        </div>
      </div>
      <div className={styles.modelCatalog_carousel} ref={carouselRef}>
        <div className={styles.modelCatalog_carousel_list}>
          {products.map(product => (
            <Card
              key={product.id}
              product={product}
              showDiscount={type === 'hot-prices'}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
