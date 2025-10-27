import style from './Category.module.scss';
import { phones, tablets, accessories } from './index';

export const Category = () => {
  return (
    <section className="section">
      <div className="container">
        <h1 className={`title ${style.title}`}>Shop by category</h1>

        <div className={style.category}>
          <div className={style.phones}>
            <a href="#" className={style.category__link}>
              <img src={phones} alt="category phone" />
              <div className={style.bottom}>
                <h2 className="title">Mobile phones</h2>
                <span>2</span>
              </div>
            </a>
          </div>
          <div className={style.tablets}>
            <a href="#" className={style.category__link}>
              <img src={tablets} alt="category table" />
              <div className={style.bottom}>
                <h2 className="title">Tablets</h2>
                <span>2</span>
              </div>
            </a>
          </div>
          <div className={style.accessories}>
            <a href="#" className={style.category__link}>
              <img src={accessories} alt="category accessories" />
              <div className={style.bottom}>
                <h2 className="title">Accessories</h2>
                <span>1</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
