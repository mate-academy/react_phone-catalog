import { Navigation } from '../../components/Navigation/Navigation';

import './NotFound.scss';
import '../../style/main.scss';

export const NotFound = () => {
  return (
    <>
      <Navigation />
      <h1 className="notFound__h1">Page not found👀</h1>
    </>
  );
};
