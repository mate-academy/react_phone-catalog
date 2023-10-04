import React, { useState } from 'react';
import classNames from 'classnames';
import { ProductDetail } from '../../types/Product';
import 'bulma/css/bulma.min.css';
import './AboutAdaptive.scss';
import { ArrowUp } from '../../assets/icons/ArrowUp';

type Props = {
  title: string;
  product: ProductDetail | null;
};

export const AboutAdaptive: React.FC<Props> = ({
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
                  <p>
                    <strong>
                      {item.title}
                      <br />
                    </strong>
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  );
};
