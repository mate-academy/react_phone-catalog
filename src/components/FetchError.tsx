import React from "react";

type Props = {
  title: string;
};

export const FetchError: React.FC<Props> = ({ title }) => {
  return (
    <div className="mt-[24px] sm:mt-[32px] xl:mt-[56px]">
      <h1
        className="
          page-title
          flex
          justify-center
          text-red-color
        "
      >{title}</h1>

      <img
        src="./img/product-not-found.png"
        alt="Somethings went wrong"
        className="mb-[64px] w-full xl:mb-[80px]"
      />
    </div>
  )
};