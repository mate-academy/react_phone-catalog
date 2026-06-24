import React, { ChangeEvent } from "react";
import styles from "./Fiter.module.scss";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import { Category } from "../../types/types";
import { AppSettingsContext } from "../../providers/AppSettingsProvider";

interface Props {
  setPerPage: (v: string) => void;
  perPage: number;
  setSort: (v: string) => void;
  sortValue: string;
  count: number;
}

export const Filter: React.FC<Props> = ({
  setPerPage,
  perPage,
  setSort,
  sortValue,
  count,
}) => {
  const { pathname } = useLocation();
  const { labels } = React.useContext(AppSettingsContext);
  const routeName = pathname.slice(1);

  const title =
    (routeName === Category.Phones && labels.mobilePhones) ||
    (routeName === Category.Tablets && labels.tablets) ||
    (routeName === Category.Accessories && labels.accessories);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setPerPage(e.target.value);
  };

  const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  const sortOptions = [
    { value: "newest", label: labels.newest },
    { value: "alphabet", label: labels.alphabetically },
    { value: "cheapest", label: labels.cheapest },
  ];

  const itemsPerPageOptions = ["4", "8", "16", "all"];

  return (
    <section className="filter">
      <div className={styles.content}>
        <div className={styles.head}>
          <h1 className={classNames(styles.title, "text-h1")}>{title}</h1>
          <p className={classNames(styles.text, "text-small")}>
            {labels.models(count)}
          </p>
        </div>
        <div className={styles.wrapper}>
          <label className={classNames(styles.label, "text-small")}>
            {labels.sortBy}
            <select
              name="sort"
              onChange={handleSort}
              className={styles.dropdown}
              value={sortValue}
            >
              {sortOptions.map(option => (
                <option
                  key={option.value}
                  value={option.value}
                  className={styles.option}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className={`${styles.label} text-small`}>
            {labels.itemsOnPage}
            <select
              onChange={handleSelect}
              name="items"
              className={classNames(styles.dropdown, styles.small)}
              value={perPage > 16 || perPage < 4 ? "all" : perPage}
            >
              {itemsPerPageOptions.map(option => (
                <option key={option} value={option} className={styles.option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </section>
  );
};
