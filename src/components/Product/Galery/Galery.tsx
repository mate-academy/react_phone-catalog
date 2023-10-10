import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import './Galery.scss';

import { IMAGE_URL } from '../../../helpers/IMAGE_URL';

type Props = {
  photos: string[],
  mainPhoto: string,
  photoClick: (photo: string) => void,
};

export const Galery: React.FC<Props> = ({
  photos,
  mainPhoto,
  photoClick,
}) => (
  <div className="galery">
    <ul className="galery__list">
      {photos.map(currentImage => (
        <button
          type="button"
          key={currentImage}
          onClick={() => photoClick(currentImage)}
          className={classNames('galery__photo', {
            'galery__photo-active': mainPhoto === currentImage,
          })}
        >
          <div className="galery__photo-container">
            <img
              className="galery__photo--item"
              src={`${IMAGE_URL}${currentImage}`}
              alt="product"
            />
          </div>
        </button>
      ))}
    </ul>

    <AnimatePresence exitBeforeEnter>
      <motion.div
        className="galery__main"
        key={mainPhoto}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <img
          className="galery__main--image"
          alt="the bigger one"
          src={`${IMAGE_URL}${mainPhoto}`}
        />
      </motion.div>
    </AnimatePresence>
  </div>
);
