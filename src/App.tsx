import { useDocumentTitle } from 'usehooks-ts';
import { Header } from './components/Header';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { websiteName } from './helpers/variables';
import { convertHyphenToSpace } from './helpers/functions';
import { BurgerMenuAside } from './components/BurgerMenuAside';
import { Footer } from './components/Footer';

export const App = () => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const lastPathName = pathname.split('/').pop();

  useDocumentTitle(convertHyphenToSpace(lastPathName || '') || websiteName);

  return (
    <>
      <Header />

      {searchParams.get('burgerMenu') === 'open' && <BurgerMenuAside />}

      <Outlet />

      <Footer className="mt-auto" />
    </>
  );
};
