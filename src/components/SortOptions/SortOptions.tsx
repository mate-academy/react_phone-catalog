import { CustomSelect } from '../CustomSelect/CustomSelect';

type Props = {
  handleSortBy: (value: string) => void;
  sort: string;
  handlePerPageChange: (value: string) => void;
  perPage: number;
};

export const SortOptions: React.FC<Props> = ({
  handleSortBy,
  sort,
  handlePerPageChange,
  perPage,
}) => {
  const sortOptions = [
    { value: 'age', label: 'Newest' },
    { value: 'title', label: 'Alphabetically' },
    { value: 'price', label: 'Cheapest' },
  ];

  const perPageOptions = [
    { value: '4', label: '4' },
    { value: '8', label: '8' },
    { value: '16', label: '16' },
    { value: 'all', label: 'All' },
  ];

  return (
    <article className="sortOptions">
      <div className="sortOptions__sort-box">
        <div className="sortOptions__sort">
          <CustomSelect
            options={sortOptions}
            value={sort}
            onChange={handleSortBy}
            label={'Sort by'}
            defaultText={'Select an option'}
            />
        </div>

        <div className="sortOptions__page">
          <CustomSelect
            options={perPageOptions}
            value={perPage.toString()}
            onChange={handlePerPageChange}
            label={'Items on page'}
            defaultText={'All'}
          />
        </div>
      </div>
    </article>
  );
};
