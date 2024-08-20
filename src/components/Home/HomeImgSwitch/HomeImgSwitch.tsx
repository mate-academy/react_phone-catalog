import { useAppContext } from "../../../context/AppContext";

const HomeImgSwitch = () => {
  const { bannerImages, chosenBanner, handleChangeBannerImage } =
    useAppContext();

  return (
    <section className="flex flex-row justify-center gap-1">
      {bannerImages.map((el) => (
        <button
          key={el.id}
          onClick={() => handleChangeBannerImage(el.id)}
          className="grid size-6 place-items-center"
        >
          <div
            className={`h-1 w-4 duration-300 ${el.id === chosenBanner ? "bg-primary" : "bg-elem"}`}
          ></div>
        </button>
      ))}
    </section>
  );
};

export default HomeImgSwitch;
