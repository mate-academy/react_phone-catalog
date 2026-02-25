import React, { ChangeEvent } from "react";
import styles from "./Fiter.module.scss";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import { Category } from "../../types/types";

interface Props {
  setPerPage: (v: string) => void;
  perPage: number;
  setSort: (v: string) => void;
  count: number;
}

export const Filter: React.FC<Props> = ({
  setPerPage,
  perPage,
  setSort,
  count,
}) => {
  const { pathname } = useLocation();
  const routeName = pathname.slice(1);

  const title =
    (routeName === Category.Phones && "Mobile phones") ||
    (routeName === Category.Tablets && "Tablets") ||
    (routeName === Category.Accessories && "Accessories");

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setPerPage(e.target.value);
  };

  const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  return (
    <section className="filter">
      <div className={styles.content}>
        <div className={styles.head}>
          <h1 className={classNames(styles.title, "text-h1")}>{title}</h1>
          <p
            className={classNames(styles.text, "text-small")}
          >{`${count} models`}</p>
        </div>
        <div className={styles.wrapper}>
          <label className={classNames(styles.label, "text-small")}>
            Sort by
            <select
              name="sort"
              onChange={handleSort}
              className={styles.dropdown}
            >
              <option value="newest" className={styles.option}>
                Newest
              </option>
              <option value="alphabet" className={styles.option}>
                Alphabetically
              </option>
              <option value="cheapest" className={styles.option}>
                Cheapest
              </option>
            </select>
          </label>

          <label className={`${styles.label} text-small`}>
            Items on page
            <select
              onChange={handleSelect}
              name="items"
              className={classNames(styles.dropdown, styles.small)}
              value={perPage > 16 || perPage < 4 ? "all" : perPage}
            >
              <option value="4" className={styles.option}>
                4
              </option>
              <option value="8" className={styles.option}>
                8
              </option>
              <option value="16" className={styles.option}>
                16
              </option>
              <option value="all" className={styles.option}>
                all
              </option>
            </select>
          </label>
        </div>
      </div>
    </section>
  );
};
