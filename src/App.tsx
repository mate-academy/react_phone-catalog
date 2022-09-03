import { Header } from './components/Header';
import { Novelties } from './components/Novelties';
import { Footer } from './components/Footer';

import './App.scss';

const App = () => (
  <>
    <Header />
    <div className="container">
      <Novelties />
    </div>
    <Footer />
  </>
);

export default App;
