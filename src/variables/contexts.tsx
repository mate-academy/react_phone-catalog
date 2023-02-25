import React from 'react';

interface SearchContexT {
  query: string;
  setQuery: (query: string) => void;
  setSearchVisible: (isSearchVisible: boolean) => void;
  isSearchVisible: boolean;
  setPlaceholder: (placeholder: string) => void;
  placeholder: string;
  setAppliedQuery: (appliedQuery: string) => void;
  appliedQuery: string;
  applyQuery: (query: string) => void,
}

export const SearchContext = React.createContext<SearchContexT>(null!);
