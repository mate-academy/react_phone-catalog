import classNames from 'classnames';
import { useState } from 'react';

export const Colors = () => {
  const [selectedColor, setSelectedColor] = useState(0);

  return (
    <div className="options-wrapper">
      {[1, 2, 3, 4].map(el => (
        <button
          type="button"
          className={classNames(
            'options-wrapper__color--outer',
            {
              'options-wrapper__color--selected':
                selectedColor === el,
            },
          )}
          onClick={() => setSelectedColor(el)}
        >
          <div className={`options-wrapper__color--${el}`} />
        </button>
      ))}
    </div>
  );
};
