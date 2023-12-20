import { useContext, useEffect, useMemo } from 'react';
import { MainContext } from '../context/MainContext';
import { HeroContent } from '../types/HeroContent';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Hero } from '../components/Hero';
import { ProductsList } from '../components/ProductsList';
import { NoResults } from '../components/NoResults';

export const AccessoriesPage = () => {
  const {
    setIsMenuOpen,
    setIsHeaderSearchVisible,
    setDocumentTitle,
    accessories,
    queryValue,
  } = useContext(MainContext);

  useEffect(() => {
    setDocumentTitle('Accessories Page');
    setIsHeaderSearchVisible(true);
    setIsMenuOpen(false);
  }, []);

  const filteredProducts = useMemo(() => {
    return accessories.filter(({ name }) => {
      return name.toLowerCase().includes(queryValue);
    });
  }, [accessories, queryValue]);

  const content: HeroContent = useMemo(() => {
    return {
      title: 'Accessories',
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
