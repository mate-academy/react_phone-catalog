import React, { useContext } from 'react';
import './colorShoseStyle.scss';
import classNames from 'classnames';
import { Details } from 'src/types/Details';
import { DispatchContext } from 'src/store';
import { getSelectedItem } from 'src/components/ui/utils/api/api';
import { Link } from 'react-router-dom';
import { removeSpaces } from 'src/components/ui/utils/removeSpaces';
import { ActionTypes } from 'src/types/ActionTypes';

interface Props {
  selectedProduct: Details;
}

const ColorsChose: React.FC<Props> = ({ selectedProduct }) => {
  const dispatch = useContext(DispatchContext);

  const { colorsAvailable, color, category, capacity, namespaceId } =
    selectedProduct;

  const handleOnColorChange = (itemColor: string, e: React.MouseEvent) => {
    dispatch({ type: ActionTypes.SetIsLoading, payload: { value: true } });

    e.stopPropagation();
    e.preventDefault();
    const idForDispatch =
      `${namespaceId}-${capacity}-${itemColor}`.toLowerCase();

    getSelectedItem(category, idForDispatch).then(payload => {
      if (payload) {
        dispatch({ type: ActionTypes.AddSelectedProduct, payload });
      }
      dispatch({ type: ActionTypes.SetIsLoading, payload: { value: false } });
    });
  };

  return (
    <div className="details__colors">
      {colorsAvailable.map(elem => {
        const correctedItem = removeSpaces(elem);

        return (
          <Link
            className={classNames('details__colors--item', {
              'chosen-color': elem === color,
            })}
            to={`/${namespaceId}-${capacity.toLowerCase()}-${correctedItem}`}
            key={elem}
            onClick={e => handleOnColorChange(correctedItem, e)}
          >
            <div
              className="details__colors--inner"
              style={{ backgroundColor: elem }}
            ></div>
          </Link>
        );
      })}
    </div>
  );
};

export default ColorsChose;
