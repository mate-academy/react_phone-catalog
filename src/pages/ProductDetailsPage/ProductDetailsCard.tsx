import { getProductDetails, TCategory } from "@/api/api";
import { ProductDetails } from "@/types/ProductDetails";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@heroui/button";
import { HeartStraightIcon } from "@phosphor-icons/react";
import { useFavourites } from "@/store/FavouritesContext";
import { Thumbnails } from "@/components/Thumbnails/Thumbnails";
import { useCart } from "@/store/CartContext";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { MayLike } from "@/components/MayLike/MayLike";
import { ProductsContext } from "@/store/ProductsContext";
import { useLocation } from "react-router-dom";

export const ProductDetailsCard = () => {
  const { products } = useContext(ProductsContext);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [color, setColor] = useState<string | undefined>(product?.color);
  const [capacity, setCapacity] = useState<string | undefined>(
    product?.capacity
  );
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  const { addToCart, cartItems } = useCart();
  const { isFavourite, toggleFavourite } = useFavourites();
  const { productId, category } = useParams<{
    productId: string;
    category: TCategory;
  }>();

  const inCartProductCounts = useMemo(() => {
    if (!product) return false;

    return cartItems[product.id];
  }, [product?.id, cartItems]);

  const fav = productId ? isFavourite(productId) : false;

  useEffect(() => {
    const runApiCall = async () => {
      if (!productId || !category) {
        setProduct(null);
        setNotFound(true);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setNotFound(false);
      setProduct(null);
      setColor(undefined);
      setCapacity(undefined);

      const data = await getProductDetails({
        productId,
        category,
      });

      if (data) {
        setProduct(data);
        setColor(data.color);
        setCapacity(data.capacity);
        setNotFound(false);
      } else {
        setNotFound(true);
      }

      setIsLoading(false);
    };

    runApiCall();
  }, [productId, category]);

  const sortedProducts = useMemo(() => {
    if (!product || products.length === 0) return [];
  
    return products.filter(
      (p) =>
        p.category === category &&
        p.itemId !== productId
    );
  }, [products, productId, category, product]);
  

  const onFavorite = useCallback(() => {
    if (!productId) return;

    toggleFavourite(productId);
  }, [productId]);

  if (isLoading) {
    return (
      <div className="px-6 xl:px-[152px] py-16">
        <p className="text-[#89939A]">Loading...</p>
      </div>
    );
  }

  if (!product || notFound) {
    return (
      <div className="px-6 xl:px-[152px] min-h-screen flex flex-col justify-center py-16">
        <div className="max-w-[360px] mb-6">
          <img
            src="/img/product-not-found.png"
            alt="Product not found"
            className="w-full h-auto"
          />
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-[#0F0F11] mb-4">
          Product was not found
        </h1>
        <p className="text-[#89939A] mb-6">
          The product you are looking for doesn&apos;t exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center h-10 px-4 rounded-full border border-gray-300 text-[#0F0F11] hover:border-gray-400"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 xl:px-[152px] bg-[#FAFBFC]">
      <Breadcrumb />
      <h1 className="font-bold text-[22px] sm:text-[32px]">{product.name}</h1>
      <div className="flex flex-col sm:flex-row gap-12 mt-8">
        {product && <Thumbnails images={product.images} />}
        <div className="lg:w-1/2 w-full">
          <div className="flex">
            <div className="flex flex-col w-full xl:w-3/4">
              {/* COLORS */}
              <div className="pb-6 mb-6 border-b-2 border-gray-200">
                <div className="flex justify-between">
                  <h3 className="text-sm font-semibold text-[#89939A] mb-2">
                    Available colors
                  </h3>
                  <div className="flex xl:hidden">
                    <p className="text-[#B4BDC3] text-[12px]">ID:123456</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  {product.colorsAvailable.map((colorValue) => (
                    <label key={colorValue} className="relative block">
                      <input
                        type="radio"
                        name="color"
                        value={colorValue}
                        checked={color === colorValue}
                        onChange={() => setColor(colorValue)}
                        className="peer hidden"
                      />

                      <span
                        className="
                          block w-7 h-7 rounded-full cursor-pointer border-2 shadow-[inset_0_0_0_2px_#ffffff]
                          border-gray-300
                          peer-checked:border-black
                          peer-checked:shadow-[inset_0_0_0_2px_#ffffff]
                          transition
                        "
                        style={{ backgroundColor: colorValue }}
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* CAPACITY */}
              <div className="pb-6 mb-10 border-b-2 border-gray-200">
                <h3 className="text-sm text-gray-500 mb-2">Select capacity</h3>
                <div className="flex gap-3">
                  {product.capacityAvailable.map((cap) => (
                    <div key={cap}>
                      <input
                        type="radio"
                        name="capacity"
                        value={cap}
                        checked={capacity === cap}
                        onChange={() => setCapacity(cap)}
                        className="peer hidden"
                      />
                      <div
                        className="
                    block px-4 py-2 rounded-md border-2 cursor-pointer
                    border-gray-300
                    peer-checked:border-black
                    peer-checked:bg-black
                    peer-checked:text-white
                  "
                        onClick={() => setCapacity(cap)}
                      >
                        {cap}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PRICE */}
              <div className="mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-[32px] font-bold">
                    ${product.priceDiscount}
                  </span>
                  <span className="text-lg line-through text-gray-400">
                    ${product.priceRegular}
                  </span>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-between gap-3 mb-6">
                {inCartProductCounts ? (
                  <Button
                    variant="bordered"
                    radius="full"
                    disabled
                    className="h-12 w-full bg-white text-[#4219d0] text-[14px]"
                    onPress={() => addToCart(product.id)}
                  >
                    Added to cart
                  </Button>
                ) : (
                  <Button
                    variant="bordered"
                    radius="full"
                    className="h-12 w-full bg-[#4219d0] text-white text-[14px]"
                    onPress={() => addToCart(product.id)}
                  >
                    Add to Card
                  </Button>
                )}
                <Button
                  isIconOnly
                  variant="bordered"
                  radius="full"
                  className="min-w-12 min-h-12 border-gray-300"
                  onPress={onFavorite}
                >
                  {fav ? (
                    <HeartStraightIcon
                      size={18}
                      color="#f4ba47"
                      weight="fill"
                    />
                  ) : (
                    <HeartStraightIcon size={18} weight="bold" />
                  )}
                </Button>
              </div>

              {/* SHORT SPECS */}
              <div className="space-y-3 border-t-gray-500 pt-4 text-[12px] font-semibold">
                <div className="flex justify-between">
                  <span className="text-[#89939A]">Screen</span>
                  <span className="text-[#0F0F11]">{product.screen}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#89939A]">Resolution</span>
                  <span className="text-[#0F0F11]">{product.resolution}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#89939A]">Processor</span>
                  <span className="text-[#0F0F11]">{product.processor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#89939A]">RAM</span>
                  <span className="text-[#0F0F11]">{product.ram}</span>
                </div>
              </div>
            </div>
            <div className="hidden xl:flex xl:justify-end xl:w-1/4">
              <p className="text-[#B4BDC3] text-[12px]">ID:123456</p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM — ABOUT + TECH SPECS */}
      <div className="flex flex-col lg:flex-row gap-16 mt-16 text-[#89939A] text-sm">
        {/* LEFT — ABOUT */}
        <div className="lg:w-1/2 w-full flex flex-col gap-6">
          <h2 className="text-xl text-[#0F0F11] font-semibold pb-4 border-b-2 border-gray-200">
            About
          </h2>
          {product.description.map((desc, i) => (
            <div key={i} className="flex flex-col gap-2">
              <h3 className="text-[16px] text-[#0F0F11] font-semibold">
                {desc.title}
              </h3>
              <p className="text-sm leading-[21px]">{desc.text}</p>
            </div>
          ))}
        </div>

        {/* RIGHT — TECH SPECS */}
        <div className="lg:w-1/2 w-full flex flex-col gap-6">
          <h2 className="text-xl text-[#0F0F11] font-semibold pb-4 border-b-2 border-gray-200">
            Tech specs
          </h2>

          <div className="flex justify-between">
            <span>Screen</span>
            <span className="text-[#0F0F11]">{product.screen}</span>
          </div>

          <div className="flex justify-between">
            <span>Resolution</span>
            <span className="text-[#0F0F11]">{product.resolution}</span>
          </div>

          <div className="flex justify-between">
            <span>Processor</span>
            <span className="text-[#0F0F11]">{product.processor}</span>
          </div>

          <div className="flex justify-between">
            <span>RAM</span>
            <span className="text-[#0F0F11]">{product.ram}</span>
          </div>

          <div className="flex justify-between">
            <span>Camera</span>
            <span className="text-[#0F0F11]">{product.camera}</span>
          </div>

          <div className="flex justify-between">
            <span>Zoom</span>
            <span className="text-[#0F0F11]">{product.zoom}</span>
          </div>

          <div className="flex justify-between">
            <span>Cell</span>
            <span className="text-[#0F0F11]">{product.cell}</span>
          </div>
        </div>
      </div>
      <div className="mt-20">
        {sortedProducts.length > 0 && (
          <MayLike products={sortedProducts} />
        )}
      </div>
    </div>
  );
};
