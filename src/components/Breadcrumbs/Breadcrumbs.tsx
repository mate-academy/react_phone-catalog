import React from "react";
import {Link, useLocation} from "react-router-dom";

export const Breadcrumbs: React.FC = () => {
  const {pathname} = useLocation();

  const pathSegments = pathname.split("/").filter(segment => segment);

  const formatedPath = pathSegments.flatMap((segment, index) => {
    if (index === pathSegments.length - 1 && segment.includes("-")) {
      return segment
        .split("-")
        .map((word, index) => {
          if (index === 1) {
            return `${word.charAt(0)}${word
              .charAt(1)
              .toUpperCase()}${word.slice(2)}`;
          } else {
            return word.charAt(0).toUpperCase() + word.slice(1);
          }
        })
        .join(" ");
    }

    return segment.charAt(0).toUpperCase() + segment.slice(1);
  });

  return (
    <div className="breadcrumbs__wrapper">
      <Link className="breadcrumbs__link" to="/">
        <img src="./img/icons/home.svg" />
      </Link>

      {formatedPath.map((segment, index) => {
        const to = `/${pathSegments.slice(0, index + 1).join("/")}`;

        const isLast = index === formatedPath.length - 1;

        return (
          <div key={`${segment}-${index}`} className="links__wrapper">
            <span className="breadcrumbs__segment">
              <img
                className="breadcrumbs__img"
                src="./img/promo/icons/arrow.svg"
              />
            </span>
            {isLast ? (
              <Link
                to={to}
                className="
                  breadcrumbs__link
                  breadcrumbs__segment__disabled
                "
              >
                {segment}
              </Link>
            ) : (
              <Link
                to={to}
                className="
                    breadcrumbs__link
                    breadcrumbs__segment
                  "
              >
                {segment}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};
