import './App.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { AppProvider } from './context/AppContext';
import { HomePage } from './pages/HomePage';

export const App = () => (
  <div className="App">
    <AppProvider>
      <Header />

      <Menu />

      <main className="main">
        <HomePage />
      </main>

      <Footer />
    </AppProvider>
  </div>
);
