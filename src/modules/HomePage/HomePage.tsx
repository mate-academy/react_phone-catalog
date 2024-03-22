import { NewModels } from './NewModels';
import { TitleSlider } from './TitleSlider/TitleSlider';

export const HomePage = () => {
  return (
    <main className="home-page">
      <h1 className="home-page__greeting primary-title">
        Welcome to Nice
        <br />
        Gadgets store!
      </h1>

      <div className="home-page__container">
        <TitleSlider />
        <NewModels />
      </div>
    </main>
  );
};
