import { useEffect } from 'react';
import './HomePage.scss';
import { getProducts } from '../../api/products';
import { BannerSlider, Wrapper } from '../../components';

export const HomePage = () => {
  useEffect(() => {
    getProducts().then(res => console.log(res));
  }, []);

  return (
    <div className="home">
      <Wrapper>
        <BannerSlider />
      </Wrapper>
    </div>
  );
};
