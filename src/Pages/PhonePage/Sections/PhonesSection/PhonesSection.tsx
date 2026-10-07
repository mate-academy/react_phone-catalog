import { ModelsSortForm } from '../../../../components/ModelsSortForm';
import { PhoneModel } from '../../../../types/model';
import { ModelList } from '../../../../components/ModelList';
import { Pagination } from '../../../../components/Pagination';

interface Props {
  paginatedPhones: PhoneModel[];
  fullSortedPhones: PhoneModel[];
  handleSetNextPage: (page: number, pages: number[]) => void;
  handleSetPrevPage: (page: number) => void;
  handleSetCurrentPage: (page: number) => void;
  page: string | number;
  quantity: number;
}

export const PhonesSection: React.FC<Props> = ({
  paginatedPhones,
  fullSortedPhones,
  handleSetCurrentPage,
  handleSetNextPage,
  handleSetPrevPage,
  quantity,
}) => {
  return (
    <>
      {!fullSortedPhones ? (
        <div>Loading...</div>
      ) : (
        <section className="phones-section">
          <ModelsSortForm />
          <ModelList models={paginatedPhones} kindOfModel="phones" />

          {String(quantity) !== 'all' && (
            <Pagination
              items={fullSortedPhones}
              itemsQuantity={quantity}
              handleSetCurrentPage={handleSetCurrentPage}
              handleSetNextPage={handleSetNextPage}
              handleSetPrevPage={handleSetPrevPage}
            />
          )}
        </section>
      )}
    </>
  );
};
