import './App.scss';
import { Footer } from './components/Footer/Footer';
import { NavBar } from './components/NavBar/NavBar';

const App = () => (
  <div className="App">
    <header className="header">
      <NavBar />
    </header>

    <footer className="footer">
      <div className="container">
        <Footer />
      </div>
    </footer>
  </div>
);

export default App;
