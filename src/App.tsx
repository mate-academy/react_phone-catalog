import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { AppRouter } from './router/AppRouter';
import './App.scss';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <AppRouter />
      </main>
      <Footer />
    </>
  );
};

export default App;
