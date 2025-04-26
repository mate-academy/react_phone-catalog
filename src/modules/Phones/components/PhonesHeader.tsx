'use client'

import { Dropdown } from "@/components/Dropdown";
import { PhonesHeaderProps } from "@/types/Product";


export const PhonesHeader = ({ sortBy, setSortBy, itemsOnPage, setItemsOnPage }: PhonesHeaderProps) => {
    return (
        <div>
            <div className="mt-10 px-4 sm:px-6 md:px-8 xl:px-[152px]">
                <h1 className=" text-[32px] sm:text-5xl font-extrabold text-text-color-base-white font-mont mb-1">Mobile phones</h1>
                <p className="text-text-color-base-grey text-sm font-mont mb-6">95 models</p>

                <div className="flex gap-4">
                    <div className="flex flex-col">
                        <span className="text-text-color-base-grey font-mont font-bold text-xs mb-1">Sort by</span>
                        <Dropdown
                            options={[
                                { label: "Newest", value: "Newest" },
                                { label: "Alphabetically", value: "Alphabetically" },
                                { label: "Cheapest", value: "Cheapest" },
                            ]}
                            value={sortBy}
                            onChange={setSortBy}
                            className="w-[136px] sm:w-[187px] xl:w-[176px]"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-text-color-base-grey font-mont font-bold text-xs mb-1">Items on page</span>
                        <Dropdown
                            options={[
                                { label: "4", value: "4" },
                                { label: "8", value: "8" },
                                { label: "16", value: "16" },
                                { label: "All", value: "All" },
                            ]}
                            value={itemsOnPage}
                            onChange={setItemsOnPage}
                            className="w-[136px] xl:w-[128px] sm:w-[136px]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};