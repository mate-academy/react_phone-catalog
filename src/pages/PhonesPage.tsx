import { useContext, useEffect, useMemo } from 'react';
import { HeroContent } from '../types/HeroContent';
import { MainContext } from '../context/MainContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Hero } from '../components/Hero';
import { ProductsList } from '../components/ProductsList';
import { NoResults } from '../components/NoResults';

export const PhonesPage = () => {
  const {
    setIsMenuOpen,
    setIsHeaderSearchVisible,
    setDocumentTitle,
    phones,
    queryValue,
  } = useContext(MainContext);

  useEffect(() => {
    setDocumentTitle('Phones Page');
    setIsHeaderSearchVisible(true);
    setIsMenuOpen(false);
  }, []);

  const filteredProducts = useMemo(() => {
    return phones.filter(({ name }) => {
      return name.toLowerCase().includes(queryValue);
    });
  }, [phones, queryValue]);

  const content: HeroContent = useMemo(() => {
    return {
      title: 'Mobile phones',
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
