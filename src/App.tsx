import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import './App.scss';

export const App: React.FC = () => {
  return (
    <div className="App">
      <div className="page__body">
        <Header />

        <main>
          <div className="container">
            <div className="grid grid--desktop">
              <Outlet />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};
