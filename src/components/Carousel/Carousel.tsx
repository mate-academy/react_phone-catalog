import {
  useEffect, useState, Children, cloneElement,
} from 'react';
import './Carousel.scss';

type Props = {
  children: React.ReactNode;
};

export const Carousel:React.FC<Props> = ({ children }) => {
  const [pages, setPages] = useState([]);
  const [activeDot, setActiveDot] = useState(0);

  const handleLeftClick = () => {
    setPages((crntPages) => {
      const updatedPages: [] = Children.map(
        [crntPages[crntPages.length - 1], ...crntPages.slice(0, -1)],
        (page) => cloneElement(page, {
          className: 'Screen__img Screen__img--animation',
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
      const updatedPages: [] = Children.map(
        [...crntPages.slice(1), crntPages[0]],
        (page) => cloneElement(page, {
          className: 'Screen__img Screen__img--animation',
        }),
      );

      setActiveDot((crntDot) => {
        return (crntDot + 1) % updatedPages.length;
      });

      return updatedPages;
    });
  };

  useEffect(() => {
    setPages(
      Children.map(children as never[], child => {
        return cloneElement(child, {
          className: 'Screen__img Screen__img--animation',
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
    <div className="Carousel__container">
      <div className="Screen__container">
        <button
          type="button"
          className="Screen__btn icon--arrow-left"
          aria-label="scrollLeft"
          onClick={handleLeftClick}
        />

        <div className="Screen__window">
          {pages}
        </div>

        <button
          type="button"
          className="Screen__btn icon--arrow-right"
          aria-label="scrollRight"
          onClick={handleRightClick}
        />
      </div>

      <div className="dots">
        <div className={`dots-1 ${activeDot === 0 ? 'active' : ''}`} />
        <div className={`dots-2 ${activeDot === 1 ? 'active' : ''}`} />
        <div className={`dots-3 ${activeDot === 2 ? 'active' : ''}`} />
      </div>
    </div>
  );
};
