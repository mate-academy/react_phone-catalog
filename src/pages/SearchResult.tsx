import { useContext, useEffect, useMemo } from 'react';
import { MainContext } from '../context/MainContext';
import { HeroContent } from '../types/HeroContent';
import { Hero } from '../components/Hero';
import { ProductsList } from '../components/ProductsList';
import { NoResults } from '../components/NoResults';

export const SearchResult = () => {
  const {
    setIsMenuOpen,
    setIsHeaderSearchVisible,
    setDocumentTitle,
    searchItems,
  } = useContext(MainContext);

  useEffect(() => {
    setDocumentTitle('Search Result Page');
    setIsHeaderSearchVisible(true);
    setIsMenuOpen(false);
  }, []);

  const content: HeroContent = useMemo(() => {
    return {
      title: 'Search Result',
      modelsNumber: searchItems.length,
    };
  }, [searchItems]);

  return (
    <>
      <Hero content={content} />

      {searchItems.length > 0 ? (
        <ProductsList products={searchItems} />
      ) : (
        <NoResults categoryName="Items" />
      )}
    </>
  );
};
