import './App.scss';
import { Header } from './components/Header/header';
import { Title } from './components/Title/title';
import { Banner } from './components/Banner/banner';
import { NewModels } from './components/NewModels/new-models';

export const App = () => (
  <div className="App">
    <Header />
    <div className='container'>
      <Title />
      <Banner />
      <NewModels />
    </div>
  </div>
);
