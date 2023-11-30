import { useSearchParams } from 'react-router-dom';
import './SortInput.scss';

type Props = {
  sortValue: string;
  setSortValue: (value: string) => void;
};

export const SortInput: React.FC<Props>
= ({ sortValue, setSortValue }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleItemChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    setSortValue(event.target.value);
    params.set('sortValue', event.target.value);
    setSearchParams(params);
  };

  const options = ['Newest', 'Alphabetically', 'Cheapest'];

  return (
    <div className="sort">
      <p> Sort by </p>
      <select
        className="sort__select"
        value={sortValue}
        onChange={handleItemChange}
      >
        {options.map(
          value => <option key={value} value={value}>{value}</option>,
        )}
      </select>
    </div>
  );
};
