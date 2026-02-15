import classNames from 'classnames';
import React from 'react';

type Props = {
  title: string;
  hasButtons: boolean;
  handleMoveLeft?: () => void;
  handleMoveRight?: () => void;
  isFirstCard?: boolean;
  isLastCard?: boolean;
};

export const SectionHeader: React.FC<Props> = ({
  title,
  hasButtons,
  handleMoveLeft,
  handleMoveRight,
  isFirstCard,
  isLastCard,
}) => {
  return (
    <div className="section">
      <h2 className="section-title">{title}</h2>

      {hasButtons && (
        <div className="flex gap-[16px]">
          <button
            className={classNames('section-buttons', {
              'border-elements': isFirstCard,
            })}
            onClick={handleMoveLeft}
            disabled={isFirstCard}
          >
            {isFirstCard ? (
              <img
                src="./img/icons/Arrow_Left.svg"
                alt="ArrowLeft"
                className="image"
              />
            ) : (
              <img
                src="./img/icons/Arrow_Left_Black.svg"
                alt="ArrowLeft"
                className="image"
              />
            )}
          </button>

          <button
            className={classNames('section-buttons', {
              'border-elements': isLastCard,
            })}
            onClick={handleMoveRight}
            disabled={isLastCard}
          >
            {isLastCard ? (
              <img
                src="./img/icons/Arrow_Right.svg"
                alt="ArrowRight"
                className="image"
              />
            ) : (
              <img
                src="./img/icons/Arrow_Right_Black.svg"
                alt="ArrowRightt"
                className="image"
              />
            )}
          </button>
        </div>
      )}
    </div>
  );
};
