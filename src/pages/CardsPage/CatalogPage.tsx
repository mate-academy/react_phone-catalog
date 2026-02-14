import SortDropdown from "@/components/SortDropdown/SortDropdown";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { CaretDownIcon } from "@phosphor-icons/react";
import { ProductsContext } from "@/store/ProductsContext";

import { useContext, useMemo, useState } from "react";

import { Pagination } from "@heroui/react";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";

const PER_PAGE_OPTIONS = ["4", "8", "16", "all"] as const;

interface Props {
  title: string;
  category: "phones" | "tablets" | "accessories";
}

type SortValue = "age" | "alpha" | "price";

export const CatalogPage: React.FC<Props> = ({ title, category }) => {
  const { products } = useContext(ProductsContext);
  const [searchParams] = useSearchParams();
  const [params, setParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const sortBy = (searchParams.get("sort") as SortValue) || "age";

  const sortedProducts = useMemo(() => {
    const sorted = products.filter((product) => product.category === category);

    switch (sortBy) {
      case "price":
        return sorted.sort((a, b) => a.price - b.price);
      case "alpha":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "age":
      default:
        return sorted.sort((a, b) => b.year - a.year);
    }
  }, [products, sortBy, category]);

  const modelsAmount = sortedProducts.length;
  const pageParam = Number(params.get("page")) || 1;
  const perPageParam = params.get("perPage") ?? "all";

  const page = Math.max(pageParam, 1);
  const perPage = PER_PAGE_OPTIONS.includes(perPageParam as any)
    ? perPageParam
    : "all";

  // ---- derive paging ----
  const perPageNumber =
    perPage === "all" ? sortedProducts.length : Number(perPage);

  const totalPages =
    perPage === "all"
      ? 1
      : Math.max(1, Math.ceil(sortedProducts.length / perPageNumber));

  const currentPage = Math.min(page, totalPages);

  const start = (currentPage - 1) * perPageNumber;

  const visibleProducts =
    perPage === "all"
      ? sortedProducts
      : sortedProducts.slice(start, start + perPageNumber);

  // ---- helpers to sync URL ----
  const updateParams = (next: { page?: number; perPage?: string }) => {
    const newParams = new URLSearchParams(params);

    if (next.perPage) {
      // reset page on perPage change
      if (next.perPage !== "all") newParams.set("perPage", next.perPage);
      else newParams.delete("perPage");

      newParams.delete("page"); // reset to 1 by default
    }

    if (next.page !== undefined) {
      if (next.page > 1) newParams.set("page", String(next.page));
      else newParams.delete("page");
    }

    setParams(newParams, { replace: true });
  };

  const handlePageChange = (value: number) => {
    updateParams({ page: value });
  };

  const handlePerPageChange = (value: string) => {
    updateParams({ perPage: value });
  };

  const label = perPage === "4" ? "4" : perPage === "8" ? "8" : "16";

  return (
    <div className="px-6 xl:px-[152px]">
      <Breadcrumb />
      <h1 className="text-[32px] sm:text-5xl tracking-[-0.01em] font-bold mb-3">
        {title}
      </h1>

      <div className="flex flex-wrap justify-between items-center mb-10">
        <p className="text-gray-400 text-[14px]">{modelsAmount} models</p>
      </div>

      <div className="flex gap-5">
        <SortDropdown />
        <div className="flex flex-col gap-1">
          <p className="text-[#89939A] font-semibold text-[10px]">
            Items on page
          </p>
          <Dropdown onOpenChange={setIsOpen}>
            <DropdownTrigger>
              <Button
                variant="bordered"
                className="w-[136px] justify-between border-gray-200 hover:border-gray-950 rounded-small"
                endContent={
                  <CaretDownIcon
                    size={13}
                    color="#B4BDC3"
                    className={`
                    ${isOpen ? "rotate-180" : "rotate-0"}
                  `}
                  />
                }
              >
                {label}
              </Button>
            </DropdownTrigger>

            <DropdownMenu
              aria-label="Sort options"
              selectionMode="single"
              selectedKeys={[perPage]}
              onSelectionChange={(keys) =>
                handlePerPageChange(Array.from(keys)[0] as string)
              }
            >
              <DropdownItem key="4">4</DropdownItem>
              <DropdownItem key="8">8</DropdownItem>
              <DropdownItem key="16">16</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <div className="flex flex-col py-6 gap-8">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        {/* Pagination — shown only if >1 page */}
        <div className="flex items-center justify-center">
          {totalPages > 1 && (
            <Pagination
              page={currentPage}
              total={totalPages}
              siblings={1}
              boundaries={1}
              showControls
              radius="full"
              variant="bordered"
              classNames={{
                cursor:
                  "bg-linear-to-b shadow-lg from-default-500 to-default-800 dark:from-default-300 dark:to-default-100 text-white font-bold",
              }}
              onChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};
