/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ArrowLeft from "../../../assets/icons/ArrowLeft";
import ArrowRight from "../../../assets/icons/ArrowRight";
import PaginationArray from "./PaginationArray";
import PaginationDots from "./PaginationDots";
import PaginationPage from "./PaginationPage";

type Props = {
  currentPage: number;
  pages: number;
  selectedPage: number;
  onChange: (page: number) => void;
  onChangePag: (isNext?: boolean) => void;
};

const Pagination = ({ pages, selectedPage, onChange, onChangePag }: Props) => {
  const firstPages = 2;
  const lastPages = pages - 2;
  const [curPag, setCurPag] = useState<number[]>([2, 3, 4]);

  useEffect(() => {
    const sectionStart = Math.max(0, selectedPage - 3);

    setCurPag(
      Array.from({ length: pages }, (_, i) => i)
        .filter((el) => el > 1 && el < pages)
        .splice(sectionStart, 3),
    );
    console.log(curPag);
  }, [selectedPage]);

  return (
    <section className="flex items-center justify-center gap-2">
      <PaginationArray
        array={<ArrowLeft fill="black" />}
        onChange={onChangePag}
      />
      <PaginationPage
        pageNum={1}
        selectedPage={selectedPage}
        onChange={onChange}
      />
      {pages > 5 && selectedPage > firstPages + 1 && <PaginationDots />}
      {curPag.map((v) => (
        <PaginationPage
          key={v}
          pageNum={v}
          selectedPage={selectedPage}
          onChange={onChange}
        />
      ))}
      {pages > 5 && selectedPage < lastPages && <PaginationDots />}
      <PaginationPage
        pageNum={pages}
        selectedPage={selectedPage}
        onChange={onChange}
      />
      <PaginationArray
        array={<ArrowRight fill="black" />}
        onChange={onChangePag}
        next={true}
      />
    </section>
  );
};

export default Pagination;
