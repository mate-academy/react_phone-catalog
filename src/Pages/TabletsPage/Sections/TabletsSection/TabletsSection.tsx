import { Pagination } from '../../../../components/Pagination';
import { ModelsSortForm } from '../../../../components/ModelsSortForm';
import { ModelList } from '../../../../components/ModelList';
import { TabletModel } from '../../../../types/model';

interface Props {
  paginatedTablets: TabletModel[];
  fullSortedTablets: TabletModel[];
  handleSetNextPage: (page: number, pages: number[]) => void;
  handleSetPrevPage: (page: number) => void;
  handleSetCurrentPage: (page: number) => void;
  page: string | number;
  quantity: number;
}

export const TabletsSection: React.FC<Props> = ({
  paginatedTablets,
  fullSortedTablets,
  handleSetCurrentPage,
  handleSetNextPage,
  handleSetPrevPage,
  quantity,
}) => {
  return (
    <section className="phone-section">
      <ModelsSortForm></ModelsSortForm>
      <ModelList models={paginatedTablets} kindOfModel="tablets" />
      {String(quantity) !== 'all' && (
        <Pagination
          items={fullSortedTablets}
          itemsQuantity={quantity}
          handleSetCurrentPage={handleSetCurrentPage}
          handleSetNextPage={handleSetNextPage}
          handleSetPrevPage={handleSetPrevPage}
        />
      )}
    </section>
  );
};
