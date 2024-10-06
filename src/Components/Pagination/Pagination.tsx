import { useContext } from 'react';
import { CatalogContext } from '../CatalogProvider';
import { Product } from '../types/Product';
import './Pagination.scss';
import classNames from 'classnames';

type Props = {
  filteredItems: Product[];
};

export const Pagination = ({ filteredItems }: Props) => {
  const {
    setPageNumber,
    setSlidePages,
    pageNumber,
    slidePages,
    itemsPerPage,
    slideDots,
    setSlideDots,
  } = useContext(CatalogContext);

  const amountOfPages = Math.ceil(filteredItems.length / +itemsPerPage);

  const getPagination = (pages: number) => {
    const pagination: number[] = [];

    for (let i = 1; i <= pages; i++) {
      pagination.push(i);
    }

    return pagination;
  };

  const pagination = getPagination(amountOfPages);

  // console.log(amountOfPages);
  // console.log(pageNumber);
  // console.log(slidePages);
  // console.log(slideDots);

  return (
    <div className="pagination">
      <div className="pagination__arrows">
        <button
          className="pagination__arrow--slide-to-first"
          onClick={() => {
            setSlideDots(0);
            setSlidePages(0);
            setPageNumber(1);
          }}
        ></button>
        <button
          className="pagination__arrowprev"
          onClick={() => {
            if (pageNumber === 1) {
              return;
            }

            if (pageNumber === 2) {
              setPageNumber(pageNumber - 1);
              setSlidePages(slidePages + 303);

              return;
            }

            if (
              amountOfPages - pageNumber === 1 ||
              amountOfPages - pageNumber === 0
            ) {
              setPageNumber(pageNumber - 1);
              setSlidePages(slidePages + 303);

              return;
            }

            setPageNumber(pageNumber - 1);
            setSlidePages(slidePages + 303);
            setSlideDots(slideDots + 35);
          }}
        ></button>
        <button
          className="pagination__arrownext"
          onClick={() => {
            if (pageNumber === amountOfPages) {
              return;
            }

            if (pageNumber === 1) {
              setPageNumber(pageNumber + 1);
              setSlidePages(slidePages - 303);

              return;
            }

            if (
              amountOfPages - pageNumber === 2 ||
              amountOfPages - pageNumber === 1
            ) {
              setPageNumber(pageNumber + 1);
              setSlidePages(slidePages - 303);

              return;
            }

            setPageNumber(pageNumber + 1);
            setSlidePages(slidePages - 303);
            setSlideDots(slideDots - 35);
          }}
        ></button>

        <button
          className="pagination__arrow--slide-to-last"
          onClick={() => {
            setPageNumber(amountOfPages);
            setSlidePages(amountOfPages * -303 + 303);
            setSlideDots(amountOfPages * -35 + 140);
          }}
        ></button>
      </div>
      <div className="pagination__dots">
        <div
          className="pagination__content"
          style={{ transform: `translateX(${slideDots}px)` }}
        >
          {pagination.map((page, id) => {
            const getChosingButton = (buttonId: number) => {
              const clickedButton = buttonId + 1;

              if (buttonId === id) {
                setPageNumber(clickedButton);
                setSlidePages(clickedButton * -303 + 303);
                setSlideDots(buttonId * -35 + 35);
              }

              if (buttonId === 0) {
                setPageNumber(clickedButton);
                setSlidePages(clickedButton * -303 + 303);
                setSlideDots(buttonId * -35);
              }

              if (buttonId === 1) {
                setPageNumber(clickedButton);
                setSlidePages(clickedButton * -303 + 303);
                setSlideDots(0);
              }

              if (amountOfPages - clickedButton === 1) {
                setPageNumber(clickedButton);
                setSlidePages(clickedButton * -303 + 303);
                setSlideDots(buttonId * -35 + 70);
              }

              if (amountOfPages === clickedButton) {
                setPageNumber(clickedButton);
                setSlidePages(clickedButton * -303 + 303);
                setSlideDots(buttonId * -35 + 105);
              }
            };

            return (
              <button
                key={id + 1}
                onClick={() => getChosingButton(id)}
                className={classNames('pagination__dot', {
                  'pagination__dot--is-active': pageNumber === id + 1,
                })}
              >
                {page}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
