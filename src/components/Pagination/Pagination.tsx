import { useLocation, useSearchParams } from 'react-router-dom';
import paginationStyle from './Pagination.module.scss';
import { Products } from '../../types/types';
import cn from 'classnames';
import { useWindowResize } from '../../windowResize';
import { calculateButtonsQuantity } from './CalculateButtonsQuantity';
import { useEffect, useState } from 'react';

interface Props {
  filteredGadgets: Products[] | [];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<Props> = ({
  filteredGadgets,
  currentPage,
  setCurrentPage,
}) => {
  const [searchParams] = useSearchParams();

  const { width } = useWindowResize();

  const perItems = searchParams.get('quantity') || 16;
  const pageQuantity = Math.ceil(filteredGadgets.length / +perItems);

  const [paginationButtonQuantity, setPaginationButtonQuantity] =
    useState<number>(4);

  useEffect(() => {
    if (width <= 320) {
      setPaginationButtonQuantity(Math.min(pageQuantity, 4));
    } else if (width <= 640) {
      setPaginationButtonQuantity(Math.min(pageQuantity, 8));
    } else if (width <= 1200) {
      setPaginationButtonQuantity(Math.min(pageQuantity, 16));
    } else {
      setPaginationButtonQuantity(Math.min(pageQuantity, 20));
    }
  }, [width, pageQuantity]);

  const arrCiclePagination = calculateButtonsQuantity(
    paginationButtonQuantity,
    currentPage,
    pageQuantity,
  );

  const location = useLocation();

  const gadgets = location.pathname.split('/')[1];

  const savedValue = sessionStorage.getItem(`currentPage-${gadgets}`) || 1;

  if (savedValue !== currentPage) {
    setCurrentPage(+savedValue);
  }

  return (
    <>
      <div className={paginationStyle.pagination}>
        <button
          className={`${paginationStyle['pagination__button-simple']} ${paginationStyle['pagination__button-left']}`} //
          onClick={() => {
            if (currentPage !== 1) {
              setCurrentPage(current => current - 1);
              sessionStorage.setItem(
                `currentPage-${gadgets}`,
                `${currentPage - 1}`,
              );
            }
          }}
        ></button>

        {arrCiclePagination.map((el, i) => {
          return (
            <button
              key={i}
              className={cn(paginationStyle['pagination__button-simple'], {
                [paginationStyle['pagination__button-simple-current']]:
                  currentPage === el,
              })}
              onClick={() => {
                setCurrentPage(el);
                sessionStorage.setItem(`currentPage-${gadgets}`, `${el}`);
              }}
            >
              {el}
            </button>
          );
        })}
        <button
          className={`${paginationStyle['pagination__button-simple']} ${paginationStyle['pagination__button-right']}`} //
          onClick={() => {
            if (currentPage !== Array.from({ length: pageQuantity }).length) {
              setCurrentPage(current => current + 1);
              sessionStorage.setItem(
                `currentPage-${gadgets}`,
                `${currentPage + 1}`,
              );
            }
          }}
        ></button>
      </div>
    </>
  );
};

export default Pagination;
