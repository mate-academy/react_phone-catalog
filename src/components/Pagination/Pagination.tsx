import { useSearchParams } from 'react-router-dom';
import paginationStyle from './Pagination.module.scss';
import Footer from '../Footer';
import { Products } from '../../types/types';

interface Props {
  filteredGadgets: Products[] | [];
  itemsLength: number;
  currentPage: number;
  setCurrentPage: (arg: number) => void;
}

const Pagination: React.FC<Props> = ({
  filteredGadgets,
  itemsLength,
  currentPage,
  setCurrentPage,
}) => {
  const [searchParams] = useSearchParams();

  const perItems = searchParams.get('quantity') || 16;
  const pageQuantity = Math.ceil(filteredGadgets.length / +perItems);

  console.log(filteredGadgets.length);

  return (
    <>
      <div className={paginationStyle.pagination}>
        {Array.from({ length: pageQuantity }).map((_, i) => {
          return (
            <button
              key={i}
              className={paginationStyle['pagination__button-simple']}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Pagination;
