/* eslint-disable react/no-unknown-property */
import styles from './BannerItem.module.scss';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import { PhoneModel } from '../../PhoneModel';
import { motion, AnimatePresence } from 'framer-motion';
import { BANNERS } from '../../../constants/constJS';
import { useCheckoutState } from '../../../hooks/useCheckoutState';
import { CheckoutProcess } from '../../Checkout';

interface Props {
  activeIndex: number;
}

export const BannerItem: React.FC<Props> = ({ activeIndex }) => {
  const { isCheckoutOpen, openCheckout, closeCheckout } = useCheckoutState();

  return (
    <section className={styles.container}>
      <div className={styles.info}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className={styles.textContainer}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <h1 className={styles.title}>{BANNERS[activeIndex].title}</h1>
            <p className={styles.description}>
              {BANNERS[activeIndex].description}
            </p>
            <button className={styles.button} onClick={openCheckout}>
              Preorder Now
            </button>
          </motion.div>
        </AnimatePresence>

        <div className={styles.canvasContainer}>
          <Canvas>
            <Suspense fallback={null}>
              <ambientLight intensity={0.8} color={'#ffffff'} />
              <spotLight
                position={[65, 80, 22]}
                intensity={1.1}
                color={'#aaaaff'}
              />
              <directionalLight
                position={[65, -80, 22]}
                intensity={0.5}
                color={'#aaaaff'}
              />
              <directionalLight
                position={[0, -5, 60]}
                intensity={0.04}
                color={'#ffffff'}
              />
              <directionalLight
                position={[-65, -40, 60]}
                intensity={0.04}
                color={'#ffffff'}
              />
              <PhoneModel activeIndex={activeIndex} />
            </Suspense>
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      </div>

      {isCheckoutOpen && <CheckoutProcess onClose={closeCheckout} />}
    </section>
  );
};
