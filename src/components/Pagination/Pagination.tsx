import { FunctionComponent } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

// Styles
import './Pagination.scss';

// Components
import { Button } from '../Button';

type Props = {
  pagesCount: number;
};

export const Pagination: FunctionComponent<Props> = ({ pagesCount }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = searchParams.get('page') || 1;
  const pageNumbers = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <div className="Pagination">
      <Button
        classModificator="Button--arrowLeft"
        callback={() => {
          searchParams.set('page', `${+page - 1}`);
          navigate({
            search: searchParams.toString(),
          });
        }}
        disablet={page <= 1}
      />

      <div className="Pagination__pages">
        {pageNumbers.map(pageNumber => {
          if (pageNumber === +page || pageNumber === +page + 1 || pageNumber === +page - 1) {
            return (
              <Button
                key={pageNumber}
                disablet={false}
                classModificator={+page === pageNumber ? 'Button--selected' : ''}
                callback={() => {
                  searchParams.set('page', `${pageNumber}`);
                  navigate({
                    search: searchParams.toString(),
                  });
                }}
              >
                {pageNumber}
              </Button>
            );
          }

          return null;
        })}
      </div>

      <Button
        classModificator="Button--arrowRight"
        callback={() => {
          searchParams.set('page', `${+page + 1}`);
          navigate({
            search: searchParams.toString(),
          });
        }}
        disablet={page >= pagesCount}
      />
    </div>
  );
};
