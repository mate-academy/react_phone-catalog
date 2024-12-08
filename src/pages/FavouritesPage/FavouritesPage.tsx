import { Card } from "../../components/Card";
import { PagePath } from "../../components/PagePath";
import { useAppSelector } from "../../utils/hooks";

export const FavouritesPage = () => {
  const { favourites } = useAppSelector(state => state.products);

  return (
    <div className="grids">
      <div className="col-[1/5] mx-[16px] sm:col-[1/13] sm:mx-0 xl:col-[1/25]">
        <PagePath />
        <h1 className="page-title">Favourites</h1>
        <p className="page-text-models">{`${favourites.length} items`}</p>

        {favourites.length === 0 && (
          <h1 className="page-title flex justify-center text-red-color">
            {`Your favourites is empty`}
          </h1>
        )}

        <div
          className={`mb-[56px] gap-x-[16px] gap-y-[40px] sm:mb-[64px] xl:mb-[80px]`}
        >
          <Card products={favourites} />
        </div>
      </div>
    </div>
  );
};
