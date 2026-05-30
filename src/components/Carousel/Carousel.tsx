//react
import React from 'react';

//hooks
import { useState, useRef, useEffect } from 'react';

//styles
import styles from './Carousel.module.scss';

//assets
import arrowIcon from './assets/icons/Arrow.svg';

//components
import { Button } from '../Button';
import { Loader } from '../Loader';

//services
import classNames from 'classnames';

type Props = {
  title: string;
  children: React.ReactNode;
  loaderStyle?: string;
  className?: string;
  isLoading?: boolean;
};

export const Carousel: React.FC<Props> = ({
  title,
  children,
  loaderStyle,
  className,
  isLoading,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<number>(0);

  const getLimit = () => {
    if (!containerRef.current || !rowRef.current) {
      return 0;
    }

    const containerWidth = containerRef.current.offsetWidth;
    const rowWidth = rowRef.current.scrollWidth;

    return containerWidth - rowWidth;
  };

  const getItemWidth = () => {
    if (!rowRef.current) {
      return 0;
    }

    const itemsCount = React.Children.count(children);

    if (itemsCount === 0) {
      return 0;
    }

    return rowRef.current.scrollWidth / itemsCount;
  };

  const move = (delta: number) => {
    const limit = getLimit();

    setPosition(prev => {
      const next = prev + delta;

      if (next > 0) {
        return 0;
      }

      if (next < limit) {
        return limit;
      }

      return next;
    });
  };

  const moveByOne = (dir: 'left' | 'right') => {
    const itemWidth = getItemWidth();

    if (!itemWidth) {
      return;
    }

    move(dir === 'left' ? itemWidth : -itemWidth);
  };

  useEffect(() => {
    const handleResize = () => {
      setPosition(prev => {
        const limit = getLimit();

        return Math.max(Math.min(prev, 0), limit);
      });
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={classNames(styles.carousel, className)}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles['swipe-buttons']}>
          <Button variant="iconType" onClick={() => moveByOne('left')}>
            <img
              src={arrowIcon}
              alt="Left Arrow"
              className={styles['left-arrow']}
            />
          </Button>

          <Button variant="iconType" onClick={() => moveByOne('right')}>
            <img src={arrowIcon} alt="Right Arrow" />
          </Button>
        </div>
      </div>

      <div className={styles.products}>
        {isLoading && (
          <Loader className={classNames(styles.loader, loaderStyle)} />
        )}
        {children && (
          <div className={styles.window} ref={containerRef}>
            <div
              className={styles.items}
              style={{
                transform: `translateX(${position}px)`,
              }}
              ref={rowRef}
            >
              {children}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
