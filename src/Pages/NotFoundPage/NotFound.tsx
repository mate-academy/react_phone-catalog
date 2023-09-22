import { Navigation } from '../../Components/Navigation/Navigation';

import './notFound.scss';
import '../../style/main.scss';

export const NotFound = () => {
  return (
    <>
      <Navigation />
      <h1 className="notFound__h1">Page not found👀</h1>
    </>
  );
};
