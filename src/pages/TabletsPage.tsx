/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
import { useContext, useEffect, useMemo } from 'react';
import { MainContext } from '../context/MainContext';
import { HeroContent } from '../types/HeroContent';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Hero } from '../components/Hero';
import { ProductsList } from '../components/ProductsList';
import { ModelsNotExist } from '../components/ModelsNotExist';

export const TabletsPage = () => {
  const { setIsMenuOpen, setIsHeaderSearchVisible, setDocumentTitle, tablets } =
    useContext(MainContext);

  useEffect(() => {
    setDocumentTitle('Tablets Page');
    setIsHeaderSearchVisible(true);
    setIsMenuOpen(false);
  }, []);

  const content: HeroContent = useMemo(() => {
    return {
      title: 'Tablets',
      modelsNumber: tablets.length,
    };
  }, [tablets]);

  return (
    <>
      <Breadcrumbs />
      <Hero content={content} />

      {tablets.length > 0 ? (
        <ProductsList products={tablets} />
      ) : (
        <ModelsNotExist />
      )}
    </>
  );
};
