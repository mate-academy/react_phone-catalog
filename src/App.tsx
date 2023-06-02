import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import './reset.scss';
import './App.scss';

const App = () => (
  <div className="App">
    <header className="header">
      <Navbar />
    </header>

    <Footer />
  </div>
);

export default App;
