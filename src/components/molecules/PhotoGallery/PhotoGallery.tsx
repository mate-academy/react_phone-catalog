import cn from 'classnames';
import { useState } from 'react';
import type { Product } from '../../../types/Product';

// import type { Product } from '../../../types/Product';
// uncomment string upper

type Props = {
  product: Product; //change type with Product when api will be ready
  imageRef: React.RefObject<HTMLImageElement | null>;
};

type ButtonProps = {
  imageSrc: string;
  currentPhoto: string;
  setCurrentPhoto: (src: string) => void;
};

const Button = ({ imageSrc, currentPhoto, setCurrentPhoto }: ButtonProps) => (
  <button
    className={cn(
      'flex justify-center items-center min-w-0 w-full transform-gpu border border-elements p-[5%] hover-zoom',
      {
        'border-primary dark:border-white': currentPhoto === imageSrc,
      },
    )}
    onClick={() => setCurrentPhoto(imageSrc)}
  >
    <img
      src={imageSrc}
      alt={imageSrc.split('/')[2] || 'Gallery product image'}
      className={cn('object-contain w-full aspect-square')}
    />
  </button>
);

export const PhotoGallery: React.FC<Props> = ({ product, imageRef }) => {
  const [currentPhoto, setCurrentPhoto] = useState<string>(product.images[0]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 lg:grid-cols-12">
      <div className="flex md:flex-col gap-2 md:gap-4 md:col-span-1 md:row-start-1 lg:col-span-2">
        {product.images.map((image) => (
          <Button
            key={image}
            imageSrc={image}
            currentPhoto={currentPhoto}
            setCurrentPhoto={setCurrentPhoto}
          />
        ))}
      </div>
      <div className="col-span-full pb-4 md:pb-0 row-start-1 md:col-span-6 lg:col-span-10">
        <img
          ref={imageRef}
          src={currentPhoto}
          alt={product.name}
          className="object-contain block w-full aspect-square hover-zoom-small"
        />
      </div>
    </div>
  );
};
