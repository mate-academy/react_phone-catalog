import { Header } from './components/header/header';
import { Footer } from './components/header/footer';
import '../src/styles/main.scss';
import './App.scss';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
