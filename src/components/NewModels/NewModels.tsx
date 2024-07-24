import styles from './NewModels.module.scss';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Card } from '../Card';

export const NewModels = () => {
  return (
    <section className="newModels">
      <div className={classNames(styles.newModels__topBar)}>
        <h3 className={classNames(styles.newModels__title)}>
          Brand new models
        </h3>
        <div className={classNames(styles.newModels__sliderButtons)}>
          <button
            className={classNames(styles.newModels__btn, {
              [styles['newModels__btn--disabled']]: true,
            })}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            className={classNames(styles.newModels__btn, {
              [styles['newModels__btn--disabled']]: false,
            })}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>

      <div className="newModels__cards">
        <Card />
      </div>
    </section>
  );
};
