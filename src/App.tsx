import { Header } from './components/Header/Header';
import { AsideMenu } from './components/AsideMenu';
import { Main } from './components/Main/Main';
import { Footer } from './components/Main/Footer/Footer';
import style from './App.module.scss';
export const App = () => {
  return (
    <div className={style.appContent}>
      <Header />
      <AsideMenu />
      <Main />
      <Footer />
    </div>
  );
};
