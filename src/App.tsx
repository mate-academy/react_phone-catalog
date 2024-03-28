import { useDocumentTitle } from 'usehooks-ts';
import { Header } from './components/Header';
import { useLocation, useSearchParams } from 'react-router-dom';
import { websiteName } from './helpers/variables';
import { convertHyphenToSpace } from './helpers/functions';
import { BurgerMenuAside } from './components/BurgerMenuAside';

export const App = () => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const lastPathName = pathname.split('/').pop();

  useDocumentTitle(convertHyphenToSpace(lastPathName || '') || websiteName);

  return (
    <div className="flex h-screen w-screen flex-col">
      <Header />

      {searchParams.get('burgerMenu') === 'open' && <BurgerMenuAside />}
    </div>
  );
};
