import classNames from "classnames";
import React from "react";

type Props = {
  value: boolean;
};

export const Loader: React.FC<Props> = ({value}) => (
  <div
    className={classNames("loader", {
      "loader-custom": value,
    })}
  >
    <span></span>
    <span></span>
    <span></span>
  </div>
);
