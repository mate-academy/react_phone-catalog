import React, {useEffect} from "react";
import {useSearchParams} from "react-router-dom";

const PAGI_SPECS = [4, 8, 16];
const PAGI_LABELS = ["asc", "desc"];

export const FilterBar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.has("size")) {
      setSearchParams(prevParams => {
        const newParams = new URLSearchParams(prevParams);

        newParams.set("size", PAGI_SPECS[1].toString());

        return newParams;
      });
    }
  }, [searchParams]);

  const handleOnSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const localParam = new URLSearchParams(searchParams);

    localParam.set("size", event.target.value);
    localParam.set("page", "1");

    setSearchParams(localParam);
  };

  const handleOnSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const localParam = new URLSearchParams(searchParams);

    localParam.set("sort", event.target.value);

    setSearchParams(localParam);
  };

  return (
    <div className="filterbar__group">
      <div className="filterbar__group-per-price">
        <label htmlFor="perPagePrice">Filter by</label>

        <select
          id="perPagePrice"
          className="filterbar__group-per-price__form-control"
          onChange={e => handleOnSortChange(e)}
          value={searchParams.get("sort") || ""}
        >
          <option value="" disabled>
            Price
          </option>

          {PAGI_LABELS.map(label => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="filterbar__group-per-items">
        <label htmlFor="perPageItems">Per page</label>

        <select
          id="perPageItems"
          className="filterbar__group-per-items__form-control"
          onChange={e => handleOnSizeChange(e)}
          value={Number(searchParams.get("size"))}
        >
          {PAGI_SPECS.map(num => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
