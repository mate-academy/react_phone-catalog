import styles from './ProductDetailsPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
// import accessories from '../../../public/api/accessories.json';
import { Product } from '../../types/product';
import { useEffect, useState } from 'react';
import { CardSlider } from '../../components/CardSlider';
import classNames from 'classnames';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { BackButton } from '../../components/BackButton';
import { AddToCartButton } from '../../components/AddToCartButton';
import { AddToFavButton } from '../../components/AddToFavButton';
import { fadeInDown } from '../../animations/animations';
import { motion } from 'motion/react';

export const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const { category, productId } = useParams();
  let product: Product | undefined;
  let products: Product[];

  switch (category) {
    case 'phones':
      product = phones.find(p => p.id === productId);
      products = phones;
      break;
    case 'tablets':
      product = tablets.find(p => p.id === productId);
      products = tablets;
      break;
    // case 'accessories':
    //   product = accessories.find(p => p.id === productId);
    //   products = accessories;
    //   break;
    default:
      product = phones[0];
      products = phones;
  }

  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    if (product && product.images.length > 0) {
      setSelectedImage(product.images[0]);
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return <div>Product not found</div>;
  }

  const variations = products.filter(
    p => p.namespaceId === product.namespaceId,
  );

  const handleColorClick = (newColor: string) => {
    const match = variations.find(
      p => p.color === newColor && p.capacity === product.capacity,
    );

    if (match) {
      navigate(`/${match.category}/${match.id}`);
    }
  };

  const handleCapacityClick = (newCapacity: string) => {
    const match = variations.find(
      p => p.capacity === newCapacity && p.color === product.color,
    );

    if (match) {
      navigate(`/${match.category}/${match.id}`);
    }
  };

  return (
    <div className="container">
      <motion.div {...fadeInDown}>
        <Breadcrumbs product={product} />
      </motion.div>
      <motion.div {...fadeInDown} className={styles.header}>
        <BackButton />
        <h2 className={styles.h2}>{product.name}</h2>
      </motion.div>
      <div className={styles.main}>
        <motion.ul
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
          className={styles.list}
        >
          {product.images.map((ph, index) => (
            <li
              className={classNames(
                `${styles.item} ${ph === selectedImage ? `${styles.itemActive}` : ``}`,
              )}
              key={ph}
              onClick={() => setSelectedImage(product.images[index])}
            >
              <img
                className={styles.miniphoto}
                src={product.images[index]}
                alt={ph}
              />
            </li>
          ))}
        </motion.ul>

        <motion.img
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
          className={styles.image}
          src={selectedImage}
          alt="main"
        />

        <motion.div
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
          className={styles.specification}
        >
          <div className={styles.color}>
            <p className={styles.text}>Available colors</p>
            <ul className={styles.colorlist}>
              {product.colorsAvailable.map(color => (
                <li
                  key={color}
                  onClick={() => handleColorClick(color)}
                  className={classNames(
                    product?.color === color
                      ? `${styles.coloritemActive}`
                      : `${styles.coloritem}`,
                  )}
                >
                  <div
                    className={styles.inner}
                    style={{ backgroundColor: color }}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.capacity}>
            <p className={styles.text}>Select capacity</p>
            <ul className={styles.capacitylist}>
              {product.capacityAvailable.map(cap => (
                <li
                  className={classNames(
                    product?.capacity === cap
                      ? `${styles.capacityitemActive}`
                      : `${styles.capacityitem}`,
                  )}
                  key={cap}
                  onClick={() => handleCapacityClick(cap)}
                >
                  <p>{cap}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.price}>
            <h2 className={styles.sale}>${product.priceDiscount}</h2>
            <p className={styles.discount}>${product.priceRegular}</p>
          </div>
          <div className={styles.buttons}>
            <AddToCartButton product={product} />
            <AddToFavButton product={product} />
          </div>
          <div className={styles.info}>
            <div className={styles.data}>
              <p className={styles.text}>Screen</p>
              <p className={styles.spec}>{product.screen}</p>
            </div>

            <div className={styles.data}>
              <p className={styles.text}>Resolution</p>
              <p className={styles.spec}>{product.resolution}</p>
            </div>

            <div className={styles.data}>
              <p className={styles.text}>Processor</p>
              <p className={styles.spec}>Apple A12 Bionic</p>
            </div>

            <div className={styles.data}>
              <p className={styles.text}>RAM</p>
              <p className={styles.spec}>{product.ram}</p>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
          className={styles.id}
        >
          ID:{product.id}
        </motion.p>
      </div>
      <div className={styles.description}>
        <div className={styles.about}>
          <h3 className={styles.title}>About</h3>
          {product.description.map(d => (
            <>
              <h4 className={styles.topic}>{d.title}</h4>
              <p className={styles.p}>{d.text[0]}</p>
              <p className={styles.p}>{d.text[1]}</p>
            </>
          ))}
        </div>

        <div className={styles.specs}>
          <h3 className={styles.title}>Tech specs</h3>
          <div className={styles.info}>
            <div className={styles.data}>
              <p className={styles.text}>Screen</p>
              <p className={styles.spec}>{product.screen}</p>
            </div>

            <div className={styles.data}>
              <p className={styles.text}>Resolution</p>
              <p className={styles.spec}>{product.resolution}</p>
            </div>

            <div className={styles.data}>
              <p className={styles.text}>Processor</p>
              <p className={styles.spec}>Apple A12 Bionic</p>
            </div>

            <div className={styles.data}>
              <p className={styles.text}>RAM</p>
              <p className={styles.spec}>{product.ram}</p>
            </div>

            <div className={styles.data}>
              <p className={styles.text}>Built in memory</p>
              <p className={styles.spec}>{product.capacity}</p>
            </div>

            <div className={styles.data}>
              <p className={styles.text}>Camera</p>
              <p className={styles.spec}>{product.camera}</p>
            </div>

            <div className={styles.data}>
              <p className={styles.text}>Zoom</p>
              <p className={styles.spec}>{product.zoom}</p>
            </div>

            <div className={styles.data}>
              <p className={styles.text}>Cell</p>
              <p className={styles.spec}>{product.cell.join(', ')}</p>
            </div>
          </div>
        </div>
      </div>

      <CardSlider products={products} title={`You may also like`} />
    </div>
  );
};
