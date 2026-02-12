import { Footer } from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { TopBar } from './components/topbar';
import './App.scss';

export const App = () => {
  return (
    <div className="app">
      <h1 className="app__title">Product Catalog</h1>
      <TopBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
