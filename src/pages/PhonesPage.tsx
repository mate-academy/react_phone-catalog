/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
import { useContext, useEffect, useMemo } from 'react';
import { HeroContent } from '../types/HeroContent';
import { MainContext } from '../context/MainContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Hero } from '../components/Hero';
import { ProductsList } from '../components/ProductsList';
import { ModelsNotExist } from '../components/ModelsNotExist';

export const PhonesPage = () => {
  const { setIsMenuOpen, setIsHeaderSearchVisible, setDocumentTitle, phones } =
    useContext(MainContext);

  useEffect(() => {
    setDocumentTitle('Phones Page');
    setIsHeaderSearchVisible(true);
    setIsMenuOpen(false);
  }, []);

  const content: HeroContent = useMemo(() => {
    return {
      title: 'Mobile phones',
      modelsNumber: phones.length,
    };
  }, [phones]);

  return (
    <>
      <Breadcrumbs />
      <Hero content={content} />

      {phones.length > 0 ? (
        <ProductsList products={phones} />
      ) : (
        <ModelsNotExist />
      )}
    </>
  );
};
