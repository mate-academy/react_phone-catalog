import { useSearchParams } from 'react-router-dom';

// type Props = {
//   initialValue: string,
// };

export const Dropdown = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    newSearchParams.set('sort', event.target.value);
    setSearchParams(newSearchParams);
  };

  return (
    <div className="dropdown">
      <label className="dropdown__label">
        Sort by
        <select
          className="dropdown__select"
          onChange={handleSortChange}
          // value={initialValue}
        >
          <option
            className="dropdown__option"
            value="age"
          >
            Newest
          </option>
          <option
            className="dropdown__option"
            value="name"
          >
            Alphabetically
          </option>
          <option
            className="dropdown__option"
            value="price"
          >
            Cheapest
          </option>
        </select>
      </label>
    </div>
  );
};
