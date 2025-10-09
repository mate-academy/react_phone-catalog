import React from 'react';
import styles from './Home.module.css';
import Title from './components/Title';
import ChevronButton from '../../components/ChevronButton';
import Banner from '../../components/Banner.tsx';
import IndicatorDots from '../../components/IndicatorDots/IndicatorDots';

const Home = () => {
  return (
    <main>
      <Title text="Welcome to Nice Gadgets store!" level={1} />
      <section className={styles.sectionBanner} data-testid="section-banner">
        <div className={styles.containerBanner} data-testid="container-banner">
          <ChevronButton onClick={() => {}} />
          <Banner></Banner>
          <ChevronButton
            onClick={() => {}}
            direction="right"
            aria-label="Avançar"
          />
        </div>

        <div className={styles.containerDots} data-testid="container-dots">
          <IndicatorDots
            count={3}
            activeIndex={0} // índice fixo já que os botões não alteram o banner
            size={10}
            gap={10}
            activeColor="#000"
            inactiveColor="#ddd"
          />
        </div>
      </section>
    </main>
  );
};

export default Home;
