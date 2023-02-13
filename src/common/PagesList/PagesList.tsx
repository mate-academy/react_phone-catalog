import { useEffect, useRef, useState } from 'react';
import { Button } from '../Button/Button';
import './PagesList.scss';

export const PagesList: React.FC<any> = ({
  setCurrentPage, currentPage, buttonsNumber,
}) => {
  const [initialWidth, setInitialWidth] = useState<any>(0);
  const ref = useRef<any>(null);
  const [width, setWidth] = useState(0);
  const [divWidth, setDivWidth] = useState(0);

  const maxMargin = initialWidth * (buttonsNumber - 6);
  const moveRight = () => {
    if (width <= maxMargin) {
      setWidth(currentPage * ref.current.offsetWidth);
    }
  };

  const moveLeft = () => {
    if (width > 0) {
      setWidth(width - ref.current.offsetWidth);
    }
  };

  const isSelected = (one: any) => {
    return currentPage === one;
  };

  useEffect(() => {
    setDivWidth(ref.current.offsetWidth * 5);
    setInitialWidth(ref.current.offsetWidth);
  }, []);

  return (
    <div
      className="product-page__block"
    >
      <Button
        className="arrow left small"
        image="/icons/Chevron (Arrow Left).svg"
        alt="<"
        onClick={() => {
          if (currentPage <= 1) {
            return;
          }

          setCurrentPage((prev: number) => prev - 1);
          moveLeft();
        }}
      />
      <div
        className="product-page__buttons"
        style={{ maxWidth: `${divWidth}px` }}
      >
        <ul
          style={{ marginLeft: `${-width}px` }}
          className="product-page__buttons-list"
        >
          {
            [...Array(buttonsNumber)].map((one, index) => {
              return (
                <li
                  ref={ref}
                  key={one}
                  className="product-page__buttons-item"
                >
                  <Button
                    className={`arrow small ${isSelected(index + 1) && 'active-button'}`}
                    onClick={() => {
                      setCurrentPage(index + 1);
                    }}
                    num={index + 1}
                    alt={index + 1}

                  />
                </li>
              );
              // }
            })
          }
        </ul>
      </div>
      <Button
        className="arrow right small"
        image="/icons/Chevron (Arrow Right).svg"
        onClick={() => {
          if (currentPage >= buttonsNumber) {
            return;
          }

          setCurrentPage((prev: number) => prev + 1);
          moveRight();
        }}
        alt=">"
      />
    </div>
  );
};
