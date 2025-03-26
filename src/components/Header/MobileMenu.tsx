import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';

type MobileMenuProps = {
    isMenuOpenNow: boolean;
    onClose: () => void;
};

export const MobileMenu = ({ isMenuOpenNow, onClose }: MobileMenuProps) => {
    if (!isMenuOpenNow) return null;

    return (
        <div className="fixed inset-0 z-50 bg-background-color-base flex flex-col justify-between transition-all animate-fadeIn sm:hidden">
            <div>
                <div className="flex items-center justify-between border-b border-[#3B3E4A] pl-6 h-12">
                    <Link to="/">
                        <img src="img/Logo.png" alt="Logo" className="h-5 w-14" />
                    </Link>
                    <button
                        className="pr-4 pl-4 h-full border-l border-[#3B3E4A]"
                        onClick={onClose}
                    >
                        <img src="icons/close.svg" alt="Menu" className="w-3 h-3" />
                    </button>
                </div>
                <nav className="flex flex-col items-center gap-6 text-xs tracking-wider font-mont uppercase leading-[11px] font-extrabold pt-8">
                    <Link to="/" className="relative hover:text-text-color-base-white group">
                        Home
                        <span className="absolute left-0 -bottom-2 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full md:-bottom-7" />
                    </Link>
                    <Link to="/phones" className="relative hover:text-text-color-base-white group">
                        Phones
                        <span className="absolute left-0 -bottom-2 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full md:-bottom-7" />
                    </Link>
                    <Link to="/tablets" className="relative hover:text-text-color-base-white group">
                        Tablets
                        <span className="absolute left-0 -bottom-2 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full md:-bottom-7" />
                    </Link>
                    <Link to="/accessories" className="relative hover:text-text-color-base-white group">
                        Accessories
                        <span className="absolute left-0 -bottom-2 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full md:-bottom-7" />
                    </Link>
                </nav>
            </div>

            <div className="flex border-t border-[#3B3E4A]">
                <Link to="/favorites" className="flex-1 flex items-center justify-center h-12 border-r border-[#3B3E4A] text-white
                                                hover:text-text-color-base-white relative group">
                    <Heart size={20} />
                    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
                </Link>
                <Link to="/cart" className="flex-1 flex items-center justify-center h-12 text-white
                                            hover:text-text-color-base-white relative group">
                    <ShoppingBag size={20} />
                    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />

                </Link>
            </div>

        </div>
    );
};
