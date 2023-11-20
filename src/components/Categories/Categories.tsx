import phone from '../../images/categories/phone.jpg';
import tablet from '../../images/categories/tablet.jpg';
import accessories from '../../images/categories/accessories.jpg';
import './Categories.scss';

export const Categories = () => {
  return (
    <div className="categories">
      <h1 className="categories__title">Shop by category</h1>
      <div className="categories__bottom">
        <div className="category">
          <img src={phone} alt="phones" className="category__img" />
          <h1 className="category__title">Mobile phones</h1>
          <p className="category__num">95 models</p>
        </div>
        <div className="category">
          <img src={tablet} alt="" className="category__img" />
          <h1 className="category__title">Tablets</h1>
          <p className="category__num">24 models</p>
        </div>
        <div className="category">
          <img src={accessories} alt="accessories" className="category__img" />
          <h1 className="category__title">Accessories</h1>
          <p className="category__num">100 models</p>
        </div>
      </div>
    </div>
  );
};
