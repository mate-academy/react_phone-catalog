import { useSaveFilterInParams } from '../../../../utils/saveFilterInParams';
import { useMoveButtons } from '../../../../utils/useMoveButtons';
import { usePagedList } from '../../../../utils/usePagedList';
import { Product } from '../../../../types/Product';
import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import './PagesBottom.scss';

interface Props {
  actualButton: number;
  initialList: Product[];
  itemsPerPage: number;
}

export const PagesBottom: React.FC<Props> = ({
  actualButton,
  initialList,
  itemsPerPage,
}) => {
  const navigationContainer = useRef<HTMLUListElement>(null);
  const { saveFilterInParams } = useSaveFilterInParams();
  const { moveButtons } = useMoveButtons();

  const { ditermineDirection, howButtonsRender } = usePagedList(
    initialList,
    itemsPerPage,
  );

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [actualButton]);

  if (!initialList) {
    return null;
  }



  return (
    <div className="Pages-bottom">
      <nav>
        <ul className="Pages-bottom__nav">
          <li
            className="Pages-bottom__nav-item button-left"
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

          <li>
            <ul ref={navigationContainer} className="Pages-bottom__navigation">
              {howButtonsRender.map(buttonNumber => {
                return (
                  <li
                    key={buttonNumber}
                    data-actual-button={buttonNumber}
                    className={classNames('Pages-bottom__navigation-button', {
                      'active-list': buttonNumber === actualButton,
                    })}
                    onClick={() => {
                      saveFilterInParams('actual-list', buttonNumber);
                    }}
                  >
                    {buttonNumber}
                  </li>
                );
              })}
            </ul>
          </li>

          <li
            className="Pages-bottom__nav-item button-right"
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
