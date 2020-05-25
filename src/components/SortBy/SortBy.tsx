
import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import './SortBy.scss';

export const SortBy = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const history = useHistory();
  const sortTypeOptions = [
    { value: "", text: "Choose" },
    { value: "age", text: "Newest" },
    { value: "name", text: "Alphabetically" },
    { value: "low_price", text: "Low price" },
    { value: "high_price", text: "High price" },
  ]


  const handleSortTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("sort_type", event.target.value);
    history.push({
      search: searchParams.toString()
    });
  }

  return (
    <div className="SortBy">
    <span className="SortBy__legend">Sort by</span><br></br>
      <select
        className="SortBy__select"
        onChange={handleSortTypeChange}
        value={searchParams.get("sort_type") ||"" }
      >
        {sortTypeOptions.map(item => (
          <option
          key={item.value}
          value={item.value}>{item.text}</option>
        ))}
      </select>
      </div>
  )
}

