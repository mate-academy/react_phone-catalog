import ImageSlider from './ImageSlider';
import './GadgetsSlider.scss';

export const GadgetsSlider = () => {
  const slides = [
    { url: './img/banners/4.svg', title: '0' },
    { url: './img/banners/1.png', title: '1' },
    { url: './img/banners/2.png', title: '2' },
  ];

  return (
    <div className="slider">
      <ImageSlider slides={slides} />
    </div>
  );
};
