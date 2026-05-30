import './Categories.scss';
import phones from '../../images/categories/Phones.png';
import tablets from '../../images/categories/tablets.png';
import accessories from '../../images/categories/accessories.png';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { useTranslation } from 'react-i18next';

type CategoriesCard = {
  title: string;
  image: string;
  type: string;
};

type CategoriesList = {
  phones: CategoriesCard;
  tablets: CategoriesCard;
  accessories: CategoriesCard;
};

export const Categories = () => {
  const { prods } = useAppSelector(state => state.prods);
  const { t } = useTranslation();

  const productsCount = (type: string) => {
    const newProds = prods.filter(product => product.category === type);

    return newProds.length;
  };

  const categoriesList: CategoriesList = {
    phones: {
      title: t('homePage.categories.category.phones'),
      image: phones,
      type: 'phones',
    },
    tablets: {
      title: t('homePage.categories.category.tablets'),
      image: tablets,
      type: 'tablets',
    },
    accessories: {
      title: t('homePage.categories.category.accessories'),
      image: accessories,
      type: 'accessories',
    },
  };

  return (
    <section className="categories">
      <div className="container">
        <div className="categories__content">
          <h2 className="categories__title">
            {t('homePage.categories.categoriesTitle')}
          </h2>
          <div className="categories__items">
            {Object.values(categoriesList).map(category => (
              <div className="categories__item" key={category.title}>
                <Link to={`${category.type}`} className="categories__item_link">
                  <img
                    src={category.image}
                    alt="Phones"
                    className="categories__item_link-img"
                  />
                </Link>

                <div className="categories__info">
                  <h3 className="categories__info--title">{category.title}</h3>
                  <p className="categories__info--text">{`${productsCount(category.type)} models`}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
