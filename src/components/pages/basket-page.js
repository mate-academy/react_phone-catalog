import React from 'react';
import PropTypes from 'prop-types';

import SplittedText from '../splitted-text';
import Basket from '../basket';

const BasketPage = ({ basketItems, ...props }) => (
  <div className="basket d-flex flex-column
    align-items-center justify-content-center indent-mb-m"
  >
    <h4 className="title title_subpages indent-mb-m">
      <SplittedText text="Your basket:" />
    </h4>
    {
      basketItems.length > 0
        ? (
          <Basket
            basketItems={basketItems}
            {...props}
          />
        )
        : <span className="title title_h5">empty</span>
    }
  </div>
);

BasketPage.propTypes = {
  basketItems: PropTypes.instanceOf(Array).isRequired,
};

export default BasketPage;
