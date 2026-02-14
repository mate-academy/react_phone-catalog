import { useState } from "react";

type Props = {
  images: string[];
};

export const Thumbnails: React.FC<Props> = ({ images }) => {
  const [activeImage, setActiveImage] = useState<string>(images[0]);
  return (
    <div className="flex flex-col sm:flex-row-reverse gap-4 lg:w-1/2 w-full">
      {/* Main image */}
      <div className="flex items-center justify-center flex-1 h-[288px] lg:h-[442px] overflow-hidden rounded-xl px-10">
        <img
          src={`/${activeImage}`}
          alt="selected"
          width="100%"
          className="h-[288px] lg:h-[442px] object-contain rounded-xl"
        />
      </div>
      {/* Thumbnails */}
      <div className="flex flex-row sm:flex-col items-center sm:justify-start gap-2">
        {images.map((img) => (
          <div className="h-13 w-13">
          <img
            key={img}
            src={`/${img}`}
            width="100%"
            alt="thumbnail"
            onClick={() => setActiveImage(img)}
            className={`h-13 w-13 object-contain border-1.5 rounded-sm cursor-pointer
              ${activeImage === img ? "border-black" : "border-gray-300"}`}
          />
          </div>

        ))}
      </div>
    </div>
  );
};
