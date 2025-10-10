import styles from './Home.module.css';
import Title from './components/Title';
import ChevronButton from '../../components/ChevronButton';
import Banner from '../../components/Banner.tsx';
import IndicatorDots from '../../components/IndicatorDots/IndicatorDots';
import { BrandNewModels } from '../../components/BrandNewModels';
import SubTitle from './components/SubTitle';

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
      <SubTitle text="Brand new models" level={1} />
      <section
        className={styles.sectionBrandNewModels}
        data-testid="section-bannerNewModels"
      >
        <div
          className={styles.containerBrandFlex}
          data-testid="container-brand"
        >
          <BrandNewModels>
            <div
              className={`${styles.containerImgSilver}`.trim()}
              role="img"
              aria-label="Card Brand New Models"
            />
            <div
              className={styles.containerTitle}
              aria-label="Title Brand New Models"
            >
              <span className={styles.subtitle}>
                Apple iPhone 14 Pro 128GB Silver (MQ023)
              </span>
            </div>
            <div
              className={styles.containerPrice}
              aria-label="Price Brand New Models"
            >
              <span className={styles.price}>$ 999</span>
            </div>
            <div
              className={styles.separator}
              aria-label="Price Brand New Models"
            ></div>
            <div
              className={styles.containerBlock}
              aria-label="Screen Brand New Models"
            >
              <div
                className={styles.containerScreen}
                aria-label="Screen Brand New Models"
              >
                <span className={styles.screen}>Screen</span>
                <span className={styles.screenBold}>{'6.1" OLED'}</span>
              </div>
              <div
                className={styles.containerScreen}
                aria-label="Screen Brand New Models"
              >
                <span className={styles.screen}>Capacity</span>
                <span className={styles.screenBold}>128 GB</span>
              </div>
              <div
                className={styles.containerScreen}
                aria-label="Screen Brand New Models"
              >
                <span className={styles.screen}>RAM</span>
                <span className={styles.screenBold}>6 GB</span>
              </div>
            </div>
          </BrandNewModels>
          <BrandNewModels>
            <div
              className={`${styles.containerImgPurple}`.trim()}
              role="img"
              aria-label="Card Brand New Models"
            />
            <div
              className={styles.containerTitle}
              aria-label="Title Brand New Models"
            >
              <span className={styles.subtitle}>
                Apple iPhone 14 Pro 128GB Deep Purple (MQ0G3)
              </span>
            </div>
            <div
              className={styles.containerPrice}
              aria-label="Price Brand New Models"
            >
              <span className={styles.price}>$ 999</span>
            </div>
            <div
              className={styles.separator}
              aria-label="Price Brand New Models"
            ></div>
            <div
              className={styles.containerBlock}
              aria-label="Screen Brand New Models"
            >
              <div
                className={styles.containerScreen}
                aria-label="Screen Brand New Models"
              >
                <span className={styles.screen}>Screen</span>
                <span className={styles.screenBold}>{'6.1" OLED'}</span>
              </div>
              <div
                className={styles.containerScreen}
                aria-label="Screen Brand New Models"
              >
                <span className={styles.screen}>Capacity</span>
                <span className={styles.screenBold}>128 GB</span>
              </div>
              <div
                className={styles.containerScreen}
                aria-label="Screen Brand New Models"
              >
                <span className={styles.screen}>RAM</span>
                <span className={styles.screenBold}>6 GB</span>
              </div>
            </div>
          </BrandNewModels>
          <BrandNewModels>
            <div
              className={`${styles.containerImgGold}`.trim()}
              role="img"
              aria-label="Card Brand New Models"
            />
            <div
              className={styles.containerTitle}
              aria-label="Title Brand New Models"
            >
              <span className={styles.subtitle}>
                Apple iPhone 14 Pro 128GB Gold (MQ083)
              </span>
            </div>
            <div
              className={styles.containerPrice}
              aria-label="Price Brand New Models"
            >
              <span className={styles.price}>$ 999</span>
            </div>
            <div
              className={styles.separator}
              aria-label="Price Brand New Models"
            ></div>
            <div
              className={styles.containerBlock}
              aria-label="Screen Brand New Models"
            >
              <div
                className={styles.containerScreen}
                aria-label="Screen Brand New Models"
              >
                <span className={styles.screen}>Screen</span>
                <span className={styles.screenBold}>{'6.1" OLED'}</span>
              </div>
              <div
                className={styles.containerScreen}
                aria-label="Screen Brand New Models"
              >
                <span className={styles.screen}>Capacity</span>
                <span className={styles.screenBold}>128 GB</span>
              </div>
              <div
                className={styles.containerScreen}
                aria-label="Screen Brand New Models"
              >
                <span className={styles.screen}>RAM</span>
                <span className={styles.screenBold}>6 GB</span>
              </div>
            </div>
          </BrandNewModels>
          <BrandNewModels>
            <div
              className={`${styles.containerImgRed}`.trim()}
              role="img"
              aria-label="Card Brand New Models"
            />
            <div
              className={styles.containerTitle}
              aria-label="Title Brand New Models"
            >
              <span className={styles.subtitle}>
                Apple iPhone 14 Plus 128GB PRODUCT Red (MQ513)
              </span>
            </div>
            <div
              className={styles.containerPrice}
              aria-label="Price Brand New Models"
            >
              <span className={styles.price}>$ 859</span>
            </div>
            <div
              className={styles.separator}
              aria-label="Price Brand New Models"
            ></div>
            <div
              className={styles.containerBlock}
              aria-label="Screen Brand New Models"
            >
              <div
                className={styles.containerScreen}
                aria-label="Screen Brand New Models"
              >
                <span className={styles.screen}>Screen</span>
                <span className={styles.screenBold}>{'6.1" OLED'}</span>
              </div>
              <div
                className={styles.containerScreen}
                aria-label="Screen Brand New Models"
              >
                <span className={styles.screen}>Capacity</span>
                <span className={styles.screenBold}>128 GB</span>
              </div>
              <div
                className={styles.containerScreen}
                aria-label="Screen Brand New Models"
              >
                <span className={styles.screen}>RAM</span>
                <span className={styles.screenBold}>6 GB</span>
              </div>
            </div>
          </BrandNewModels>
        </div>
      </section>
    </main>
  );
};

export default Home;
