import { useEffect } from 'react';

import { loadComponentStyles } from '../../redux/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import SomeSwiperino from '../Swiper/Swiper';
import './Home.scss';


export const Home: React.FC = () => {
  const { currentTheme } = useSelector((state: RootState) =>
    state.theme);
  const componentName = 'Home';
  const dispatch = useDispatch();

  return (
    <div className="main">
      <h1>Home PAGE</h1>
      <div className='slider-container'>
        <SomeSwiperino />
      </div>
    </div>
  );
};
