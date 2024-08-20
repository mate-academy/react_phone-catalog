import classNames from 'classnames';
import React, { useContext } from 'react';
import './CapacitySectionStyle.scss';
import { Details } from 'src/types/Details';
import { ActionTypes } from 'src/types/ActionTypes';
import { DispatchContext } from 'src/store';
import { getSelectedItem } from 'src/components/ui/utils/api/api';
interface Props {
  selectedProduct: Details;
}

const CapacitySection: React.FC<Props> = ({ selectedProduct }) => {
  const dispatch = useContext(DispatchContext);
  const { namespaceId, color, category, capacityAvailable, capacity } =
    selectedProduct;

  const handleClick = (elem: string) => {
    const idForDispatch = `${namespaceId}-${elem}-${color}`.toLowerCase();
    dispatch({ type: ActionTypes.SetIsLoading, payload: { value: true } });

    getSelectedItem(category, idForDispatch).then(payload => {
      if (payload) {
        dispatch({ type: ActionTypes.AddSelectedProduct, payload });
      }
      dispatch({ type: ActionTypes.SetIsLoading, payload: { value: false } });
    });
  };

  return (
    <>
      <div className="details__capacity--title">Select capacity</div>
      <div className="details__capacity--items">
        {capacityAvailable.map(elem => (
          <button
            className={classNames('details__capacity--item', {
              'selected-capacity': elem === capacity,
            })}
            key={elem}
            onClick={() => handleClick(elem)}
          >
            {elem}
          </button>
        ))}
      </div>
    </>
  );
};

export default CapacitySection;
