import { useParams } from "react-router-dom";
import data from '@/api/phones.json';
import { Breadcrumbs } from "@/components/Breadcrumbs";



export const PhoneDetailsPage = () => {
    const { slug } = useParams<{slug: string}>();
    const phone = data.find(p => p.id === slug);

    if (!phone) {
        return <div className="text-center font-mont text-5xl mt-20 text-text-color-base-white">Phone not found</div>
    }


    return (
        <div className="px-4 sm:px-6 md:px-8 xl:px-[152px] text-text-color-base-white font-mont">
            <Breadcrumbs />

       
        </div>

    );
}