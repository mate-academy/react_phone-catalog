import React from 'react';
import styles from './ColorSelector.module.scss';

const colors = ['black', 'green', 'yellow', 'white', 'purple', 'red'];

const ColorSelector: React.FC = () => {
  return (
    <div className={styles.selector}>
      {colors.map(color => (
        <button
          key={color}
          className={styles.colorButton}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export default ColorSelector;
