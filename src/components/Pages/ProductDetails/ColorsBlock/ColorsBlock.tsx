import React, { useContext } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { CatalogContext } from '../../../../context/CatalogContext';
import { ProductDetails } from '../../../../types';
import * as Service from '../../../../utils/service';

type Props = {
  selectedProduct: ProductDetails;
};

export const ColorsBlock: React.FC<Props> = ({ selectedProduct }) => {
  const { allProducts } = useContext(CatalogContext);
  const { id, colorsAvailable, category, namespaceId, capacity, color } =
    selectedProduct;

  return (
    <div className="paramsBlock__colorsBlock">
      <div className="paramsBlock__colorsBlock--titleBlock">
        <p className="small-text paramsBlock__title">Available colors</p>

        {id && (
          <p className="small-text paramsBlock__id">
            {`ID: ${Service.getIdForProduct(id, allProducts)}`}
          </p>
        )}
      </div>

      <div className="paramsBlock__colorsBlock--colors">
        {colorsAvailable
          ?.sort((a, b) => b.localeCompare(a))
          .map(curColor => (
            <Link
              key={curColor}
              to={`${Service.getNewProductLink(category, namespaceId, capacity, curColor)}`}
              className={classNames(
                'paramsBlock__colorsBlock--colors-container',
                {
                  'paramsBlock__colorsBlock--colors-container-active':
                    color === curColor,
                },
              )}
            >
              <div
                className="paramsBlock__colorsBlock--colors-color"
                style={{
                  background: Service.getNormalColor(curColor),
                }}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};
