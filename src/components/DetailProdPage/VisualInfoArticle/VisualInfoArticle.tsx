import { useState } from 'react';
import { DetailProduct } from '../../../features/types/DetailProduct';
import cl from './VisualInfoArticle.module.scss';
import cn from 'classnames';
import { TechSpecs } from '../../ui/TechSpecs';
import { SectionTitle } from '../../titles/SectionTitle';

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

export const VisualInfoArticle: React.FC<Props> = ({ product, className }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.color);
  const [selectedCapacity, setSelectedCapacity] = useState(product.capacity);

  const listOfSelectedColorImages = product.images.map(img => {
    const partWithColor = img.split('/')[3];

    return img.replace(partWithColor, selectedColor);
  });

  const techSpecs = [
    ['Screen', product.screen],
    ['Resolution', product.resolution],
    ['Processor', product.processor],
    ['RAM', product.ram],
  ];

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
        {listOfSelectedColorImages.map(img => (
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
            <h3 className={cl.selectorTitle}>Available colors</h3>
            <ul className={cl.selectorList}>
              {product.colorsAvailable.map(color => (
                <li
                  key={color}
                  className={cn(cl.selectorList__color, {
                    [cl['selectorList__color--selected']]:
                      selectedColor === color,
                  })}
                >
                  <button
                    className={cl.selectorList__colorButton}
                    onClick={() => setSelectedColor(color)}
                    // @ts-expect-error - got property of object 'actualColors' by the string 'color'
                    style={{ backgroundColor: actualColors[color] }}
                  />
                </li>
              ))}
            </ul>
            <div className={cl.underline} />
          </div>

          <div>
            <h3 className={cl.selectorTitle}>Select capacity</h3>
            <ul className={cl.selectorList}>
              {product.capacityAvailable.map(cap => (
                <li key={cap} className={cl.selectorList__capacity}>
                  <button
                    className={cn(cl.selectorList__capacityButton, {
                      [cl['selectorList__capacityButton--selected']]:
                        selectedCapacity === cap,
                    })}
                    onClick={() => setSelectedCapacity(cap)}
                  >
                    {cap}
                  </button>
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

          <div className={cl.buttonContainer}>
            <button className={cl.buttonContainer__cardButton}>
              Add to cart
            </button>
            <button className={cl.buttonContainer__favButton}>
              <svg className={cl.buttonContainer__favButtonIcon} />
            </button>
          </div>

          <TechSpecs chars={techSpecs} />
        </section>
      </div>
    </article>
  );
};
