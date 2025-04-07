
export const ShopByCategory = () => {

    return (
        <div className="px-[152px] mt-20 font-mont">
            <h2 className="text-[22px] sm:text-[32px] mb-6 text-white font-extrabold leading-[1.4]">
                Shop by category
            </h2>
            <div className="flex gap-4">
                <div>
                    <img src="img/Phones-ct.png" alt="category" />
                    <div className="mt-6">
                        <h3 className="font-bold text-text-color-base-white">Mobile phones</h3>
                        <p className="font-semibold text-sm leading-[21px] text-text-color-base-grey">95 models</p>
                    </div>
                </div>
                <div>
                    <img src="img/Tablets-ct.png" alt="category" />
                    <div className="mt-6">
                        <h3 className="font-bold text-text-color-base-white">Tablets</h3>
                        <p className="font-semibold text-sm leading-[21px] text-text-color-base-grey">24 models</p>
                    </div>
                </div>
                <div>
                    <img src="img/Accessories-ct.png" alt="category" />
                    <div className="mt-6">
                        <h3 className="font-bold text-text-color-base-white">Accessories</h3>
                        <p className="font-semibold text-sm leading-[21px] text-text-color-base-grey">100 models</p>
                    </div>
                </div>
            </div>
        </div>
    );
};