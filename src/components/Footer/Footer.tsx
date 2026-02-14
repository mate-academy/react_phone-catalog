import { Button } from "@heroui/react";
import { CaretUpIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-gray-200 py-10">
      <div className="max-w-[1200px] mx-auto px-4 flex flex-col gap-10 sm:gap-0 sm:flex-row sm:items-center sm:justify-between">
        {/* LEFT: Logo */}
        <Link to="/" className="text-xl font-bold text-primary">
          <img src="/img/logo.png" alt="logo" className="h-[32px]" />
        </Link>

        {/* CENTER: Links */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 text-[#89939A] text-[12px] font-mont font-extrabold">
          <Link to="https://github.com">GITHUB</Link>
          <Link to="/contacts">CONTACTS</Link>
          <Link to="/rights">RIGHTS</Link>
        </div>

        {/* RIGHT: Back to top */}
        <div className="flex justify-center items-center gap-3">
          <button onClick={scrollToTop} className="text-[12px] text-[#89939A] font-semibold cursor-pointer">
            Back to top
          </button>
          <div className="">
            <Button
              isIconOnly
              variant="bordered"
              radius="full"
              onPress={scrollToTop}
              className="w-8 h-8 min-w-8 min-h-8 p-0 border-gray-300"
            >
              <CaretUpIcon size={12} weight="bold" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};
