import React from 'react';
import './ProductInfo.scss';
import home from '../../img/home.svg';
import goto from '../../img/arrowRight.svg';
import back from '../../img/arrowLeft.svg';
import { GlassyOrbLoader } from '../Loader';
import heart from '../../img/heart.svg';
import like from '../../img/heartRed.svg';
import { useInfoHook } from './useInfoHook';
import { ProductSlider } from '../ProductCard';
import { NavLink, useParams } from 'react-router-dom';
import { NameSlider } from '../../types/nameslider';

export const ProductInfo: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  const {
    selectedPhone,
    mainImg,
    loading,
    navigate,
    
  }
}
