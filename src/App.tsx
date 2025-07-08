import './App.scss';
import WelcomeSlider from './components/WelcomeSlider';
import NewBrand from './components/NewBrand';
import Categories from './components/Categories';

export const App = () => {
  return (
    <div className="App">
      <WelcomeSlider />
      <NewBrand />
      <Categories />
    </div>
  );
};
