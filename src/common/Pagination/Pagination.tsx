import React, { useEffect, useRef, useState } from 'react';
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
  const [leftButtonClass, setLeftButtonClass] = useState<string>('');
  const [rightButtonClass, setRightButtonClass] = useState<string>('');

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

    if ([2, 3, 4, 5].includes(currentPage)) {
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
    setRightButtonClass('button-right__active');
    setLeftButtonClass('button-right__active');
    if (totalPages <= currentPage) {
      setMarginLeft((totalPages - 5) * elementWidth);
    }

    if (totalPages === currentPage) {
      setRightButtonClass('');
    }

    if (currentPage <= 1) {
      setLeftButtonClass('');
    }
  }, [totalPages, currentPage]);

  return (
    <div
      className="product-page__block"
    >
      <Button
        className="arrow left small"
        image="icons/Chevron (Arrow Left).svg"
        alt="arrow-left"
        onClick={movePagesLeft}
        imageClass={leftButtonClass}
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
            [...Array(totalPages)].map((_one, index: number) => {
              const keyIndex = index;

              return (
                <li
                  key={keyIndex}
                  ref={ref}
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
        imageClass={rightButtonClass}
      />
    </div>
  );
};
