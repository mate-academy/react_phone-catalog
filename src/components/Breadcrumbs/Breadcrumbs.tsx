import { Link, useLocation } from "react-router-dom";


export const Breadcrumbs = () => {
    const location = useLocation();

    const pathnames = location.pathname.split('/').filter((x) => x);

    let accumulatedPath = '';

    return (
        <div className="flex gap-x-2 items-center mt-6 px-4 sm:px-6 md:px-8 xl:px-[152px]">
            <Link to='/'>
                <img src="icons/home.svg" alt="home" />
            </Link>
            {pathnames.map((name, index) => {
                accumulatedPath += `/${name}`;
                const isLast = index === accumulatedPath.length - 1;
                
                return (
                    <div className="flex gap-x-2" key={accumulatedPath}>
                        <img src="icons/arrow-right-dark.svg" alt="arrow-right" />
                        {isLast ? (
                            <span className="text-text-color-base-grey">{decodeURIComponent(name)}</span>
                        ): (
                            <Link to={accumulatedPath} className="hover:underline text-text-color-base-white">
                                {decodeURIComponent(name.charAt(0).toUpperCase() + name.slice(1))}
                            </Link>
                        )}
                    </div>
                );
            })}
        </div>
    );
};