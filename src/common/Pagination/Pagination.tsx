import { useEffect, useRef, useState } from 'react';
import { Button } from '../Button/Button';
import './Pagination.scss';

type Props = {
  setCurrentPage: (value: number) => void,
  currentPage: number,
  totalPages: number,
};

export const Pagination: React.FC<Props> = ({
  setCurrentPage, currentPage, totalPages,
}) => {
  const ref = useRef<any>(null);
  const [elementWidth, setElementWidth] = useState(0);
  const [blockWidth, setBlockWidth] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);

  useEffect(() => {
    setElementWidth(ref.current.offsetWidth);
    setBlockWidth(ref.current.offsetWidth * 5);
  }, []);

  const isSelected = (one: number) => {
    return currentPage === one;
  };

  const movePagesRight = () => {
    if (marginLeft < totalPages * elementWidth) {
      if (totalPages < 5) {
        setMarginLeft(0);
        setCurrentPage(currentPage + 1);

        return;
      }

      if (totalPages === currentPage) {
        setMarginLeft((totalPages - 5) * elementWidth);

        return;
      }

      if (
        totalPages === currentPage + 1
        || totalPages === currentPage + 2
        || totalPages === currentPage + 3
        || totalPages === currentPage + 4
      ) {
        setMarginLeft((totalPages - 5) * elementWidth);
        setCurrentPage(currentPage + 1);

        return;
      }

      if (totalPages > 5) {
        setMarginLeft(marginLeft + elementWidth);
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const movePagesLeft = () => {
    if (currentPage === 1) {
      setMarginLeft(0);

      return;
    }

    if (
      currentPage === 2
      || currentPage === 3
      || currentPage === 4
      || currentPage === 5
    ) {
      setMarginLeft(0);
      setCurrentPage(currentPage - 1);

      return;
    }

    if (currentPage > 1) {
      setMarginLeft(marginLeft - elementWidth);
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    if (totalPages <= currentPage) {
      setMarginLeft((totalPages - 5) * elementWidth);
    }

    // if (currentPage < totalPages) {
    //   console.log(marginLeft)
    //   setMarginLeft(marginLeft + (elementWidth * 2))

    // }
  }, [totalPages]);

  return (
    <div
      className="product-page__block"
    >
      <Button
        className="arrow left small"
        image="icons/Chevron (Arrow Left).svg"
        alt="arrow-left"
        onClick={movePagesLeft}
      />
      <div
        className="product-page__buttons"
        style={{
          minWidth: `${blockWidth}px`,
          maxWidth: `${blockWidth}px`,
        }}
      >
        <ul
          style={{ marginLeft: `${-marginLeft}px` }}
          className="product-page__buttons-list"
        >
          {
            [...Array(totalPages)].map((one, index: number) => {
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
                    alt={String(index + 1)}
                  />
                </li>
              );
            })
          }
        </ul>
      </div>
      <Button
        className="arrow right small pagination-right"
        image="icons/Chevron (Arrow Right).svg"
        onClick={movePagesRight}
        alt="arrow-right"
      />
    </div>
  );
};
