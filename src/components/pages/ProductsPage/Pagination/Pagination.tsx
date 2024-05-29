import React, {useEffect} from "react";
import {useSearchParams} from "react-router-dom";

import classNames from "classnames";

type Props = {
  total: number;
};

export const Pagination: React.FC<Props> = ({total}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.has("page")) {
      setSearchParams(prevParams => {
        const newParams = new URLSearchParams(prevParams);

        newParams.set("page", "1");

        return newParams;
      });
    }
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);

      newParams.set("page", page.toString());
      return newParams;
    });
  };

  const currPage = Number(searchParams.get("page") || 1);
  const size = Number(searchParams.get("size") || 8);

  const totalPagiPages = Math.ceil(total / size);

  const handlePageNext = () => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);

      if (Number(prevParams.get("page")) < totalPagiPages) {
        newParams.set("page", (Number(prevParams.get("page")) + 1).toString());
      }

      return newParams;
    });
  };

  const handlePagePrev = () => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);

      if (Number(prevParams.get("page")) > 1) {
        newParams.set("page", (Number(prevParams.get("page")) - 1).toString());
      }
      return newParams;
    });
  };

  return (
    <ul className="pagi">
      <li className="pagi__prev-link" onClick={() => handlePagePrev()}>
        <img className="pagi__img" src="./img/icons/arrow.svg" alt="arrow" />
      </li>

      {Array.from({length: totalPagiPages}, (_, i) => i + 1).map(page => (
        <li
          className={classNames("pagi__link", {
            "pagi__link-active": page === currPage,
          })}
          key={page}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </li>
      ))}

      <li className="pagi__next-link" onClick={() => handlePageNext()}>
        <img
          className="pagi__img"
          src="./img/icons/arrow-right.svg"
          alt="arrow"
        />
      </li>
    </ul>
  );
};
