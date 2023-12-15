/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
import { useContext, useEffect, useMemo } from 'react';
import { MainContext } from '../context/MainContext';
import { HeroContent } from '../types/HeroContent';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Hero } from '../components/Hero';
import { NoResults } from '../components/NoResults';
import { ProductItems } from '../components/ProductsList/ProductItems';

export const FavouritesPage = () => {
  const {
    setIsMenuOpen,
    setIsHeaderSearchVisible,
    setDocumentTitle,
    favouritesItems,
  } = useContext(MainContext);

  useEffect(() => {
    setDocumentTitle('Favourites Page');
    setIsHeaderSearchVisible(true);
    setIsMenuOpen(false);
  }, []);

  const content: HeroContent = useMemo(() => {
    return {
      title: 'Favourites',
      modelsNumber: favouritesItems.length,
    };
  }, [favouritesItems]);

  return (
    <>
      <Breadcrumbs />
      <Hero content={content} />

      {favouritesItems.length > 0 ? (
        <section className="section products-list">
          <div className="section__container">
            <ProductItems items={favouritesItems} />
          </div>
        </section>
      ) : (
        <NoResults categoryName={content.title} />
      )}
    </>
  );
};
