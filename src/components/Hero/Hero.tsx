import Slider from '../Slider/Slider';

export const Hero = () => {
  const slides = [
    { id: 1, imageUrl: 'img/banner-phones.png' },
    { id: 2, imageUrl: 'img/banner-tablets.png' },
    { id: 3, imageUrl: 'img/banner-accessories.png' },
  ];

  return (
    <div className="container">
      <h1 className="home__title">Welcome to Nice Gadgets store!</h1>
      <div className="home__slider">
        <Slider slides={slides} />
      </div>
    </div>
  );
};
