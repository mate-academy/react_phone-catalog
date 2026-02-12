import * as motion from 'motion/react-client';
import './HeroBanner.scss';

const HeroBanner = () => {
  return (
    <motion.div
      className="hero-banner"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <motion.div
        className="hero-banner-content"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
      >
        <motion.h1
          className="section__hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Welcome to Nice Gadgets store!
        </motion.h1>

        <motion.h2
          className="hero-banner-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Discover the Latest Tech Trends!
        </motion.h2>

        <motion.p
          className="hero-banner-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          Upgrade your gadgets with our newest arrivals.
        </motion.p>
      </motion.div>

      <motion.div
        className="hero-img"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
      >
        <motion.img
          src="img/slider-phone.png"
          alt="Hero Banner"
          className="hero-banner-image"
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ delay: 1.4, duration: 0.6, ease: 'easeOut' }}
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroBanner;
