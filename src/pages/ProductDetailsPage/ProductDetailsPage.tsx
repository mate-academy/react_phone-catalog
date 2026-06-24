import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { asset } from '../../utils/paths';
import { usePhones } from '../../hooks/usePhones';
import { useAccessories } from '../../hooks/useAccessories';
import { useTablets } from '../../hooks/useTablets';
import styles from './ProductDetailsPage.module.scss';
import { Breadcrumbs } from '../CatalogPage/Breadcrumbs/Breadcrumbs';

export const ProductDetailsPage = () => {
  const { category, productId } = useParams();

  const { phones } = usePhones();
  const { accessories } = useAccessories();
  const { tablets } = useTablets();

  const product = useMemo(() => {
    switch (category) {
      case 'phones':
        return phones.find(p => p.id === productId);

      case 'tablets':
        return tablets.find(p => p.id === productId);

      case 'accessories':
        return accessories.find(p => p.id === productId);

      default:
        return undefined;
    }
  }, [category, productId, phones, tablets, accessories]);

  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <section className={styles.details}>
      <Breadcrumbs />

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.topContent}>
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {product.images.map((img, index) => (
              <button
                key={img}
                onClick={() => setActiveImage(index)}
                className={index === activeImage ? styles.active : ''}
              >
                <img src={asset(img)} alt={product.name} />
              </button>
            ))}
          </div>

          <div className={styles.mainImage}>
            <img src={asset(product.images[activeImage])} alt={product.name} />
          </div>
        </div>

        <div className={styles.info}>
          {'colorsAvailable' in product && (
            <>
              <p className={styles.label}>Available colors</p>

              <div className={styles.colors}>
                {product.colorsAvailable.map(color => (
                  <button
                    key={color}
                    className={styles.color}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </>
          )}

          {'capacityAvailable' in product && (
            <>
              <p className={styles.label}>Select capacity</p>

              <div className={styles.capacities}>
                {product.capacityAvailable.map(capacity => (
                  <button key={capacity}>{capacity}</button>
                ))}
              </div>
            </>
          )}

          <div className={styles.price}>
            <span className={styles.discount}>${product.priceDiscount}</span>

            <span className={styles.regular}>${product.priceRegular}</span>
          </div>

          <div className={styles.actions}>
            <button>Add to cart</button>
            <button>❤</button>
          </div>

          <ul className={styles.shortSpecs}>
            <li>
              <span>Screen</span>
              <span>{product.screen}</span>
            </li>

            <li>
              <span>Capacity</span>
              <span>{product.capacity}</span>
            </li>

            <li>
              <span>RAM</span>
              <span>{product.ram}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomContent}>
        <div className={styles.about}>
          <h2>About</h2>

          {product.description.map(section => (
            <article key={section.title}>
              <h3>{section.title}</h3>

              {section.text.map(text => (
                <p key={text}>{text}</p>
              ))}
            </article>
          ))}
        </div>

        <div className={styles.techSpecs}>
          <h2>Tech specs</h2>

          <ul>
            <li>
              <span>Screen</span>
              <span>{product.screen}</span>
            </li>

            {'resolution' in product && (
              <li>
                <span>Resolution</span>
                <span>{product.resolution}</span>
              </li>
            )}

            {'processor' in product && (
              <li>
                <span>Processor</span>
                <span>{product.processor}</span>
              </li>
            )}

            <li>
              <span>RAM</span>
              <span>{product.ram}</span>
            </li>

            {'camera' in product && (
              <li>
                <span>Camera</span>
                <span>{product.camera}</span>
              </li>
            )}

            {'zoom' in product && (
              <li>
                <span>Zoom</span>
                <span>{product.zoom}</span>
              </li>
            )}

            {'cell' in product && (
              <li>
                <span>Cell</span>
                <span>{product.cell.join(', ')}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};
