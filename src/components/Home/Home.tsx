import { useEffect } from 'react';

import { loadComponentStyles } from '../../redux/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import SomeSwiperino from '../Swiper/Swiper';
import SliderDemo from '../CustomSlider/CustomSlider';
import './Home.scss';


export const Home: React.FC = () => {
  const { currentTheme } = useSelector((state: RootState) =>
    state.theme);
  const componentName = 'Home';
  const dispatch = useDispatch();

  return (
    <div className="home-main">
      <h1>Welcome to iSupply store 🌞</h1>
      <SliderDemo />
    </div>
  );
};
