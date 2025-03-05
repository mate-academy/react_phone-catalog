import React, { useContext } from 'react';
import styles from './Dots.module.scss';
import { MainContext } from '../../../../../../context/MainContext';
import SCSSvariables from '../../../../../../utils/Variables.module.scss';
import classNames from 'classnames';

export const Dots: React.FC = () => {
  const { imgs, imgIndex, setImgIndex } = useContext(MainContext);

  const onClickHandler = (index: number) => {
    setImgIndex(index);
  };

  return (
    <div className={classNames('flex-center', styles.dots)}>
      {imgs.map((_, index) => {
        return (
          <div
            key={index}
            className={styles['dot-wrapper']}
            onClick={() => onClickHandler(index)}
          >
            <div
              className={styles.dot}
              style={{
                background:
                  index === imgIndex
                    ? SCSSvariables.primaryColor
                    : SCSSvariables.elementsColor,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
