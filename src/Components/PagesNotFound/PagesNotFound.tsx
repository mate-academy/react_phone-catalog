import { useContext } from 'react';
import { Footer } from '../Footer/Footer';
import { Navigation } from '../Navigation/Navigation';
import page from './PagesNotFound.module.scss';
import { CatalogContext } from '../CatalogProvider';

export const PagesNotFound = () => {
  const { themeSwitcher } = useContext(CatalogContext);

  return (
    <>
      <Navigation />
      <div className={page.page}>
        <h1
          className={page.title}
          data-theme={themeSwitcher ? 'dark' : 'light'}
        >
          Page not found :)
        </h1>
        <img
          src={
            themeSwitcher
              ? '/img/videoframe_15965.png'
              : '/img/page-not-found.png'
          }
          className={page.image}
        />
      </div>
      <Footer />
    </>
  );
};
