import { Pagination } from '../../../../components/Pagination';
import { ModelsSortForm } from '../../../../components/ModelsSortForm';
import { ModelList } from '../../../../components/ModelList';
import { AccessoriesModel } from '../../../../types/model';

interface Props {
  paginatedAccessories: AccessoriesModel[];
  fullSortedAccessories: AccessoriesModel[];
  handleSetNextPage: (page: number, pages: number[]) => void;
  handleSetPrevPage: (page: number) => void;
  handleSetCurrentPage: (page: number) => void;
  page: string | number;
  quantity: number;
}

export const AccessoriesSection: React.FC<Props> = ({
  paginatedAccessories,
  fullSortedAccessories,
  handleSetCurrentPage,
  handleSetNextPage,
  handleSetPrevPage,
  quantity,
}) => {
  return (
    <section className="phone-section">
      <ModelsSortForm></ModelsSortForm>
      <ModelList models={paginatedAccessories} kindOfModel="accessories" />
      {String(quantity) !== 'all' && (
        <Pagination
          items={fullSortedAccessories}
          itemsQuantity={quantity}
          handleSetCurrentPage={handleSetCurrentPage}
          handleSetNextPage={handleSetNextPage}
          handleSetPrevPage={handleSetPrevPage}
        />
      )}
    </section>
  );
};
