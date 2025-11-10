import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;

  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'transparent',
        right: '0px',
        height: '100%',
        width: '100%',
        borderRadius: '48px',
        border: '1px solid #B4BDC3',
      }}
      onClick={onClick}
    >
      <span style={{ color: '#0F0F11', fontSize: '26px' }}>›</span>
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;

  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'transparent',
        height: '100%',
        width: '100%',
        left: '0px',
        borderRadius: '48px',
        border: '1px solid #B4BDC3',
      }}
      onClick={onClick}
    >
      <span style={{ color: '#0F0F11', fontSize: '26px' }}>‹</span>
    </div>
  );
}

export const SliderHeader = () => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    swipe: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: (i: number) => (
      <div
        key={i}
        style={{
          width: '14px',
          height: '4px',
          backgroundColor: '#e2e6e9',
        }}
      ></div>
    ),
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 639,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img src="img/header/slider.png" className="slider-picture" />
        </div>
        <div>
          <img src="img/header/slider.png" className="slider-picture" />
        </div>
        <div>
          <img src="img/header/slider.png" className="slider-picture" />
        </div>
      </Slider>
    </div>
  );
};

export default SliderHeader;
