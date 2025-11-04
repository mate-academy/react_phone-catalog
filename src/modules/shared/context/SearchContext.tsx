// import { useSearchParams } from 'react-router-dom';
// import { SortByAmount, SortByProp } from '../Enum/Sort';
// import { createContext } from 'react';

// type SearchType = {
//   sort: URLSearchParams;
//   perPage: URLSearchParams;
//   page: URLSearchParams;
// };

// export const SearchContext = createContext<SearchType>({
//   sort: (searchParams.get('sort') as SortByProp) || SortByProp.YEAR,
//   perPage: SortByAmount.ALL,
//   page: '1',
// });

// export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const sort = (searchParams.get('sort') as SortByProp) || SortByProp.YEAR;
//   const perPage =
//     (searchParams.get('perPage') as SortByAmount) || SortByAmount.ALL;
//   const page = searchParams.get('page') || '1';

//   return (
//     <SearchContext.Provider value={(sort, perPage, page)}>
//       {children}
//     </SearchContext.Provider>
//   );
// };
