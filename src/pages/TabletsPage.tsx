import { useContext, useEffect, useMemo } from 'react';
import { MainContext } from '../context/MainContext';
import { HeroContent } from '../types/HeroContent';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Hero } from '../components/Hero';
import { ProductsList } from '../components/ProductsList';
import { NoResults } from '../components/NoResults';

export const TabletsPage = () => {
  const {
    setIsMenuOpen,
    setIsHeaderSearchVisible,
    setDocumentTitle,
    tablets,
    queryValue,
  } = useContext(MainContext);

  useEffect(() => {
    setDocumentTitle('Tablets Page');
    setIsHeaderSearchVisible(true);
    setIsMenuOpen(false);
  }, []);

  const filteredProducts = useMemo(() => {
    return tablets.filter(({ name }) => {
      return name.toLowerCase().includes(queryValue);
    });
  }, [tablets, queryValue]);

  const content: HeroContent = useMemo(() => {
    return {
      title: 'Tablets',
      modelsNumber: filteredProducts.length,
    };
  }, [filteredProducts]);

  return (
    <>
      <Breadcrumbs />
      <Hero content={content} />

      {filteredProducts.length > 0 ? (
        <ProductsList products={filteredProducts} />
      ) : (
        <NoResults categoryName={content.title} />
      )}
    </>
  );
};
