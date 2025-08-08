import { Link } from 'react-router-dom';
import categoriesStyle from './Categories.module.scss';

const Categories = () => {
  return (
    <>
      <div className={categoriesStyle.categories}>
        <h1 className={categoriesStyle.categories__title}>Shop by category</h1>

        <div className={categoriesStyle['categories__options-wrapper']}>
          <div
            className={`${categoriesStyle.categories__content} ${categoriesStyle['categories__content--1']}`}
          >
            <div
              className={`${categoriesStyle['categories__image-wrapper']} ${categoriesStyle['categories__image-wrapper--1']}`}
            >
              <Link
                to="phones?quantity=16&sort=newest"
                className={categoriesStyle.categories__link}
              >
                <img
                  src="public/img/phone-category.png"
                  alt=""
                  className={`${categoriesStyle.categories__image} ${categoriesStyle['categories__image--1']}`}
                />
              </Link>
            </div>

            <h2 className={categoriesStyle.categories__name}>Mobile phones</h2>
            <span className={categoriesStyle.categories__gadgets__info}>
              95 models
            </span>
          </div>

          <div
            className={`${categoriesStyle.categories__content} ${categoriesStyle['categories__content--2']}`}
          >
            <div
              className={`${categoriesStyle['categories__image-wrapper']} ${categoriesStyle['categories__image-wrapper--2']}`}
            >
              <Link
                to="tablets?quantity=16&sort=newest"
                className={categoriesStyle.categories__link}
              >
                <img
                  src="public/img/tablets-category.png"
                  alt=""
                  className={`${categoriesStyle.categories__image} ${categoriesStyle['categories__image--2']}`}
                />
              </Link>
            </div>

            <h2 className={categoriesStyle.categories__name}>Tablets</h2>
            <p className={categoriesStyle.categories__gadgets__info}>
              24 models
            </p>
          </div>

          <div
            className={`${categoriesStyle.categories__content} ${categoriesStyle['categories__content--3']}`}
          >
            <div
              className={`${categoriesStyle['categories__image-wrapper']} ${categoriesStyle['categories__image-wrapper--3']}`}
            >
              <Link
                to="accessories?quantity=16&sort=newest"
                className={categoriesStyle.categories__link}
              >
                <img
                  src="public/img/accessories-category.b914f4124f0dab3439fb.png"
                  alt=""
                  className={`${categoriesStyle.categories__image} ${categoriesStyle['categories__image--3']}`}
                />
              </Link>
            </div>

            <h2 className={categoriesStyle.categories__name}>Accessories</h2>
            <p className={categoriesStyle.categories__gadgets__info}>
              100 models
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
