import {
  useEffect, useState, Children, cloneElement,
} from 'react';
import './Carousel.scss';

const PAGE_WIDTH = 1040;

export const Carousel = ({ children }: any) => {
  const [pages, setPages] = useState([]);
  const [offset, setOffset] = useState(0);
  const [activeDot, setActiveDot] = useState(0);

  const handleLeftClick = () => {
    setOffset(currentOffset => {
      const newOffset = currentOffset + PAGE_WIDTH;
      const newActiveDot = Math.max(activeDot - 1, 0);

      if (newOffset > 0) {
        setActiveDot(pages.length - 1);

        return -(PAGE_WIDTH * (pages.length - 1));
      }

      setActiveDot(newActiveDot);

      return newOffset;
    });
  };

  const handleRightClick = () => {
    setOffset(currentOffset => {
      const newOffset = currentOffset - PAGE_WIDTH;
      const maxOffset = -(PAGE_WIDTH * (pages.length - 1));

      if (newOffset < maxOffset) {
        setActiveDot(0);

        return 0;
      }

      const newActiveDot = Math.abs(newOffset / PAGE_WIDTH);

      setActiveDot(newActiveDot);

      return newOffset;
    });
  };

  useEffect(() => {
    setPages(
      Children.map(children, child => {
        return cloneElement(child, {
          style: {
            height: '100%',
            minWidth: `${PAGE_WIDTH}px`,
            maxWidth: `${PAGE_WIDTH}px`,
          },
        });
      }),
    );
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleRightClick();
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [offset, pages.length]);

  return (
    <div className="div-for-dots">
      <div className="main-container">
        <div>
          <button
            type="button"
            className="button-left"
            aria-label="Scroll left"
            onClick={handleLeftClick}
          />
        </div>

        <div className="window">
          <div
            className="all-pages-container"
            style={{
              transform: `translateX(${offset}px)`,
            }}
          >
            {pages}
          </div>
        </div>

        <div>
          <button
            type="button"
            className="button-right"
            aria-label="Scroll right"
            onClick={handleRightClick}
          />
        </div>

      </div>

      <div className="dots">
        <div className={`dots-1 ${activeDot === 0 ? 'active' : ''}`} />
        <div className={`dots-2 ${activeDot === 1 ? 'active' : ''}`} />
        <div className={`dots-3 ${activeDot === 2 ? 'active' : ''}`} />
      </div>
    </div>
  );
};
