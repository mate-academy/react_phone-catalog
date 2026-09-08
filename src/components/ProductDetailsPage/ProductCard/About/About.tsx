/* eslint-disable max-len */
import React from 'react';
import styles from './About.module.scss';
import { Gadget } from '../../../../types/Gadget';

type Props = {
  gadget: Gadget;
};

export const About: React.FC<Props> = ({ gadget }) => {
  return (
    <div className={styles.about}>
      <div className={styles.top}>
        <h1 className={styles.title}>About</h1>
        <hr />
      </div>

      {gadget.description.map(gadgetInfo => (
        <div key={gadgetInfo.title} className={styles.info}>
          <h2 className={styles.infotitle}>{gadgetInfo.title}</h2>
          <div className={styles.infotext}>
            {gadgetInfo.text.map(text => (
              <p key={text} className={styles.infopart}>
                {text}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
