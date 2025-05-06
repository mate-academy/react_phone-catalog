import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { PhoneCard } from '@/components/PhoneCard'
import { Breadcrumbs } from "../Breadcrumbs"

export const Favourties = () => {
    const favourites = useSelector((state: RootState) => state.favourites.items);

    return (
        <div className="font-mont">
            <Breadcrumbs />
            <div className="px-4 sm:px-6 md:px-8 xl:px-[152px]" >
                <h1 className="pt-10 text-text-color-base-white font-extrabold text-5xl leading-[56px] tracking-negative-1">
                    Favourites
                </h1>
                <span className="text-text-color-base-grey text-sm leading-[21px] font-semibold pt-2">
                    {favourites.length} items
                </span>
                <div className='pt-10 flex flex-wrap gap-4 '>
                    {favourites.map(product => (
                        <PhoneCard key={product.id} product={product} showDiscount />
                    ))}
                </div>
            </div>
        </div>
    );
};