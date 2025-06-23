import { useSaveFilterInParams } from '../../../../utils/saveFilterInParams';
import { useMoveButtons } from '../../../../utils/useMoveButtons';
import { usePagedList } from '../../../../utils/usePagedList';
import { Product } from '../../../../types/Product';
import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import './AccessoriesBottom.scss';

interface Props {
  actualButton: number;
  initialList: Product[];
  itemsPerPage: number;
}

export const AccessoriesBottom: React.FC<Props> = ({
  actualButton,
  initialList,
  itemsPerPage,
}) => {
  if (!initialList) {
    return null;
  }

  const navigationContainer = useRef<HTMLUListElement>(null);
  const { saveFilterInParams } = useSaveFilterInParams();
  const { moveButtons } = useMoveButtons();

  const { ditermineDirection, howButtonsRender } = usePagedList(
    initialList,
    itemsPerPage,
  );

  useEffect(() => {
    if (!navigationContainer.current) {
      return;
    }

    setTimeout(() => {
      const container = navigationContainer.current!;
      const activeButton = container.querySelector(
        '.active-list',
      ) as HTMLElement | null;

      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest', // вертикальне вирівнювання
          inline: 'nearest',
        });
      }
    }, 50);
  }, [actualButton]);

  return (
    <div className="accessories-bottom">
      <nav>
        <ul className="accessories-bottom__nav">
          <li
            className="accessories-bottom__nav-item button-left"
            onClick={() => {
              saveFilterInParams(
                'actual-list',
                ditermineDirection('left', actualButton),
              );
              moveButtons(
                'left',
                ditermineDirection,
                actualButton,
                navigationContainer,
              );
            }}
          ></li>

          <ul
            ref={navigationContainer}
            className="accessories-bottom__navigation"
          >
            {howButtonsRender.map(buttonNumber => {
              return (
                <li
                  key={buttonNumber}
                  data-actual-button={buttonNumber}
                  className={classNames(
                    'accessories-bottom__navigation-button',
                    {
                      'active-list': buttonNumber === actualButton,
                    },
                  )}
                  onClick={() => {
                    saveFilterInParams('actual-list', buttonNumber);
                  }}
                >
                  {buttonNumber}
                </li>
              );
            })}
          </ul>

          <li
            className="accessories-bottom__nav-item button-right"
            onClick={() => {
              saveFilterInParams(
                'actual-list',
                ditermineDirection('right', actualButton),
              );
              moveButtons(
                'right',
                ditermineDirection,
                actualButton,
                navigationContainer,
              );
            }}
          ></li>
        </ul>
      </nav>
    </div>
  );
};
