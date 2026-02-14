import { Footer } from "@/components/Footer/Footer";
import { AppNavbar } from "@/components/navbar";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
  return (
    <div className="relative flex flex-col h-screen font-mont tracking-[-0.01em]">
      <AppNavbar />
      <main className="flex-grow font-mont pt-6 pb-18 bg-[#FAFBFC]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
