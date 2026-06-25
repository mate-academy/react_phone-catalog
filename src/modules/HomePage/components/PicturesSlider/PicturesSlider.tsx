import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '../../../shared/ui/Icons/Icons';
import styles from './PicturesSlider.module.scss';

export type SlideItem = {
  image: string;
  alt: string;
  link?: string;
};

type Props = {
  items: SlideItem[];
  interval?: number;
};

export const PicturesSlider = ({ items, interval = 5000 }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [items.length, interval]);

  const goTo = (index: number) => {
    setCurrentIndex(((index % items.length) + items.length) % items.length);
  };

  if (items.length === 0) {
    return null;
  }

  const current = items[currentIndex];

  const image = (
    <img src={current.image} alt={current.alt} className={styles.image} />
  );

  return (
    <section className={styles.slider} aria-label="Banner principal">
      <div className={styles.viewport}>
        {current.link ? (
          <Link to={current.link} className={styles.imageLink}>
            {image}
          </Link>
        ) : (
          image
        )}

        <button
          type="button"
          className={cn(styles.arrow, styles.arrowLeft)}
          onClick={() => goTo(currentIndex - 1)}
          aria-label="Imagem anterior"
        >
          <ChevronLeftIcon />
        </button>

        <button
          type="button"
          className={cn(styles.arrow, styles.arrowRight)}
          onClick={() => goTo(currentIndex + 1)}
          aria-label="Próxima imagem"
        >
          <ChevronRightIcon />
        </button>

        <div className={styles.dots}>
          {items.map((item, index) => (
            <button
              key={item.image}
              type="button"
              className={cn(styles.dot, {
                [styles.dotActive]: index === currentIndex,
              })}
              onClick={() => goTo(index)}
              aria-label={`Ir para o slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
