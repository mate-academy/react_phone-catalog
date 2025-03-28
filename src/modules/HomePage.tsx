import React from 'react';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { HeaderSlider } from '../components/HeaderSlider/HeaderSlider';
import { Main } from '../components/Main/Main';

// type Props = {
//   setSideBarVisible: (arg: boolean) => void;
// }

export const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <HeaderSlider />
      <Main/>
      <Footer/>
    </>
  );
};
