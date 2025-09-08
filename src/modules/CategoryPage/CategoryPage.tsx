import { useEffect, useState } from "react";
import { Breadcrumbs } from "../shared/components/Breadcrumbs";
import { HeaderCategory } from "./components/HeaderCategory";
import { CategoryContent } from "./components/CategoryContent";
import { Spinner } from "../shared/components/Spinner";
import { useParams } from "react-router-dom";

export const CategoryPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { categoryName } = useParams<{ categoryName: string }>();

  useEffect(() => {
    setIsLoading(true);

    const load = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false);
    };

    load();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [categoryName]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Breadcrumbs />
      <HeaderCategory />
      <CategoryContent />
    </>
  );
};
