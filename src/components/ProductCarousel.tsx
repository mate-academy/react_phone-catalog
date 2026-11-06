import { Phone, Product } from '../interface/Product';

interface ProductCarouselProps {
  product: Product;
  realProduct: Phone;
  imageActive: number;
  setImageActive: React.Dispatch<React.SetStateAction<number>>;
  setCurrentImage: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ProductCarousel = ({
  product,
  realProduct,
  imageActive,
  setImageActive,
  setCurrentImage,
}: ProductCarouselProps) => {
  return (
    <div className="product__carousel">
      {realProduct.images?.map((image: string, i: number) => (
        <div
          key={i}
          className={
            imageActive === i ? 'product__item active' : 'product__item'
          }
          onClick={() => {
            setImageActive(i);
            setCurrentImage(realProduct.images?.[i]);
          }}
        >
          <img
            src={`${import.meta.env.VITE_PUBLIC_URL}/${image}`}
            alt={`${product.name} ${i + 1}`}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductCarousel;
