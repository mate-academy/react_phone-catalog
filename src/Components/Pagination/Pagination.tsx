import { useEffect, useState } from 'react';
import { ChevronLeft } from '../../SVG/ChevronLeft/ChevronLeft';
import { ChevronRight } from '../../SVG/ChevronRight/ChevronRight';
import './Pagination.scss';

type Props = {
  pageSelected: number;
  setPageSelected: React.Dispatch<React.SetStateAction<number>>;
  perPageParam: string | null;
  catalogLength: number | undefined;
};

export const Pagination: React.FC<Props> = (
  {
    pageSelected,
    setPageSelected,
    perPageParam,
    catalogLength,
  },
) => {
  const [arrayOfNumbers, setArrayOfNumbers] = useState<number[]>([]);

  useEffect(() => {
    if (catalogLength && perPageParam) {
      setArrayOfNumbers(
        new Array(Math.ceil(catalogLength / Number(perPageParam)))
          .fill(1)
          .map((_, index) => {
            return index + 1;
          }),
      );
    }
  }, [catalogLength, perPageParam]);

  return (
    <div className="Pagination">
      {
        perPageParam && catalogLength && (
          <div className="Pagination__wrapper">
            <button
              type="button"
              className="Pagination__arrow"
              onClick={() => {
                if (pageSelected > 1) {
                  setPageSelected(prev => prev - 1);
                }
              }}
            >
              <ChevronLeft />
            </button>
            <div className="Pagination__pages">
              {
                arrayOfNumbers.length > 0 && (
                  arrayOfNumbers.map((element) => {
                    return (
                      <button
                        key={element}
                        type="button"
                        className={`Pagination__page ${pageSelected === Number(element) && 'Selected'}`}
                        onClick={() => {
                          setPageSelected(Number(element));
                        }}
                      >
                        {element}
                      </button>
                    );
                  })
                )
              }
            </div>
            <button
              type="button"
              className="Pagination__arrow"
              onClick={() => {
                if (
                  pageSelected
                  < Math.ceil(catalogLength / Number(perPageParam))
                ) {
                  setPageSelected(prev => prev + 1);
                }
              }}
            >
              <ChevronRight />
            </button>
          </div>
        )
      }
    </div>
  );
};
