import { useSearchParams } from 'react-router-dom';
import paginationStyle from './Pagination.module.scss';
import Footer from '../Footer';
import { Products } from '../../types/types';
import cn from 'classnames';
import { useWindowResize } from '../../windowResize';

interface Props {
  filteredGadgets: Products[] | [];
  itemsLength: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<Props> = ({
  filteredGadgets,
  itemsLength,
  currentPage,
  setCurrentPage,
}) => {
  const [searchParams] = useSearchParams();

  const { width } = useWindowResize();

  console.log(width);

  const perItems = searchParams.get('quantity') || 16;
  const pageQuantity = Math.ceil(filteredGadgets.length / +perItems);

  // console.log(filteredGadgets.length);
  // console.log(Array.from({ length: pageQuantity }).length - 1);

  // const lol = Array.from({ length: pageQuantity }).slice(4);

  // console.log(Array.from({ length: pageQuantity }));
  // console.log(currentPage);

  let arrCiclePagination = [];
  const paginationButtonQuantity = 6;

  for (
    let i = currentPage;
    i > currentPage - paginationButtonQuantity / 2;
    i--
  ) {
    arrCiclePagination.push(i);
  }

  for (
    let i = currentPage + 1;
    i <= currentPage + paginationButtonQuantity / 2;
    i++
  ) {
    arrCiclePagination.push(i);
  }

  for (let i = 0; i < paginationButtonQuantity; i++) {
    // console.log(arrCiclePagination.some(num => num <= 0));

    if (arrCiclePagination.some(num => num <= 0)) {
      arrCiclePagination = arrCiclePagination.map(el => el + 1);
    }
  }

  arrCiclePagination = arrCiclePagination.sort((a, b) => a - b);

  console.log(arrCiclePagination);
  console.log(pageQuantity);

  return (
    <>
      <div className={paginationStyle.pagination}>
        <button
          className={`${paginationStyle['pagination__button-simple']} ${paginationStyle['pagination__button-left']}`} //
          onClick={() => {
            if (currentPage !== 1) {
              setCurrentPage(current => current - 1);
            }
          }}
        ></button>

        {arrCiclePagination.map((num, i) => {
          return (
            <button
              key={i}
              className={cn(paginationStyle['pagination__button-simple'], {
                [paginationStyle['pagination__button-simple-current']]:
                  currentPage === i + 1,
              })}
              onClick={() => setCurrentPage(i + 1)}
            >
              {num}
            </button>
          );
        })}
        <button
          className={`${paginationStyle['pagination__button-simple']} ${paginationStyle['pagination__button-right']}`} //
          onClick={() => {
            if (currentPage !== Array.from({ length: pageQuantity }).length) {
              setCurrentPage(current => current + 1);
            }
          }}
        ></button>
      </div>
    </>
  );
};

export default Pagination;
