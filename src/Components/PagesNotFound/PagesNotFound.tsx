import { useContext } from 'react';
import { Footer } from '../Footer/Footer';
import { Navigation } from '../Navigation/Navigation';
import page from './PagesNotFound.module.scss';
import { CatalogContext } from '../CatalogProvider';
import classNames from 'classnames';

export const PagesNotFound = () => {
  const { themeSwitcher } = useContext(CatalogContext);

  return (
    <>
      <Navigation />
      <div className={classNames([page.page], {
        [page.pageONDARK]: themeSwitcher,
      })}>
        <h1
          className={page.title}
          data-theme={themeSwitcher ? 'dark' : 'light'}
        >
          Page not found :)
        </h1>
        <div className={page.imagecontainer}>
        <img
          src='/img/page-not-found.png'
          className={page.image}
        />
        </div>
      </div>
      <Footer />
    </>
  );
};
