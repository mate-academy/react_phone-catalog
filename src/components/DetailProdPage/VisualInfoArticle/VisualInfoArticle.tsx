import { useEffect, useState } from 'react';
import { DetailProduct } from '../../../features/types/DetailProduct';
import cl from './VisualInfoArticle.module.scss';
import cn from 'classnames';
import { TechSpecs } from '../../ui/TechSpecs';
import { SectionTitle } from '../../titles/SectionTitle';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { AddToFavCartButton } from '../../ui/AddToFavCartButton';

type Props = {
  product: DetailProduct;
  className?: string;
};

// created map of actual colors similar to models color. Because browser's yellow is different from model's yellow
const actualColors = {
  black: '#21252a',
  gold: '#eaccaf',
  rosegold: '#f7c6be',
  silver: '#e2e2e4',
  spacegray: '#454447',
  green: '#b7e5d1',
  purple: '#b4abe3',
  red: '#b7092b',
  white: '#fffcf7',
  yellow: '#fde580',
  midnightgreen: '#38433b',
  midnight: '#171e27',
  pink: '#fec3fb',
  graphite: '#52504c',
  sirrablue: '#96abc4',
  spaceblack: '#312f2e',
  coral: '#f8614b',
  'rose-gold': '#e2b7b3',
  'sky-blue': '#cad8e5',
  starlight: '#ded6cb',
  'space-gray': '#454447',
  blue: '#124460',
};

const textContent = {
  techSpecs: {
    screen: {
      en: 'Screen',
      ua: 'Екран',
    },
    resolution: {
      en: 'Resolution',
      ua: 'Роздільна здатність',
    },
    processor: {
      en: 'Processor',
      ua: 'Процесор',
    },
    ram: {
      en: 'RAM',
      ua: "Оперативна пам'ять",
    },
  },

  selectors: {
    colors: {
      en: 'Available colors',
      ua: 'Доступні кольори',
    },
    capacity: {
      en: 'Select capacity',
      ua: 'Оберіть обсяг сховища',
    },
  },
};

export const VisualInfoArticle: React.FC<Props> = ({ product, className }) => {
  const { productList } = useAppSelector(st => st.products);
  const { language } = useAppSelector(st => st.global);
  //#region reload states
  const [selectedPhoto, setSelectedPhoto] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.color);
  const [selectedCapacity, setSelectedCapacity] = useState(product.capacity);

  const location = useLocation();

  useEffect(() => {
    setSelectedPhoto(product.images[0]);
    setSelectedColor(product.color);
    setSelectedCapacity(product.capacity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  //#endregion

  //#region url manipulation
  const { prodId } = useParams();

  function replacePartOfUrl(
    url: string,
    partToReplace: string,
    replaceWith: string,
  ) {
    return url.replace(partToReplace, replaceWith);
  }
  //#endregion

  const techSpecs = [
    [textContent.techSpecs.screen[language], product.screen],
    [textContent.techSpecs.resolution[language], product.resolution],
    [textContent.techSpecs.processor[language], product.processor],
    [textContent.techSpecs.ram[language], product.ram],
  ];

  const neededProduct = productList.find(prod => prod.itemId === product.id);

  return (
    <article className={`${cl.prodVisualInfo} ${className}`}>
      <SectionTitle className={cl.prodName} text={product.name} />

      <div className={cl.selectedPhoto}>
        <img
          src={`${selectedPhoto}`}
          alt="product photo"
          className={cl.selectedPhoto__img}
        />
      </div>

      <ul className={cl.photosList}>
        {product.images.map(img => (
          <li
            className={cl.photosList__item}
            key={img}
            onClick={() => setSelectedPhoto(img)}
          >
            <img
              src={`${img}`}
              alt="product photo"
              className={cl.photosList__photo}
            />
          </li>
        ))}
      </ul>

      <div className={cl.widgetsContainer}>
        <section className={cl.selectorsContainer}>
          <div>
            <h3 className={cl.selectorTitle}>
              {textContent.selectors.colors[language]}
            </h3>
            <ul className={cl.selectorList}>
              {product.colorsAvailable.map(color => (
                <li
                  key={color}
                  className={cn(cl.selectorList__color, {
                    [cl['selectorList__color--selected']]:
                      selectedColor === color,
                  })}
                >
                  <Link
                    className={cl.selectorList__colorButton}
                    to={`/${product.category}/${replacePartOfUrl(prodId || '', product.color, color)}`}
                    // @ts-expect-error - got property of object 'actualColors' by the string 'color'
                    style={{ backgroundColor: actualColors[color] }}
                  />
                </li>
              ))}
            </ul>
            <div className={cl.underline} />
          </div>

          <div>
            <h3 className={cl.selectorTitle}>
              {textContent.selectors.capacity[language]}
            </h3>
            <ul className={cl.selectorList}>
              {product.capacityAvailable.map(cap => (
                <li key={cap} className={cl.selectorList__capacity}>
                  <Link
                    className={cn(cl.selectorList__capacityButton, {
                      [cl['selectorList__capacityButton--selected']]:
                        selectedCapacity === cap,
                    })}
                    to={`/${product.category}/${replacePartOfUrl(prodId || '', product.capacity.toLowerCase(), cap.toLowerCase())}`}
                  >
                    {cap}
                  </Link>
                </li>
              ))}
            </ul>
            <div className={cl.underline} />
          </div>
        </section>

        <section className={cl.priceButtonsCharsContainer}>
          <div className={cl.priceContainer}>
            <p
              className={cl.priceContainer__price}
            >{`$${product.priceDiscount}`}</p>
            {product.priceRegular !== product.priceDiscount && (
              <del className={cl.priceContainer__fullPrice}>
                <p>{`$${product.priceRegular}`}</p>
              </del>
            )}
          </div>

          <AddToFavCartButton
            // @ts-expect-error - if this page is rendered, then product is not undefined
            product={neededProduct}
            height="48px"
            className={cl.buttons}
          />

          <TechSpecs chars={techSpecs} />
        </section>
      </div>
    </article>
  );
};
