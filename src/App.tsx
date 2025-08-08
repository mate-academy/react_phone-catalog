import { Outlet } from 'react-router-dom';
import './App.scss';
import './styles/theme/theme.css';
import { TopBar } from './modules/shared/components/TopBar';
import { Footer } from './modules/shared/components/Footer';
import { GoBack } from './modules/shared/components/GoBack';
import { BackButton } from './modules/shared/components/BackButton';
import { PageProvider } from './context/PageContext';
import { ProductDetailProvider } from './context/ProductDetailContext';

export const App = () => (
  <PageProvider>
    <ProductDetailProvider>
      <div className="App">
        <TopBar />
        <GoBack />
        <BackButton />
        <main className="App__main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ProductDetailProvider>
  </PageProvider>
);
