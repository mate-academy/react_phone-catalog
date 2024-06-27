import { useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Dropdown.module.scss';
import { ProductContext } from '../../../../store/ProductContext';
import classNames from 'classnames';
export enum SortBy {
  newest = 'Newest',
  name = 'Alphabetically',
  cheapest = 'Cheapest',
}

const itemsPerPageOptions = ['8', '16', '24', 'All'];

type Props = {
  options: string[];
  title: string;
  name: string;
};

const DropdownItem: React.FC<Props> = ({ options, title, name }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const startValue = name === 'sortBy' ? SortBy.newest : 'All';
  const value = searchParams.get(name) || startValue;
  const [displayed, setDisplayed] = useState(false);
  const { darkTheme } = useContext(ProductContext);

  function handleClick(newValue: string) {
    const params = new URLSearchParams(searchParams);

    params.set(name, newValue);
    params.delete('page');
    setSearchParams(params);
    setDisplayed(false);
  }

  return (
    <div
      className={styles.item}
      tabIndex={0}
      onClick={() => setDisplayed(prev => !prev)}
      onBlur={() => {
        setDisplayed(false);
      }}
    >
      <p className="text--grey text--small">{title}</p>
      <div className={styles.dropdown}>
        <div
          className={classNames(`${styles.dropdown__value} border`, {
            [styles.dropdown__value__active]: displayed,
            [styles.dropdown__value__darkTheme]: darkTheme,
            [styles.dropdown__value__darkTheme__active]: darkTheme && displayed,
          })}
        >
          <p>{value}</p>

          <div
            className={classNames(`icon icon--arrow ${styles.dropdown__icon}`, {
              [styles.dropdown__icon__darkTheme]: darkTheme,
            })}
            style={{
              transform: displayed ? 'rotate(270deg)' : '',
            }}
          ></div>
        </div>
        {displayed && (
          <ul
            className={`${styles.dropdown__container} border`}
            onMouseLeave={() => {
              setDisplayed(false);
            }}
          >
            {options.map(item => (
              <li
                className={classNames(`${styles.dropdown__item} text--grey`, {
                  [styles.dropdown__item__darkTheme]: darkTheme,
                })}
                key={item}
                onClick={() => handleClick(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export const Dropdown = () => (
  <div className={styles.container}>
    <DropdownItem
      options={Object.values(SortBy)}
      title="Sort by"
      name="sortBy"
    />
    <DropdownItem
      options={itemsPerPageOptions}
      title="Items per page"
      name="itemsPerPage"
    />
  </div>
);
