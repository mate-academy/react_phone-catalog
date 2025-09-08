import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import styles from "./FilterSelect.module.scss";
import classNames from "classnames";

type Props<T extends Record<string | number, string>> = {
  options: T;
  variant: "sort" | "items";
};

export const FilterSelect = <T extends Record<string | number, string>>({
  options,
  variant,
}: Props<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  
  const ref = useRef<HTMLDivElement>(null);
  const optionsKeys = Object.keys(options) as Array<string>;

  const sortBy = searchParams.get('sort') || 'age';
  const itemsPerPage = searchParams.get('perPage') || "16";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (value: string) => {
    if (variant === "items") {
      searchParams.set("perPage", value);
    } else {
      searchParams.set("sort", value);
    }

    setSearchParams(searchParams);
    setIsOpen(false);
  };

  return (
    <div
      className={styles.customSelect}
      data-open={isOpen}
      data-focuse={isOpen}
      ref={ref}
    >
      <span className={styles.customSelectLabel}>
        {variant === "sort" ? "Sort by" : "Items on page"}
      </span>
      <div
        className={classNames(styles.customSelectControl)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.customSelectValue}>
          {variant === "sort" ? options[sortBy] : itemsPerPage}
        </span>
        <span className={styles.customSelectArrow}>
          <img src="src/assets/icons/arrow-down.svg" alt="Arrow Down" />
        </span>
      </div>

      {isOpen && (
        <div className={styles.customSelectMenu}>
          {optionsKeys.map((key) => (
            <div
              key={String(key)}
              className={styles.customSelectOption}
              data-selected={
                variant === "sort"
                  ? sortBy === key
                  : itemsPerPage.toString() === options[key]
              }
              onClick={() => handleSelect(key)}
            >
              {String(options[key])}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
