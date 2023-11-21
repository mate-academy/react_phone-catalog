import { ChangeEvent, useState } from 'react';
import './Option.scss';
import classNames from 'classnames';

export const Option = () => {
  const [isCapacity, setIsCapacity] = useState('64');
  const [isColor, setIsColor] = useState('red');

  const handleCapacityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsCapacity(e.target.value);
  };

  const handleColorCahange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsColor(e.target.value);
  };

  return (
    <div className="options">
      <div className="options__container">
        <p className="text text--small text--gray">
          Available colors
        </p>
        <div className="options__select-container">
          <label className={classNames(
            'options__color-label',
            { 'options__color-label--selected': isColor === 'red' },
          )}
          >
            <input
              type="radio"
              name="color"
              value="red"
              title="red"
              className="options__input"
              onChange={handleColorCahange}
            />
            <span className="options__color options__color--red" />
          </label>

          <label
            className={classNames(
              'options__color-label',
              { 'options__color-label--selected': isColor === 'green' },
            )}
          >
            <input
              type="radio"
              name="color"
              value="green"
              title="green"
              className="options__input"
              onChange={handleColorCahange}
            />
            <span className="options__color options__color--green" />
          </label>

          <label
            className={classNames(
              'options__color-label',
              { 'options__color-label--selected': isColor === 'sec' },
            )}
          >
            <input
              type="radio"
              name="color"
              value="sec"
              title="sec"
              className="options__input"
              onChange={handleColorCahange}
            />
            <span className="options__color options__color--sec" />
          </label>
        </div>
      </div>

      <div className="options__container options__container--capacity">
        <p className="text text--small text--gray">
          Select capacity
        </p>
        <div className="options__select-container">
          <label
            className={classNames(
              'options__capacity',
              'text',
              { 'options__capacity--selected': isCapacity === '64' },
            )}
          >
            <input
              className="options__input"
              type="radio"
              name="capacity"
              value="64"
              onChange={handleCapacityChange}
            />
            64 gb
          </label>

          <label
            className={classNames(
              'options__capacity',
              'text',
              { 'options__capacity--selected': isCapacity === '256' },
            )}
          >
            <input
              className="options__input"
              type="radio"
              name="capacity"
              value="256"
              onChange={handleCapacityChange}
            />
            256 gb
          </label>

          <label
            className={classNames(
              'options__capacity',
              'text',
              { 'options__capacity--selected': isCapacity === '512' },
            )}
          >
            <input
              className="options__input"
              type="radio"
              name="capacity"
              value="512"
              onChange={handleCapacityChange}
            />
            512 gb
          </label>
        </div>
      </div>
    </div>
  );
};
