import { PicturesSlider } from "@/modules/HomePage/components/PicturesSlider";


export const HomePage = () => {
    return (
      <main className="bg-background-color-base pb-20">
        <h1 className="hidden">Product Catalog</h1>
        <h1 className="text-text-color-base-white text-[30px] leading=[41px] 
        sm:text-5xl sm:leading-[56px] sm:px-6
        font-mont font-extrabold py-14 px-4  xl:px-[152px] tracking-negative-1
        ">
          Welcome to Nice Gadgets store!
        </h1>
        <PicturesSlider />
      </main>
      
    );
  };
  