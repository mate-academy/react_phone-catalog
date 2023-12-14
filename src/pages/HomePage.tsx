import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { HotPrices } from '../components/HotPrices/HotPrices';
import { PictureSlider } from '../components/PictureSlider/PictureSlider';
import { GlobalContext } from '../Context/GlobalContext';
import { inlineStyles } from '../utils/inlineStyles';
import { BrandNew } from '../components/BrandNew/BrandNew';

export const HomePage = () => {
  const { products } = useContext(GlobalContext);
  const tablets = products.filter(item => item.category === 'tablets');
  const accessories = products.filter(item => item.category === 'accessories');

  return (
    <>
      <PictureSlider />
      <HotPrices />
      <section className="section shop-by-category">
        <h2 className="section_title page-title-style">Shop by category</h2>
        <div className="shop-by-category_body">
          <div className="shop-by-category_box">
            <Link
              to="/phones"
              className="shop-by-category_img shop-by-category_img--phones"
            />
            <div className="details">
              <Link
                to="./phones"
                className="h3-text-style"
                style={{ color: inlineStyles.colors.primaryColor }}
              >
                Mobile phones
                <p
                  className="body-text-style"
                  style={{ color: inlineStyles.colors.secondaryColor }}
                >
                  {`${products.length} models`}
                </p>
              </Link>
            </div>
          </div>
          <div className="shop-by-category_box">
            <Link
              to="/tablets"
              className="shop-by-category_img shop-by-category_img--tablets"
            />
            <div className="details">
              <Link
                to="./tablets"
                className="h3-text-style"
                style={{ color: inlineStyles.colors.primaryColor }}
              >
                Tablets
                <p
                  className="body-text-style"
                  style={{ color: inlineStyles.colors.secondaryColor }}
                >
                  {`${tablets.length} models`}
                </p>
              </Link>
            </div>
          </div>
          <div className="shop-by-category_box">
            <Link
              to="/accessories"
              className="shop-by-category_img shop-by-category_img--accessories"
            />
            <div className="details">
              <Link
                to="./accessories"
                className="h3-text-style"
                style={{ color: inlineStyles.colors.primaryColor }}
              >
                Accessories
                <p
                  className="body-text-style"
                  style={{ color: inlineStyles.colors.secondaryColor }}
                >
                  {`${accessories.length} models`}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <BrandNew />
    </>
  );
};
