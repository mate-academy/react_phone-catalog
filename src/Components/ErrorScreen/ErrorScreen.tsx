import { useContext } from 'react';
import { CatalogContext } from '../CatalogProvider';
import error from './ErrorScreen.module.scss';

export const ErrorScreen = () => {
  const { themeSwitcher } = useContext(CatalogContext);

  return (
    <div
      className={error.errorscreen}
      data-theme={themeSwitcher ? 'dark' : 'light'}
    >
      <h1 className={error.title}>Something went wrong :)</h1>
    </div>
  );
};
