/* eslint-disable react/jsx-key */
import styles from './TechSpecs.module.scss';
import { ProductInfo } from '../../../../../type/ProductInfo';
import classNames from 'classnames';
import { GlobalContext } from '../../../../shared/GlobalContext/GlobalContext';
import { useContext } from 'react';

type Props = {
  currentCard: ProductInfo | null;
};

export const TechSpecs: React.FC<Props> = ({ currentCard }) => {
  const { isSunSelected } = useContext(GlobalContext);

  const normalizedCard = [
    { title: 'Screen', specs: currentCard?.screen },
    { title: 'Resolution', specs: currentCard?.resolution },
    { title: 'Processor', specs: currentCard?.processor },
    {
      title: 'RAM',
      specs: `${currentCard?.ram.slice(0, -2)} ${currentCard?.ram.slice(-2)}`,
    },
    {
      title: 'Built in memory',
      specs: `${currentCard?.capacity.slice(0, -2)} ${currentCard?.capacity.slice(-2)}`,
    },
    { title: 'Camera', specs: currentCard?.camera },
    { title: 'Zoom', specs: currentCard?.zoom },
    { title: 'Camera', specs: currentCard?.camera },
    { title: 'Cell', specs: currentCard?.cell.map(c => `${c} `) },
  ];

  return (
    <div className={styles.specs}>
      <h2
        className={classNames(styles.specs__title, {
          [styles.specs__title_dark]: !isSunSelected,
        })}
      >
        Tech specs
      </h2>

      {normalizedCard.map(spec => (
        <>
          <div className={styles.specs__info}>
            <span
              className={classNames(styles.specs__info_title, {
                [styles.specs__info_title_dark]: !isSunSelected,
              })}
            >
              {spec.title}
            </span>
            <span
              className={classNames(styles.specs__info_spec, {
                [styles.specs__info_spec_dark]: !isSunSelected,
              })}
            >
              {spec.specs}
            </span>
          </div>
        </>
      ))}
    </div>
  );
};
