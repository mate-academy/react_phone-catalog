import { Header } from './components/Header/Header';
import { AsideMenu } from './components/AsideMenu';
import { Main } from './components/Main/Main';
import { Footer } from './components/Main/Footer/Footer';
import { Outlet, useParams } from 'react-router-dom';

export const App = () => {
  const { menu } = useParams();

  return (
    <div>
      {menu ? (
        <AsideMenu />
      ) : (
        <>
          <Header />

          <Main />
          <Footer />

        </>
      )}
       <Outlet />
    </div>
  );
};
