import React, { useEffect, useState } from 'react';
import classes from './Imgs.module.scss';
import classNames from 'classnames';

type Props = {
  name: string;
  imgs: string[];
};

export const Imgs: React.FC<Props> = ({ name, imgs }) => {
  const [mainImg, setMainImg] = useState(imgs[0]);

  useEffect(() => {
    setMainImg(imgs[0]);
  }, [imgs]);

  return (
    <section className={classes.Imgs}>
      <div className={classes.Imgs__main}>
        <div className={classes.Imgs__content}>
          <img src={mainImg} alt={name} />
        </div>
      </div>

      <div className={classes.Imgs__container}>
        {imgs.map(item => (
          <button
            key={item}
            type="button"
            className={classNames(classes.Imgs__item, {
              [classes['Imgs__item--active']]: mainImg === item,
            })}
            onClick={() => setMainImg(item)}
          >
            <div className={classes.Imgs__wrapper}>
              <img src={item} alt={name} />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
