import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { debounce } from "../../utils";
import styles from "./HeaderSearch.module.scss";
import { AppSettingsContext } from "../../providers/AppSettingsProvider";

const searchablePaths = ["/phones", "/tablets", "/accessories", "/favorites"];

export const HeaderSearch: React.FC = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { labels } = useContext(AppSettingsContext);
  const query = searchParams.get("query") || "";
  const [value, setValue] = useState(query);

  const isSearchVisible = searchablePaths.includes(pathname);

  useEffect(() => {
    setValue(query);
  }, [query, pathname]);

  const debouncedSearch = useMemo(
    () =>
      debounce((nextValue: string) => {
        const trimmed = nextValue.trim();

        setSearchParams(prev => {
          if (trimmed.length > 0) {
            prev.set("query", trimmed);
          } else {
            prev.delete("query");
          }

          prev.delete("page");

          return prev;
        });
      }, 300),
    [setSearchParams],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;

    setValue(nextValue);
    debouncedSearch(nextValue);
  };

  if (!isSearchVisible) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={labels.searchPlaceholder}
        className={styles.input}
      />
    </div>
  );
};
