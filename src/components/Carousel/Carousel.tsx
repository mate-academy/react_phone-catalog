import {
  useEffect,
  useState,
  Children,
  cloneElement,
  ReactElement,
} from 'react';
import cn from 'classnames';

import { CarouselDots } from '../CarouselDots/CarouselDots';

import './Carousel.scss';

type Props = {
  children: React.ReactNode;
};
// type CL = ReturnType<typeof cloneElement>;

let childrenKeys: { key: string }[] = [];

export const Carousel: React.FC<Props> = ({ children }) => {
  const [pages, setPages] = useState<ReactElement[]>([]);
  const [activeDot, setActiveDot] = useState(0);

  const handleLeftClick = () => {
    setPages((crntPages) => {
      const updatedPages = Children.map(
        [crntPages[crntPages.length - 1], ...crntPages.slice(0, -1)],
        (page) => cloneElement(page, {
          className: cn(
            'Carousel__img',
            'Carousel__img__animation',
            'Carousel__img__animation--slip-left',
          ),
        }),
      );

      setActiveDot((crntDot) => {
        return (+crntDot + (updatedPages.length - 1)) % updatedPages.length;
      });

      return updatedPages;
    });
  };

  const handleRightClick = () => {
    setPages((crntPages) => {
      const updatedPages = Children.map(
        [...crntPages.slice(1), crntPages[0]],
        (page) => cloneElement(page, {
          className: cn(
            'Carousel__img',
            'Carousel__img__animation',
            'Carousel__img__animation--slip-right',
          ),
        }),
      );

      setActiveDot((crntDot) => {
        return (crntDot + 1) % updatedPages.length;
      });

      return updatedPages;
    });
  };

  useEffect(() => {
    childrenKeys = Children.map(children, child => ({
      key: (child as ReactElement)?.key || '',
    })) as { key: string }[];

    console.info(childrenKeys);// eslint-disable-line
    setPages(
      Children.map(children as ReactElement[], child => {
        return cloneElement(child, {
          className: cn('Carousel__img', 'Carousel__img__animation'),
        });
      }),
    );
  }, [children]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleRightClick();
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [pages]);

  return (
    <div className="Carousel Carousel__container">
      <div className="Carousel__content">
        <button
          type="button"
          className={cn('ProductsSlider__button',
            'ProductsSlider__button--defualt',
            'Carousel__button')}
          aria-label="scrollLeft"
          onClick={handleLeftClick}
        >
          <i className="ProductsSlider__icon icon--arrow-left" />
        </button>

        <div className="Carousel__screen">
          <div className="Carousel__imgs">
            {pages}
          </div>
        </div>

        <button
          type="button"
          className={cn('ProductsSlider__button',
            'ProductsSlider__button--defualt',
            'Carousel__button')}
          aria-label="scrollRight"
          onClick={handleRightClick}
        >
          <i className="ProductsSlider__icon icon--arrow-right" />
        </button>
      </div>

      <CarouselDots
        items={childrenKeys}
        activeDot={activeDot}
      />
    </div>
  );
};
