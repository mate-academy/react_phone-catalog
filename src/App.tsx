import { Outlet } from 'react-router-dom';
import './App.scss';
import './styles/theme/theme.css';
import { TopBar } from './modules/shared/components/TopBar';
import { Footer } from './modules/shared/components/Footer';
import { GoBack } from './modules/shared/components/GoBack';
import { BackButton } from './modules/shared/components/BackButton';
import { PageProvider } from './context/PageContext';
import { ProductDetailProvider } from './context/ProductDetailContext';

const savedTheme = localStorage.getItem('theme') || 'light';

document.body.dataset.theme = savedTheme;

export const App = () => (
  <PageProvider>
    <ProductDetailProvider>
      <div className="App">
        <div className="App__content">
          <TopBar />
          <GoBack />
          <BackButton />
          <main className="App__main">
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
    </ProductDetailProvider>
  </PageProvider>
);
