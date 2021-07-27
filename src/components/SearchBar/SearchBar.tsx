import { debounce } from "lodash";
import React from "react";
// import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import './SearchBar.scss'

interface Props {
  placeholder: string
}

export const SearchBar: React.FC<Props> = ({ placeholder }) => {
  const location = useLocation()
  const history = useHistory()
  const searchParams = new URLSearchParams(location.search)
  const [query, setQuary] = useState(searchParams.get('query') || '');

  const applyQuery = useCallback(debounce((value) => {
    searchParams.delete('page');
    if(value.trim() !== '') {
      if(!searchParams.get('query')){
        searchParams.append('query', value);
      }else {
        searchParams.set('query', value);
      }
    } else {
      searchParams.delete('query');
    }
    history.push({search: searchParams.toString()})
  }, 500), [location]);

  return (
    <div className="search-bar-container">
      <input
        value={query}
        onChange={(event) => {
          const target = event.target as HTMLInputElement;
          setQuary(target.value)
          applyQuery(target.value)
        }}
        className="search-bar"
        placeholder={placeholder}
      >
      </input>
    </div>
  )
}
