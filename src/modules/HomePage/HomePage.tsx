import { motion } from 'motion/react';
import styles from './HomePage.module.scss';
import products from '../../../public/api/phones.json';
import { CardSlider } from '../../components/CardSlider';
import { NavLink } from 'react-router-dom';
import { ImageSlider } from '../../components/ImageSlider';
import { fadeInDown } from '../../animations/animations';
import {
  accessories_cat,
  first_banner,
  phone_cat,
  second_banner,
  tablet_cat,
  third_banner,
} from '../../assets/images';

const banners = [first_banner, second_banner, third_banner];

export const HomePage = () => {
  return (
    <div className="container">
      <motion.h1 {...fadeInDown}>Welcome to Nice Gadgets store!</motion.h1>

      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, x: 1000 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <ImageSlider images={banners} />
        </motion.div>

        <CardSlider products={products} title={'Brand new models'} />

        <div>
          <h2>Shop by category</h2>
          <ul className={styles.list}>
            <motion.li
              initial={{ opacity: 0, x: -200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.2 }}
              className={styles.item}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <NavLink to="/phones">
                <img
                  className={styles.photo}
                  src={phone_cat}
                  alt="category-phones"
                />
              </NavLink>
              <div>
                <h4 className={styles.title}>Mobile phones</h4>
                <p className="bodytext">95 models</p>
              </div>
            </motion.li>

            <motion.li
              initial={{ opacity: 0, y: 200 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.15 }}
              className={styles.item}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <NavLink to="/tablets">
                <img
                  className={styles.photo}
                  src={tablet_cat}
                  alt="category-tablets"
                />
              </NavLink>
              <div>
                <h4 className={styles.title}>Tablets</h4>
                <p className="bodytext">24 models</p>
              </div>
            </motion.li>

            <motion.li
              initial={{ opacity: 0, x: 200 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.2 }}
              className={styles.item}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <NavLink to="/accessories">
                <img
                  className={styles.photo}
                  src={accessories_cat}
                  alt="category-accessories"
                />
              </NavLink>
              <div>
                <h4 className={styles.title}>Accessories</h4>
                <p className="bodytext">100 models</p>
              </div>
            </motion.li>
          </ul>
        </div>

        <CardSlider products={products} title={'Hot prices'} />
      </div>
    </div>
  );
};
