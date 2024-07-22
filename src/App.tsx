import { useEffect } from 'react';
import './App.scss';
import { HomePage } from './modules/HomePage';
import { Header } from './modules/shared/components/Header';

export const App: React.FC = () => {
  useEffect(() => {
    // document.documentElement.setAttribute('theme', 'bright');
  });

  return (
    <div className="App">
      <Header />
      <HomePage />
    </div>
  );
};
