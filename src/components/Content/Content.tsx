import styles from './style.module.scss';
import Carousel from '../Carousel/Carousel';
import BannerSlider from '../BannerSlider/BannerSlider';
import ShopByCategory from '../ShopByCategory/ShopByCategory';

const Content = () => {
  return (
    <div className="content_grid">
      <section>
        <h1 className={styles.visually_hidden}>Product Catalog</h1>
        <h2 className={styles.welcome}>Welcome to Nice Gadgets store!</h2>
      </section>
      <BannerSlider />
      <Carousel title="Brand new models" type="brand-new" />

      <ShopByCategory />

      <Carousel title="Hot prices" type="hot-prices" />
    </div>
  );
};

export default Content;
