import { Outlet, useParams } from "react-router-dom";
import { NotFoundPage } from "../../modules/NotFoundPage";

const allowed = new Set(["phones", "tablets", "accessories"]);

export const GuardCategory = () => {
  const { categoryName } = useParams();

  if (!categoryName || !allowed.has(categoryName)) {
    return <NotFoundPage />;
  }

  return <Outlet />;
};
