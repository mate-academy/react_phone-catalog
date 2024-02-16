import React, { useState } from "react";
import "./SelectItems.scss";
import { useSearchParams } from "react-router-dom";
import { getSearchWith } from "../../helpers/SearchHelper";

export const SelectItems: React.FC = () => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentOption = searchParams.get("perPage") || "";
  const handleSelectOption = (selectedValue: string) => {
    const newParam = { perPage: selectedValue };

    if (searchParams.toString().includes("page")) {
      setSearchParams(
        getSearchWith(
          {
            ...newParam,
            page: "1",
          },
          searchParams,
        ),
      );
    } else {
      setSearchParams(getSearchWith(newParam, searchParams));
    }

    setIsSelectOpen(false);
  };

  const handleBlur = (event: React.FocusEvent<HTMLButtonElement, Element>) => {
    if (event.relatedTarget && event.relatedTarget?.className.includes("")) {
      return;
    }

    setIsSelectOpen(false);
  };

  const currentOptionDisplay = currentOption || "All";

  return (
    <div className="selectItems">
      <label className="selectItems__title" htmlFor="triger">
        Items on page
      </label>
      <div className="selectItems__container">
        <button
          className="selectItems__btn"
          type="button"
          id="triger"
          onClick={() => setIsSelectOpen(!isSelectOpen)}
          onBlur={handleBlur}
        >
          <p className="selectItems__btn--option">{currentOptionDisplay}</p>
          <div className="selectItems__btn--icon icon icon--down" />
        </button>

        {isSelectOpen && (
          <div className="selectItems__dropdown">
            <button
              className="selectItems__dropdown--item"
              type="button"
              onClick={() => handleSelectOption("All")}
            >
              All
            </button>
            <button
              className="selectItems__dropdown--item"
              type="button"
              onClick={() => handleSelectOption("4")}
            >
              4
            </button>
            <button
              className="selectItems__dropdown--item"
              type="button"
              onClick={() => handleSelectOption("8")}
            >
              8
            </button>
            <button
              className="selectItems__dropdown--item"
              type="button"
              onClick={() => handleSelectOption("16")}
            >
              16
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
