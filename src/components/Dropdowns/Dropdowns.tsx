/* eslint-disable max-len */
import { useState } from 'react';
import styles from './Dropdown.module.scss';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type Props = {
  sortBy: string;
  perPage: number;
};

const Dropdowns: React.FC<Props> = ({ sortBy, perPage }) => {
  const [isDropdownSortActive, setIsDropdownSortActive] = useState(false);
  const [isDropdownPageActive, setIsDropdownPageActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  const handleSortChange = (el: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', el);
    setSearchParams(params);
  };

  const handlePerPageChange = (el: number | string) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', `${1}`);
    if (el === 'all') {
      params.set('perPage', 'all');
    } else {
      params.set('perPage', `${el}`);
    }

    params.delete('page');
    setSearchParams(params);
  };

  return (
    <div className={styles.dropdowns}>
      <div className="sortDrop">
        <p className={styles.title}>{t('sortBy')}</p>
        <div
          className={classNames('dropdown', {
            'is-active': isDropdownSortActive,
          })}
        >
          <div className={`dropdown-trigger`}>
            <button
              type="button"
              className={`button ${styles.btnSort}`}
              aria-haspopup="true"
              aria-controls="dropdown-menu"
              onClick={() => setIsDropdownSortActive(!isDropdownSortActive)}
              onBlur={() => setIsDropdownSortActive(false)}
            >
              <span className={styles.sort}>{sortBy}</span>

              <svg
                width="6"
                height="10"
                viewBox="0 0 6 10"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: `rotate(${isDropdownSortActive ? 270 : 90}deg)`,
                  transformOrigin: 'center center',
                }}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d=" M0.528758 0.528606 C0.789108 0.268256 1.21122 0.268256 1.47157 0.528606 L5.47157 4.52861 C5.73192 4.78896 5.73192 5.21107 5.47157 5.47141 L1.47157 9.47141 C1.21122 9.73176 0.789108 9.73176 0.528758 9.47141 C0.268409 9.21107 0.268409 8.78896 0.528758 8.52861 L4.05735 5.00001 L0.528758 1.47141 C0.268409 1.21107 0.268409 0.788955 0.528758 0.528606Z"
                ></path>
              </svg>
            </button>
          </div>

          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              {[t('newest'), t('alph'), t('cheap')].map(el => (
                <span
                  key={el}
                  className={classNames('dropdown-item', {
                    'is-active': sortBy === el,
                  })}
                  onMouseDown={() => handleSortChange(el)}
                >
                  {el}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="pageDrop">
        <p className={styles.title}>{t('itemsPer')}</p>
        <div
          className={classNames('dropdown', {
            'is-active': isDropdownPageActive,
          })}
        >
          <div className={`dropdown-trigger`}>
            <button
              type="button"
              className={`button ${styles.btnPage}`}
              aria-haspopup="true"
              aria-controls="dropdown-menu"
              onClick={() => setIsDropdownPageActive(!isDropdownPageActive)}
              onBlur={() => setIsDropdownPageActive(false)}
            >
              <button>{perPage > 32 ? 'all' : perPage}</button>

              <svg
                width="6"
                height="10"
                viewBox="0 0 6 10"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: `rotate(${isDropdownPageActive ? 270 : 90}deg)`,
                  transformOrigin: 'center center',
                }}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d=" M0.528758 0.528606 C0.789108 0.268256 1.21122 0.268256 1.47157 0.528606 L5.47157 4.52861 C5.73192 4.78896 5.73192 5.21107 5.47157 5.47141 L1.47157 9.47141 C1.21122 9.73176 0.789108 9.73176 0.528758 9.47141 C0.268409 9.21107 0.268409 8.78896 0.528758 8.52861 L4.05735 5.00001 L0.528758 1.47141 C0.268409 1.21107 0.268409 0.788955 0.528758 0.528606Z"
                ></path>
              </svg>
            </button>
          </div>

          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              {[8, 16, 32, 'all'].map(el => (
                <span
                  key={el}
                  className={classNames('dropdown-item', {
                    'is-active': perPage === el,
                  })}
                  onMouseDown={() => handlePerPageChange(el)}
                >
                  {el}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdowns;
