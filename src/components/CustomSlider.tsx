import { FC, ReactNode } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

type Props = {
  children: ReactNode,
};

export const CustomSlider: FC<Props> = ({ children }) => {
  // const flickityOptions = {
  //   pageDots: false,
  //   cellAlign: '0',
  //   groupCells: true,
  // };
  const responsiveSettings = [
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ];

  return (
    <Slide
      slidesToScroll={4}
      slidesToShow={4}
      indicators={false}
      responsive={responsiveSettings}
    >
      {children}
    </Slide>
  );
};
