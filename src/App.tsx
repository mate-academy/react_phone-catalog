import { Outlet } from 'react-router-dom';
import './App.scss';
import { Navigation } from './components/navigation/navigation';
import { Footer } from './components/footer/footer';
import favicon from '../src/img/icons/favicon.svg';

export const App = () => {

  const setFavicon = (faviconURL: string) => {
    const link = document.createElement('link');
    link.rel = 'shortcut icon';
    link.href = faviconURL;
    document.head.appendChild(link);
  };

  setFavicon(favicon)

  return (
    <div className="App">
      <Navigation />

      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
};
