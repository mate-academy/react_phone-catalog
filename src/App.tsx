import { HashRouter as Router } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';

export const App = () => (
  <Router>
    <div className="App">
      <Header />
    </div>
  </Router>
);
