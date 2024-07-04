/* eslint-disable */
import { Link, useParams } from 'react-router-dom';
import { BreadCrumbs } from '../components/BreadCrumbs/BreadCrumbs';
import style from '../modules/ProductDetailsPage.module.scss';
import { Category } from '../enums/Category';
import { getPhones } from '../utils/fetchMethods';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Gadgets } from '../types/ContextType/Gadgets';
import { AvailableColors } from '../enums/AvailableColors';
import { IconFavorites } from '../components/Icons/IconFavorites';
import { ThemeContext } from '../store/ThemeProvider';
import classNames from 'classnames';
import { SectionCards } from '../components/Main/SectionCards';
import { ProductsContext } from '../store/ProductsProvider';
import { changeIdsParams } from '../utils/changeIdsParams';
import { LanguageContext } from '../store/LanguageProvider';
import { BackButton } from '../components/BackButton/BackButton';

type Props = {
  type: Category;
};

export const ProductDetailsPage: React.FC<Props> = ({ type }) => {
  const { productId } = useParams<{ productId: string }>();
  const { t } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const { products } = useContext(ProductsContext);

  const [categoryProduct, setCategoryProduct] = useState<Gadgets>();
  const [imageState, setImage] = useState('');

  useEffect(() => {
    async function fetchData() {
      let response = await getPhones(type);

      let detailsProduct;
      if (response) {
        detailsProduct = response.find(item => item.id === productId);

        if (detailsProduct) {
          setCategoryProduct(detailsProduct);
          setImage(detailsProduct.images[0]);
        }
      }
    }

    fetchData();
  }, [type, productId]);

  if (!categoryProduct) {
    return <div>Loading...</div>;
  }

  const {
    // id,
    category,
    // namespaceId,
    name,
    capacityAvailable,
    capacity,
    priceRegular,
    priceDiscount,
    colorsAvailable,
    color,
    images,
    description,
    screen,
    resolution,
    processor,
    ram,
    camera,
    zoom,
    cell,
  } = categoryProduct;

  const recomended = products.filter(item => item.category === category);

  return (
    <div
      className={classNames(style.product, {
        [style.product__darkTheme]: theme,
      })}
    >
      <BreadCrumbs />
      <BackButton />

      <h1 className={style.product__phoneName}>{name}</h1>

      <div className={style.product__gridContainer}>
        <ul className={style.product__imagesList}>
          {images.map(image => (
            <li
              className={classNames(style.product__borderImage, {
                [style.product__activeBorderImage]: imageState === image,
              })}
              key={image}
            >
              <button
                className={style.product__buttonForImage}
                onClick={() => setImage(image)}
              >
                <img
                  src={image}
                  alt="Gadget"
                  className={style.product__smallImage}
                />
              </button>
            </li>
          ))}
        </ul>

        <div className={style.product__mainImageWrapper}>
          <img
            src={imageState}
            alt="Gadget"
            className={style.product__mainImage}
          />
        </div>

        <div className={style.product__paramsContainer}>
          <p className={style.product__namesParams}>{t('availableColors')}</p>
          <p className={style.product__ids}>ID: 802390</p>

          <div className={style.product__availableColors}>
            {colorsAvailable.map(currentColor => {
              const colorNew = {
                backgroundColor:
                  AvailableColors[currentColor as keyof typeof AvailableColors],
              };

              const newColorIds = changeIdsParams(
                color,
                currentColor,
                productId,
              );
              return (
                <Link
                  to={`../${newColorIds}`}
                  key={currentColor}
                  className={classNames(style.product__colorParam, {
                    [style.product__active]: currentColor === color,
                  })}
                  style={colorNew}
                ></Link>
              );
            })}
          </div>

          <span className={style.product__line} />

          <div className={style.product__capacityBlock}>
            <p className={style.product__namesParams}>{t('capacity')}</p>
            <div className={style.product__capacityList}>
              {capacityAvailable.map(item => {
                const newCapacityIds = changeIdsParams(
                  capacity,
                  item,
                  productId,
                );

                return (
                  <Link
                    to={`../${newCapacityIds}`}
                    className={classNames(style.product__capacityLink, {
                      [style.product__capacityActiveLink]: capacity === item,
                    })}
                    key={item}
                  >
                    {item}
                  </Link>
                );
              })}
            </div>
          </div>
          <span className={style.product__line} />

          <div className={style.product__orderContainer}>
            <div className={style.product__sectionPrice}>
              <p className={style.product__priceRegular}>${priceRegular}</p>
              <p className={style.product__priceDiscount}>${priceDiscount}</p>
            </div>

            <div className={style.product__orderButtons}>
              <button className={style.product__addToCart}>
                {t('addToCart')}
              </button>
              <button className={style.product__favorites}>
                <IconFavorites />
              </button>
            </div>

            <div className={style.product__shortDesription}>
              <p className={style.product__shortDesKey}>{t('screen')}</p>
              <p className={style.product__shortDesValue}>{screen}</p>
            </div>
            <div className={style.product__shortDesription}>
              <p className={style.product__shortDesKey}>{t('resolution')}</p>
              <p className={style.product__shortDesValue}>{resolution}</p>
            </div>
            <div className={style.product__shortDesription}>
              <p className={style.product__shortDesKey}>{t('processor')}</p>
              <p className={style.product__shortDesValue}>{processor}</p>
            </div>
            <div className={style.product__shortDesription}>
              <p className={style.product__shortDesKey}>{t('ram')}</p>
              <p className={style.product__shortDesValue}>{ram}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={style.product__gridContainer}>
        <section className={style.product__aboutSection}>
          <h2 className={style.product__sectionTitle}>{t('about')}</h2>
          <span className={style.product__line} />

          {description.map(({ title, text }) => (
            <article key={title}>
              <h2 className={style.product__articleTitle}>{title}</h2>
              <p className={style.product__sectionParagraph}>{text}</p>
            </article>
          ))}
        </section>
        <section className={style.product__techSpecsSection}>
          <h2 className={style.product__sectionTitle}>{t('techSpecs')}</h2>
          <span className={style.product__line} />
          <div className={style.product__techSpecsParams}>
            <div className={style.product__shortDesription}>
              <p className={style.product__shortDesKey}>{t('screen')}</p>
              <p className={style.product__shortDesValue}>{screen}</p>
            </div>
            <div className={style.product__shortDesription}>
              <p className={style.product__shortDesKey}>{t('resolution')}</p>
              <p className={style.product__shortDesValue}>{resolution}</p>
            </div>
            <div className={style.product__shortDesription}>
              <p className={style.product__shortDesKey}>{t('processor')}</p>
              <p className={style.product__shortDesValue}>{processor}</p>
            </div>
            <div className={style.product__shortDesription}>
              <p className={style.product__shortDesKey}>{t('ram')}</p>
              <p className={style.product__shortDesValue}>{ram}</p>
            </div>
            <div className={style.product__shortDesription}>
              <p className={style.product__shortDesKey}>{t('builtInMemory')}</p>
              <p className={style.product__shortDesValue}>{capacity}</p>
            </div>
            <div className={style.product__shortDesription}>
              <p className={style.product__shortDesKey}>{t('camera')}</p>
              <p className={style.product__shortDesValue}>{camera}</p>
            </div>
            <div className={style.product__shortDesription}>
              <p className={style.product__shortDesKey}>{t('zoom')}</p>
              <p className={style.product__shortDesValue}>{zoom}</p>
            </div>
            <div className={style.product__shortDesription}>
              <p className={style.product__shortDesKey}>{t('cell')}</p>
              <p className={style.product__shortDesValue}>{cell}</p>
            </div>
          </div>
        </section>
      </div>

      <div>
        <SectionCards products={recomended} title={t('youMayAlsoLike')} />
      </div>
    </div>
  );
};
