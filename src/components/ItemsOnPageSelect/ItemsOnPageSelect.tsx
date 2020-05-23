import React from 'react';
import './ItemsOnPageSelect.scss';
import {useHistory, useLocation} from 'react-router-dom';

export const ItemsOnPageSelect = () => {
  const perPageOptions = ['8', '16', '32', '64', 'All'];
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const history = useHistory();

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("per_page", event.target.value);
    history.push({
      search: searchParams.toString()
    });
  }
  return (
    <div className="ItemsOnPageSelect">
    <span>Items on page</span><br></br>
    <select
      className="ItemsOnPageSelect__per-page"
      onChange={handlePerPageChange}
      value={searchParams.get("per_page") || ""}
    >
      {perPageOptions.map(item => (
        <option value={item}>{item}</option>
      ))}
    </select>
    </div>
  )
}

