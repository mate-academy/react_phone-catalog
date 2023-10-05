import { useState } from 'react';
import './BasketButton.scss';

export const BasketButton = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggleclickk = () => {
    setIsChecked(!isChecked);
  };

  return (
    <button
      type="button"
      onClick={handleToggleclickk}
      className={`basket-button ${isChecked ? 'is-activeButton' : ''}`}
    >
      {isChecked ? 'Checked' : 'Checkout'}
    </button>
  );
};
