import { useEffect, useState } from 'react';
import { NewModelsListSlider } from './NewModelsListSlider';
import { PicturesSlider } from './PicturesSlider/PicturesSlider';

export const HomePage = () => {
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(document.documentElement.clientWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowSize !== document.documentElement.clientWidth) {
      setWindowSize(document.documentElement.clientWidth);
    }
  }, [windowSize]);

  return (
    <main className="home-page">
      <h1 className="home-page__greeting primary-title">
        Welcome to Nice
        <br />
        Gadgets store!
      </h1>

      <div className="home-page__container">
        <PicturesSlider windowSize={windowSize} />
        <NewModelsListSlider windowSize={windowSize} />
      </div>
    </main>
  );
};
