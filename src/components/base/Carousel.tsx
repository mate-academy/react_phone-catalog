import React from 'react';

const carouselArray = [
  {
    src: '/img/banner-phones.png',
    alt: 'phones',
  },
  {
    src: '/img/banner-accessories.png',
    alt: 'accessories',
  },
  {
    src: '/img/banner-tablets.png',
    alt: 'tablets',
  },
];

const Carousel = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleStyle = () => {
    return {
      transform: `translateX(${activeIndex * -100}%)`,
    };
  };

  const handleNext = () => {
    setActiveIndex(prev => {
      return prev === carouselArray.length - 1 ? 0 : prev + 1;
    });
  };

  const handlePrevious = () => {
    setActiveIndex(prev => {
      return prev === 0 ? carouselArray.length - 1 : prev - 1;
    });
  };

  return (
    <div className=" flex items-center justify-between w-full flex-col ">
      <div className="flex flex-row">
        <button
          onClick={handlePrevious}
          className="border text-base font-bold hidden justify-center 
          items-center sm:flex lg:h-[400px] sm:h-auto w-8"
        >
          <img src="/img/icons/Vector (Stroke) left.svg" alt="arrow left" />
        </button>
        <div
          className="flex overflow-clip items-center h-80 w-full 
        sm:w-[31rem] lg:w-full lg:h-[400px] "
        >
          <div
            className="carousel-container flex min-w-full h-full items-center"
            style={handleStyle()}
          >
            {carouselArray.map(item => (
              <div
                key={item.alt}
                className="carousel-item  flex min-w-full h-full 
                items-center justify-center"
              >
                <img
                  className="w-full h-full object-cover bg-black "
                  src={item.src}
                  alt={item.alt}
                />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleNext}
          className="border text-base font-bold hidden justify-center
           items-center sm:flex lg:h-[400px] sm:h-auto w-8"
        >
          <img src="/img/icons/Vector (Stroke) right.svg" alt="arrow right" />
        </button>
      </div>
      <div>
        <div className="flex p-4 items-center justify-center gap-1">
          {carouselArray.map((item, index) => (
            <div
              key={item.alt}
              className={`w-4 h-1   ${
                index === activeIndex ? 'bg-black' : 'bg-gray-400'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
