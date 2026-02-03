import styles from './style.module.scss';
import Carousel from '../Сarousel/Carousel';
import BannerSlider from '../BannerSlider/BannerSlider';
import ShopByCategory from '../ShopByCategory/ShopByCategory';

const Content = () => {
  return (
    <div className="container">
      <div className="content_grid">
        <section>
          <h1 className={styles.welcome}>Welcome to Nice Gadgets store!</h1>
        </section>
        <BannerSlider />
        <Carousel title="Brand new models" type="brand-new" />

        <ShopByCategory />

        <Carousel title="Hot prices" type="hot-prices" />
      </div>
    </div>
  );
};

export default Content;
