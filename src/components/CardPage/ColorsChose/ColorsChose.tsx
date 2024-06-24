import React from 'react';
import './colorShoseStyle.scss';
import classNames from 'classnames';

interface Props {
  colors: string[];
  handleSetColor: (variable: string) => void;
  chosenColor: string;
}

const ColorsChose: React.FC<Props> = ({
  colors,
  handleSetColor,
  chosenColor,
}) => {
  const handleClick = (elem: string) => {
    handleSetColor(elem);
  };

  return (
    <div className="details__colors">
      {colors.map(elem => (
        <button
          className={classNames('details__colors--item', {
            'chosen-color': elem === chosenColor,
          })}
          key={elem}
          onClick={() => handleClick(elem)}
        >
          <div
            className="details__colors--inner"
            style={{ backgroundColor: elem }}
          ></div>
        </button>
      ))}
    </div>
  );
};

export default ColorsChose;
