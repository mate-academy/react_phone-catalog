import { useSaveFilterInParams } from '../../../../utils/saveFilterInParams';
import { useMoveButtons } from '../../../../utils/useMoveButtons';
import { usePagedList } from '../../../../utils/usePagedList';
import { Product } from '../../../../types/Product';
import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import './PhonesBottom.scss';

interface Props {
  actualButton: number;
  initialList: Product[];
  itemsPerPage: number;
}

export const PhonesBottom: React.FC<Props> = ({
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
    <div className="phones-bottom">
      <nav>
        <ul className="phones-bottom__nav">
          <li
            className="phones-bottom__nav-item button-left"
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
            <ul ref={navigationContainer} className="phones-bottom__navigation">
              {howButtonsRender.map(buttonNumber => {
                return (
                  <li
                    key={buttonNumber}
                    data-actual-button={buttonNumber}
                    className={classNames('phones-bottom__navigation-button', {
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
            className="phones-bottom__nav-item button-right"
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
