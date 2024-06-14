import { Header } from './components/Header';
import { Footer } from './components/Footer';
import './App.scss';
import { RoutesComponent } from './RoutesComponent';

export const App = () => {
  return (
    <div className="App">
      <Header />
      <RoutesComponent />
      <Footer />
    </div>
  );
};
