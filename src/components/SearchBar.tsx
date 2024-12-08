import { useLocation, useSearchParams } from "react-router-dom";
import { getSearchWith } from "../utils/getSearchWith";
import debounce from "lodash.debounce";
import { useState, useMemo, useEffect } from "react";
import { SearchParams } from "../types/searchParams";

export const SearchBar = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('query') || '');

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(params, searchParams);
    setSearchParams(search);
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string | null) => {
        setSearchWith({ query: value });
      }, 500),
    [searchParams]
  );

  useEffect(() => {
    debouncedSearch(inputValue || null);
    return () => {
      debouncedSearch.cancel();
    };
  }, [inputValue, debouncedSearch]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      {pathname.slice(1).length > 0 && (
        <div className="shadow-el hidden w-[200px] items-center justify-between sm:flex xl:w-[300px]">
          <input
            type="text"
            placeholder={`Search in ${pathname.slice(1)}`}
            className="
              w-[150px] 
              border-none 
              pl-[5px]
              font-mont-semi 
              text-[12px]
              leading-[8px] 
              tracking-[0.04em]
              outline-none
              xl:w-[250px] 
              xl:pl-[10px]
              xl:text-[14px]
              xl:leading-[11px]
            "
            value={inputValue}
            onChange={handleQueryChange}
          />
          <img
            src="./img/icons/Search.svg"
            alt="Search"
            className="icons w-[50px] xl:w-[50px]"
          />
        </div>
      )}
    </>
  );
};
