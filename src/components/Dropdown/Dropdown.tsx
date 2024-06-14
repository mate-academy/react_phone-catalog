import { useState } from 'react';
import { Errow } from '../UIKit/Errow';
import { useSearchParams } from 'react-router-dom';
import styles from './Dropdown.module.scss';
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

  function handleClick(newValue: string) {
    const params = new URLSearchParams(searchParams);

    params.set(name, newValue);
    setSearchParams(params);
    setDisplayed(false);
  }

  return (
    <div
      className={styles.item}
      tabIndex={0}
      onBlur={() => {
        setDisplayed(false);
      }}
    >
      <p className="text--grey text--small">{title}</p>
      <div className={styles.dropdown}>
        <span
          className={`${styles.dropdown__value} border`}
          onClick={() => {
            setDisplayed(!displayed);
          }}
        >
          {value}
        </span>
        {displayed && (
          <ul className={`${styles.dropdown__container} border`}>
            {options.map(item => (
              <li
                className={`${styles.dropdown__item} text--grey`}
                key={item}
                onClick={() => {
                  handleClick(item);
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
        <div
          className={styles.dropdown__icon}
          onClick={() => {
            setDisplayed(!displayed);
          }}
          style={{ transform: `${displayed ? 'rotate(270deg) ' : ''}` }}
        >
          <Errow />
        </div>
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
