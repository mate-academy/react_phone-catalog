import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PhoneDetailsPageProps } from "@/types/Product";

export const PhoneDetailsPage = ({ product }: PhoneDetailsPageProps) => {

    if (!product) {
        return (
            <div className="text-center font-mont text-5xl mt-20 text-text-color-base-white">
                Phone not found
            </div>
            );
        }

    return (
        <div className="px-4 sm:px-6 md:px-8 xl:px-[152px] text-text-color-base-white font-mont">
            <Breadcrumbs currentName={product.name} />

       
        </div>

    );
}