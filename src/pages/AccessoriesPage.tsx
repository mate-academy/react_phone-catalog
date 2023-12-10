/* eslint-disable operator-linebreak */
import { useContext, useEffect, useMemo } from 'react';
import { MainContext } from '../context/MainContext';
import { HeroContent } from '../types/HeroContent';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Hero } from '../components/Hero';
import { ProductsList } from '../components/ProductsList';
import { ModelsNotExist } from '../components/ModelsNotExist';

export const AccessoriesPage = () => {
  const {
    setIsMenuOpen,
    setIsHeaderSearchVisible,
    setDocumentTitle,
    accessories,
  } = useContext(MainContext);

  useEffect(() => {
    setDocumentTitle('Accessories Page');
    setIsHeaderSearchVisible(true);
    setIsMenuOpen(false);
  }, []);

  const content: HeroContent = useMemo(() => {
    return {
      title: 'Accessories',
      modelsNumber: accessories.length,
    };
  }, [accessories]);

  return (
    <>
      <Breadcrumbs />
      <Hero content={content} />

      {accessories.length > 0 ? (
        <ProductsList products={accessories} />
      ) : (
        <ModelsNotExist />
      )}
    </>
  );
};
