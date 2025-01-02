import { useContext } from 'react';
import { CatalogContext } from '../CatalogProvider';
import { Product } from '../types/Product';
import paginations from './Pagination.module.scss';
import classNames from 'classnames';
import { SetURLSearchParams } from 'react-router-dom';

type Props = {
  filteredItems: Product[];
  itemsInNumber: number;
  setSearchParams: SetURLSearchParams;
  number: string;
};

export const Pagination = ({
  filteredItems,
  itemsInNumber,
  setSearchParams,
  number,
}: Props) => {
  const {
    setPageNumber,
    setSlidePages,
    pageNumber,
    slidePages,
    slideDots,
    setSlideDots,
    themeSwitcher,
  } = useContext(CatalogContext);

  const amountOfPages = Math.ceil(filteredItems.length / itemsInNumber);

  const getPagination = (pages: number) => {
    const pagination: number[] = [];

    for (let i = 1; i <= pages; i++) {
      pagination.push(i);
    }

    return pagination;
  };

  const pagination = getPagination(amountOfPages);

  return (
    <div
      className={paginations.pagination}
      data-theme={themeSwitcher ? 'dark' : 'light'}
    >
      <div className={paginations.arrows}>
        <button
          className={classNames([paginations.arrow_to_first], {
            [paginations.arrow_to_firstONDARK]: themeSwitcher,
          })}
          onClick={() => {
            setSearchParams(prev => {
              prev.set('page', '1');

              return prev;
            });
            setSlideDots(0);
            setSlidePages(0);
            setPageNumber(1);
          }}
        ></button>
        <button
          className={classNames([paginations.arrow__prev], {
            [paginations.arrow__prevONDARK]: themeSwitcher,
          })}
          onClick={() => {
            setSearchParams(prev => {
              const nextPage = pageNumber - 1;

              prev.set('page', nextPage.toString());

              return prev;
            });
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
        <div className={paginations.dots}>
          <div
            className={paginations.content}
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
                  onClick={() => {
                    getChosingButton(id);
                    setSearchParams(prev => {
                      prev.set('page', page.toString());

                      return prev;
                    });
                  }}
                  className={classNames([paginations.dot], {
                    [paginations.dot__active]: pageNumber === id + 1,
                  })}
                  value={number}
                >
                  {page}
                </button>
              );
            })}
          </div>
        </div>

        <button
          className={classNames([paginations.arrow__next], {
            [paginations.arrow__nextONDARK]: themeSwitcher,
          })}
          onClick={() => {
            setSearchParams(prev => {
              const nextPage = pageNumber + 1;

              prev.set('page', nextPage.toString());

              return prev;
            });
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
          className={classNames([paginations.arrow_to_last], {
            [paginations.arrow_to_lastONDARK]: themeSwitcher,
          })}
          onClick={() => {
            setPageNumber(amountOfPages);
            setSlidePages(amountOfPages * -303 + 303);
            setSlideDots(amountOfPages * -35 + 140);
            setSearchParams(prev => {
              prev.set('page', amountOfPages.toString());

              return prev;
            });
          }}
          value={number}
        ></button>
      </div>
    </div>
  );
};
