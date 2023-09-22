import React, { useState } from 'react';
import classNames from 'classnames';
import { ProductDetail } from '../../types/Product';
import 'bulma/css/bulma.min.css';
import '../AboutAdaptive/AboutAdaptive.scss';
import { ArrowUp } from '../../assets/icons/ArrowUp';

type Props = {
  title: string;
  product: ProductDetail | null;
};

export const Specs: React.FC<Props> = ({
  title,
  product,
}) => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  return (
    <>
      <div className={classNames('dropdown', {
        'is-active': isDropdownActive,
      })}
      >
        <div className="dropdown-trigger">
          <button
            type="button"
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu2"
            onClick={() => setIsDropdownActive(!isDropdownActive)}
          >
            <span>{title}</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true">
                <ArrowUp />
              </i>
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu2" role="menu">
          <div className="dropdown-content">
            {product?.description.map(item => (
              <div key={item.title}>
                <div className="dropdown-item">
                  <div className="details__information__specs__info">
                    <div className="details__information__specs__item">
                      <h2
                        className="details__information__specs__key"
                      >
                        Screen
                      </h2>
                      <h3
                        className="details__information__specs__value"
                      >
                        {product?.screen}
                      </h3>
                    </div>

                    <div className="details__information__specs__item">
                      <h2
                        className="details__information__specs__key"
                      >
                        Resolution
                      </h2>
                      <h3
                        className="details__information__specs__value"
                      >
                        {product?.resolution}
                      </h3>
                    </div>

                    <div className="details__information__specs__item">
                      <h2
                        className="details__information__specs__key"
                      >
                        Processor
                      </h2>
                      <h3
                        className="details__information__specs__value"
                      >
                        {product?.processor}
                      </h3>
                    </div>

                    <div className="details__information__specs__item">
                      <h2
                        className="details__information__specs__key"
                      >
                        RAM
                      </h2>
                      <h3
                        className="details__information__specs__value"
                      >
                        {product?.ram}
                      </h3>
                    </div>

                    <div className="details__information__specs__item">
                      <h2
                        className="details__information__specs__key"
                      >
                        Built in memory
                      </h2>
                      <h3
                        className="details__information__specs__value"
                      >
                        {product?.capacity}
                      </h3>
                    </div>

                    <div className="details__information__specs__item">
                      <h2
                        className="details__information__specs__key"
                      >
                        Camera
                      </h2>
                      <h3
                        className="details__information__specs__value"
                      >
                        {product?.camera}
                      </h3>
                    </div>

                    <div className="details__information__specs__item">
                      <h2
                        className="details__information__specs__key"
                      >
                        Zoom
                      </h2>
                      <h3
                        className="details__information__specs__value"
                      >
                        {product?.zoom}
                      </h3>
                    </div>

                    <div className="details__information__specs__item">
                      <h2
                        className="details__information__specs__key"
                      >
                        Cell
                      </h2>
                      <h3
                        className="details__information__specs__value"
                      >
                        {product?.cell.join(' ')}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  );
};
