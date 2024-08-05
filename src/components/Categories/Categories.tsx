import { Product } from '../../types/Product';
import { getNumberOfProductsByCategory } from '../../utils/helper';
import { CategoryCard } from '../CategoryCard';
import { Category } from '../../types/Category';
import { CategoriesList } from '../../types/CategoriesList';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../utils/i18n/translations';
import phonesCategory from '../../images/categories/categories-phones.jpg';
import tabletsCategory from '../../images/categories/categories-tablets.jpg';
// eslint-disable-next-line max-len
import accessoriesCategory from '../../images/categories/categories-accessories.jpg';
import styles from './Categories.module.scss';
import gStyles from '../../styles/general.module.scss';

type Props = {
  products: Product[];
};

export const Categories: React.FC<Props> = ({ products }) => {
  const { t } = useTranslation();

  const CATEGORIES_LIST: CategoriesList = {
    phones: {
      title: t(TRANSLATIONS.category.card.phones.title.text),
      link: '/phones',
      ariaLabelLink: t(TRANSLATIONS.category.card.phones.title.ariaLabel),
      imageUrl: phonesCategory,
      imageAlt: 'iPhone 14 Pro on a gray background',
      quantity: 0,
    },
    tablets: {
      title: t(TRANSLATIONS.category.card.tablets.title.text),
      link: '/tablets',
      ariaLabelLink: t(TRANSLATIONS.category.card.tablets.title.ariaLabel),
      imageUrl: tabletsCategory,
      imageAlt: 'three tablets on a light gray background',
      quantity: 0,
    },
    accessories: {
      title: t(TRANSLATIONS.category.card.accessories.title.text),
      link: '/accessories',
      ariaLabelLink: t(TRANSLATIONS.category.card.accessories.title.ariaLabel),
      imageUrl: accessoriesCategory,
      imageAlt: 'three phones in cases on a light red background',
      quantity: 0,
    },
  };

  CATEGORIES_LIST.phones.quantity = getNumberOfProductsByCategory(
    products,
    Category.PHONES,
  );
  CATEGORIES_LIST.tablets.quantity = getNumberOfProductsByCategory(
    products,
    Category.TABLETS,
  );
  CATEGORIES_LIST.accessories.quantity = getNumberOfProductsByCategory(
    products,
    Category.ACCESSORIES,
  );

  return (
    <section className={styles.block}>
      <h2 className={gStyles.sectionTitle}>
        {t(TRANSLATIONS.categories.title)}
      </h2>
      <div className={styles.block__content}>
        {Object.entries(CATEGORIES_LIST).map((category, index) => {
          const { title, link, ariaLabelLink, imageUrl, imageAlt, quantity } =
            category[1];

          return (
            <CategoryCard
              key={index}
              title={title}
              link={link}
              ariaLabelLink={ariaLabelLink}
              imageUrl={imageUrl}
              imageAlt={imageAlt}
              quantity={quantity}
            />
          );
        })}
      </div>
    </section>
  );
};
