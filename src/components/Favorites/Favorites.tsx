// import { useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import ProductsList from "../../UI/ProductsList";

const Favorites = () => {
  const { favorite } = useAppContext();

  // const location = useLocation();

  return (
    <section className="mb-20 flex w-full flex-col gap-20 pt-6 small:pt-8 desktop:pt-16">
      <section className="mb-14 flex flex-col gap-2">
        <h1>Favorites</h1>
        {favorite.length ? (
          <p className="text-bodyText text-sec">{`${favorite.length} models`}</p>
        ) : (
          <p className="text-bodyText text-sec">
            No favorite items =( Sure you can find one
          </p>
        )}
      </section>
      {!!favorite.length && <ProductsList products={favorite} />}
    </section>
  );
};

export default Favorites;
