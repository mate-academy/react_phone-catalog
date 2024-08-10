import { useParams } from "react-router-dom";
import { Category } from "../types/Category";
import { NotFoundPage } from "../components/NotFoundPage";

export const ValidateCategory = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { category } = useParams();
  const validCategories = Object.values(Category);

  if (!category || !validCategories.includes(category as Category)) {
    return <NotFoundPage />;
  }

  return <>{children}</>;
}
