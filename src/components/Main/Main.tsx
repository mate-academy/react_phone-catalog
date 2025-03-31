import ImageSlider from '../../Functional/ImageSlider/ImageSlider';
import './Main.scss';

export const Main = () => {
  return (
    <main>
      <div className="main">
        <h1 className="main__title">Welcome to Nice Gadgets store!</h1>
      </div>
      <ImageSlider />
    </main>
  );
};
