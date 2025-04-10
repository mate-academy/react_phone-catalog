import { Link } from "react-router-dom";

export const ShopByCategory = () => {

    return (
        <div className="xl:px-[152px] lg:px-8 sm:px-6 px-4 mt-20 font-mont">
            <h2 className="text-[22px] sm:text-[32px] text-text-color-base-white font-extrabold leading-[1.4]">
                Shop by category
            </h2>
            <div className="flex flex-col items-center sm:flex-row sm:gap-4">
                <div className="mt-6">
                    <Link to=''>
                        <img src="img/Phones-ct.png" alt="category" className="transition-transform rounded-xl duration-300 hover:scale-105" />
                    </Link>
                    <div className="pt-6">
                        <h3 className="font-bold text-text-color-base-white">Mobile phones</h3>
                        <p className="font-semibold text-sm leading-[21px] text-text-color-base-grey">95 models</p>
                    </div>
                </div>
                <div className="mt-6">
                    <Link to=''>
                        <img src="img/Tablets-ct.png" alt="category" className="transition-transform rounded-xl duration-300 hover:scale-105" />
                    </Link>
                    <div className="pt-6">
                        <h3 className="font-bold text-text-color-base-white">Tablets</h3>
                        <p className="font-semibold text-sm leading-[21px] text-text-color-base-grey">24 models</p>
                    </div>
                </div>
                <div className="mt-6">
                    <Link to=''>
                        <img src="img/Accessories-ct.png" alt="category" className="transition-transform rounded-xl duration-300 hover:scale-105" />
                    </Link>
                    <div className="pt-6">
                        <h3 className="font-bold text-text-color-base-white">Accessories</h3>
                        <p className="font-semibold text-sm leading-[21px] text-text-color-base-grey">100 models</p>
                    </div>
                </div>
            </div>
        </div>
    );
};