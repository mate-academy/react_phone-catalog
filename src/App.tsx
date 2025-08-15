import './App.scss';
import { HomePage } from './modules/HomePage/HomePage';
// import { Footer } from './modules/shared/components/Footer';
import { Header } from './modules/shared/components/Header';

import '@/styles/main.scss';

export const App = () => {
  return (
    <div className="App">
      <Header></Header>
      <HomePage></HomePage>
    </div>
  );
};
