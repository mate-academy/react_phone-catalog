import { useDocumentTitle } from 'usehooks-ts';
import { Header } from './components/Header';
import { useLocation } from 'react-router-dom';
import { websiteName } from './helpers/variables';
import { convertHyphenToSpace } from './helpers/functions';

export const App = () => {
  const { pathname } = useLocation();
  const lastPathName = pathname.split('/').pop();

  useDocumentTitle(convertHyphenToSpace(lastPathName || '') || websiteName);

  return (
    <>
      <Header />
    </>
  );
};
