import './App.scss';

import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { Footer } from './pages/components/Footer';
import { Header } from './pages/components/Header';

const App = () => (
  <div className="App">
    <Header />
    <HomePage />
    <PhonesPage />
    <Footer />
  </div>
);

export default App;
