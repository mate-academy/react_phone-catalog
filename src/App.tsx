import './App.scss';
import WelcomeSlider from './components/WelcomeSlider';
import NewBrand from './components/NewBrand';

export const App = () => {
  return (
    <div className="App">
      <WelcomeSlider />
      <NewBrand />
    </div>
  );
};
