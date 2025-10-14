import styles from './Home.module.css';
import Title from './components/Title';
import ChevronButton from '../../components/ChevronButton';
import Banner from '../../components/Banner.tsx';
import IndicatorDots from '../../components/IndicatorDots/IndicatorDots';
import { BrandNewModels } from '../../components/BrandNewModels';
import SubTitle from './components/SubTitle';
import { Card as ShopCategory } from '../../components/ShopCategory/ShopCategory';

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

      <div className={styles.TitleSection}>
        <SubTitle text="Brand new models" />
      </div>

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
      <div className={styles.TitleSection}>
        <SubTitle text="Shop by category" level={2} />
      </div>

      <section className={styles.ShopByCategory} data-testid="Shop-ByCategory">
        <div className={styles.containerShopFlex} data-testid="container-brand">
          <ShopCategory imageClassName={styles.Mobile}>
            <div>
              <p className={styles.title}>Mobile phones</p>
              <span className={styles.subtitle}>95 models</span>
            </div>
          </ShopCategory>
          <ShopCategory imageClassName={styles.Tablets}>
            <div>
              <p className={styles.title}>Tablets</p>
              <span className={styles.subtitle}>24 models</span>
            </div>
          </ShopCategory>
          <ShopCategory imageClassName={styles.Mobile}>
            <div>
              <p className={styles.title}>Mobile phones</p>
              <span className={styles.subtitle}>95 models</span>
            </div>
          </ShopCategory>
        </div>
      </section>

      <div className={styles.TitleSection}>
        <SubTitle text="Hot Price" />
      </div>

      <section className={styles.sectionBrandNewModels} data-testid="Hot-Price">
        <div
          className={styles.containerBrandFlex}
          data-testid="container-brand"
        >
          <BrandNewModels>
            <div
              className={`${styles.containerHotPrice1}`.trim()}
              role="img"
              aria-label="Card Brand New Models"
            />
            <div
              className={styles.containerTitle}
              aria-label="Title Brand New Models"
            >
              <span className={styles.subtitle}>
                Apple iPhone 11 Pro Max 512GB Midnight Green (iMT9G2FS/A)
              </span>
            </div>
            <div
              className={styles.containerPrice}
              aria-label="Price Brand New Models"
            >
              <span className={styles.price}>$ 849</span>
              <span className={styles.priceOff}>$ 1199</span>
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
                <span className={styles.screenBold}>512 GB</span>
              </div>
              <div
                className={styles.containerScreen}
                aria-label="Screen Brand New Models"
              >
                <span className={styles.screen}>RAM</span>
                <span className={styles.screenBold}>4 GB</span>
              </div>
            </div>
          </BrandNewModels>
          <BrandNewModels>
            <div
              className={`${styles.containerHotPrice1}`.trim()}
              role="img"
              aria-label="Card Brand New Models"
            />
            <div
              className={styles.containerTitle}
              aria-label="Title Brand New Models"
            >
              <span className={styles.subtitle}>
                Apple iPhone 11 Pro Max 512GB Midnight Green (iMT9G2FS/A)
              </span>
            </div>
            <div
              className={styles.containerPrice}
              aria-label="Price Brand New Models"
            >
              <span className={styles.price}>$ 849</span>
              <span className={styles.priceOff}>$ 1199</span>
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
                <span className={styles.screenBold}>512 GB</span>
              </div>
              <div
                className={styles.containerScreen}
                aria-label="Screen Brand New Models"
              >
                <span className={styles.screen}>RAM</span>
                <span className={styles.screenBold}>4 GB</span>
              </div>
            </div>
          </BrandNewModels>
          <BrandNewModels>
            <div
              className={`${styles.containerHotPrice1}`.trim()}
              role="img"
              aria-label="Card Brand New Models"
            />
            <div
              className={styles.containerTitle}
              aria-label="Title Brand New Models"
            >
              <span className={styles.subtitle}>
                Apple iPhone 11 Pro Max 512GB Midnight Green (iMT9G2FS/A)
              </span>
            </div>
            <div
              className={styles.containerPrice}
              aria-label="Price Brand New Models"
            >
              <span className={styles.price}>$ 849</span>
              <span className={styles.priceOff}>$ 1199</span>
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
                <span className={styles.screenBold}>512 GB</span>
              </div>
              <div
                className={styles.containerScreen}
                aria-label="Screen Brand New Models"
              >
                <span className={styles.screen}>RAM</span>
                <span className={styles.screenBold}>4 GB</span>
              </div>
            </div>
          </BrandNewModels>
          <BrandNewModels>
            <div
              className={`${styles.containerHotPrice1}`.trim()}
              role="img"
              aria-label="Card Brand New Models"
            />
            <div
              className={styles.containerTitle}
              aria-label="Title Brand New Models"
            >
              <span className={styles.subtitle}>
                Apple iPhone 11 Pro Max 512GB Midnight Green (iMT9G2FS/A)
              </span>
            </div>
            <div
              className={styles.containerPrice}
              aria-label="Price Brand New Models"
            >
              <span className={styles.price}>$ 849</span>
              <span className={styles.priceOff}>$ 1199</span>
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
                <span className={styles.screenBold}>512 GB</span>
              </div>
              <div
                className={styles.containerScreen}
                aria-label="Screen Brand New Models"
              >
                <span className={styles.screen}>RAM</span>
                <span className={styles.screenBold}>4 GB</span>
              </div>
            </div>
          </BrandNewModels>
        </div>
      </section>
    </main>
  );
};

export default Home;
