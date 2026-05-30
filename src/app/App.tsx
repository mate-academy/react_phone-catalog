import { useLocation } from 'react-router-dom';
import { Footer } from '../shared/layout/Footer/Footer';
import { Header } from '../shared/layout/Header/Header';
import { Main } from '../shared/layout/Main/Main';
import './app.scss';

function App() {
  const location = useLocation();
  const isBurgerOpen = location.pathname === '/burgerMenu';

  return (
    <div className="app">
      <Header />

      <main className="app__main">
        <h1 className="titleHidden">Product Catalog</h1>
        <Main />
      </main>

      {!isBurgerOpen && <Footer />}
    </div>
  );
}

export default App;
