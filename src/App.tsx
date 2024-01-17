import './App.scss';
import { Content } from './components/content/content';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';

export const App = () => (
  <div className="App">
    <Header />
    <Content />
    <Footer />
  </div>
);
