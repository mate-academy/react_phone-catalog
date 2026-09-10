import { useSearchParams } from 'react-router-dom';

export const ButtonPrevNext = ({
  numberOfPages,
}: {
  numberOfPages: number;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangePage = (page: number) => {
    const newPage = Math.max(1, Math.min(page, numberOfPages));

    const params = new URLSearchParams(searchParams);

    if (newPage === 1) {
      params.delete('page');
    } else {
      params.set('page', newPage.toString());
    }

    setSearchParams(params);
  };

  const page = Number(searchParams.get('page')) || 1;

  const numbersOfPages = () => {
    if (page >= 3 && page < numberOfPages - 2) {
      const numbersPage: number[] = [
        page - 2,
        page - 1,
        page,
        page + 1,
        page + 2,
      ].filter(num => num >= 1 && num <= numberOfPages);

      return numbersPage;
    } else if (page < 3) {
      const numbersPage: number[] = [1, 2, 3, 4, 5];

      return numbersPage;
    } else if (page + 2 >= numberOfPages) {
      const numbersPage: number[] = [
        numberOfPages - 4,
        numberOfPages - 3,
        numberOfPages - 2,
        numberOfPages - 1,
        numberOfPages,
      ];

      return numbersPage;
    }
  };

  const isActive = (number: number): boolean => {
    return page === number;
  };

  const pageIsFirst = (p: number): boolean => {
    return p === 1;
  };

  const pageIsLast = (p: number): boolean => {
    return p === numberOfPages;
  };

  return (
    <div className="button-next-prev">
      <div
        className={
          pageIsFirst(page) ? 'icon-32 icon icon-deactivate' : 'icon-32 icon'
        }
        onClick={() => handleChangePage(+page - 1)}
      >
        <div
          className={
            pageIsFirst(page)
              ? 'icon--arrow-left-deactivate'
              : 'icon--arrow-left'
          }
        ></div>
      </div>

      {numbersOfPages().map(number => (
        <div
          key={number}
          className={
            isActive(number) ? 'icon-32 icon icon-selected' : 'icon-32 icon'
          }
          onClick={() => handleChangePage(number)}
        >
          <p className={isActive(number) ? 'white text-body' : 'text-body'}>
            {number}
          </p>
        </div>
      ))}

      <div
        className={
          pageIsLast(page) ? 'icon-32 icon icon-deactivate' : 'icon-32 icon'
        }
        onClick={() => handleChangePage(+page + 1)}
      >
        <div
          className={
            pageIsLast(page)
              ? 'icon--arrow-right-deactivate'
              : 'icon--arrow-right'
          }
        ></div>
      </div>
    </div>
  );
};

export default ButtonPrevNext;
