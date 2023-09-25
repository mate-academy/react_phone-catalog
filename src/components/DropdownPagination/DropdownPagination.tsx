import { useSearchParams } from 'react-router-dom';

type Props = {
  initialValue: string,
};

export const DropdownPagination: React.FC<Props> = ({ initialValue }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    newSearchParams.set('perPage', event.target.value);
    setSearchParams(newSearchParams);
  };

  return (
    <div className="dropdown">
      <label className="dropdown__label">
        Items on page
        <select
          className="dropdown__select"
          onChange={handlePerPageChange}
          value={initialValue}
        >
          <option
            className="dropdown__option"
            value="all"
          >
            All
          </option>
          <option
            className="dropdown__option"
            value="4"
          >
            4
          </option>
          <option
            className="dropdown__option"
            value="8"
          >
            8
          </option>
          <option
            className="dropdown__option"
            value="16"
          >
            16
          </option>
        </select>
      </label>
    </div>
  );
};
