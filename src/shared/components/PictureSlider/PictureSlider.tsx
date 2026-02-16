import type { Slider } from '../../types/Slider';
import { handleSwipe } from '../../utils/handleSwipe';
import classNames from 'classnames';
import './PictureSlider.scss';
import { useEffect, useState } from 'react';

export const PictureSlider = ({
  imgs,
  start,
  end,
  ShowDotsImg,
  onAnimated,
}: Slider) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  /* 5 secondes slider */
  // useEffect(() => {
  //     const interval = setInterval(() => {
  //         setCurrentIndex(prev => (prev + 1) % imgs.length)
  //     },5000)

  //     return () => clearInterval(interval);
  // }, [imgs.length])

  const handleTouchStart = (e:React.TouchEvent) => {
    start.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd =  (e:React.TouchEvent) => {
    end.current =  e.changedTouches[0].clientX;
    handleSwipe({
      start: start,
      end: end,
      imgs: imgs,
      onAnimate: onAnimated,
      onCurrentIndex: setCurrentIndex
    });
  };
  /* end of swipe controllers */

  /* prev-next controllers */
  const handleNextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % imgs.length);
  };

  const handlePrevSlide = () => {
    setCurrentIndex(prev => ((prev - 1 + imgs.length) % imgs.length));
  };
  return (
    <div 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={classNames('slider-main-content', {
        'slider-main-content-img-dots' : ShowDotsImg
      })}
    >
      <div className='slider-img-container'>
        <button className="prev"
          onClick={handlePrevSlide}
        >
          <img src="/img/home/slider/prev.svg" alt="" />
        </button>
        <img 
          src={`/${imgs[currentIndex]}`} 
          alt="" 
          className={classNames('slider-main-content-images',{
            'main-product-img' : ShowDotsImg
          })}
          style={{
            // opacity: isAnimating ? 0 : 1,
            // transition: 'opacity 0.3s ease'
          }} 
        />
        <button className="next"
          onClick={handleNextSlide}
        >
          <img src="/img/home/slider/next.svg" alt="" />
        </button>
      </div>
      <div className={classNames('nav-dots',{
        'nav-dots-wrapper': ShowDotsImg
      })}
      >
        {imgs.map((item, index) =>
          ShowDotsImg ? (
            <a
              key={index}
              href="#0"
              onTouchEnd={(e) => {
 e.stopPropagation(); 
}}
              onClick={(e) => { 
                e.preventDefault(); 
                if (currentIndex !== index) {
 setCurrentIndex(index); 
}
              }}
              className={classNames('nav-links img-links', {
                'nav-links-active' : currentIndex === index
              })}
            >
              <img    src={`/${item}`} 
                className="img-dots"                                    
                alt={`${item}`}
              />
            </a>
          ) : (
            <a 
              key={index}
              href="#0"
              onTouchEnd={(e) => {
 e.stopPropagation(); 
}}
              onClick={(e) => { 
                e.preventDefault(); 
                if (currentIndex !== index) {
 setCurrentIndex(index); 
}
              }}
              className={classNames('nav-links', {
                'nav-links-active' : currentIndex === index
              })}
            ></a>
          )

        ))}
      </div>
    </div>
  );
};
