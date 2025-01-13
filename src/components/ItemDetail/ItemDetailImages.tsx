type Props = {
  images: string[];
  currentImage: string;
  chosenImage: number;
  onClick: (i: number) => void;
};

const ItemDetailImages = ({
  images,
  currentImage,
  onClick,
  chosenImage,
}: Props) => {
  return (
    <div className="flex flex-col-reverse gap-4 small:flex-row">
      <div className="flex w-fit gap-4 small:flex-col">
        {images.map((image, i) => (
          <div
            className={`flex aspect-square size-12 items-center justify-center rounded-lg border-1 p-2 desktop:size-20 ${chosenImage === i ? "border-primary" : "cursor-pointer border-elem"}`}
          >
            <img
              key={i}
              src={image}
              alt=""
              onClick={() => onClick(i)}
              className={`grid size-full place-items-center items-center object-contain duration-150`}
            />
          </div>
        ))}
      </div>
      <div className="grid aspect-square w-fit place-items-center">
        <img src={currentImage} alt="" className="size-full object-contain" />
      </div>
    </div>
  );
};

export default ItemDetailImages;
