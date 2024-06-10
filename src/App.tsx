import { Header } from './components/Header';
import { Footer } from './components/Footer';
import './App.scss';
import { RoutesComponent } from './RoutesComponent';

export const App = () => {
  const favourites = localStorage.getItem('favourites');

  if (!favourites) {
    const def = JSON.stringify(['']);

    localStorage.setItem('favourites', def);
  } else {
    console.log(favourites);
  }

  return (
    <div className="App">
      <Header />
      <RoutesComponent />
      <Footer />
    </div>
  );
};
