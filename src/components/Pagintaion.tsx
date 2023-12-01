import { useContext } from 'react';
import { ArrowButton } from './ArrowButton';
import { PaginationButton } from './PaginationButton';
import { appContext } from '../Contexts/AppContext';

type Props = {
  pages: number[];
  currentPage: number;
};

export const Pagintaion: React.FC<Props> = ({ pages, currentPage }) => {
  const { setSearchParams } = useContext(appContext);

  const pickPage = (newPage: number) => {
    if (currentPage === newPage) {
      return;
    }

    setSearchParams((params) => {
      params.set('page', newPage.toString());

      return params;
    });
  };

  const nextPage = () => {
    setSearchParams((params) => {
      params.set('page', (currentPage + 1).toString());

      return params;
    });
  };

  const prevPage = () => {
    setSearchParams((params) => {
      params.set('page', (currentPage - 1).toString());

      return params;
    });
  };

  return (
    <div className="col-span-full flex justify-center gap-x-2">
      <ArrowButton
        onClick={prevPage}
        disabled={currentPage === 1}
        direction="left"
      />

      {!!pages.length
        && pages.map((page) => (
          <PaginationButton
            onClick={() => pickPage(page)}
            active={currentPage === page}
            key={page}
          >
            {page}
          </PaginationButton>
        ))}

      <ArrowButton
        onClick={nextPage}
        disabled={currentPage === pages.length}
        direction="right"
      />
    </div>
  );
};
