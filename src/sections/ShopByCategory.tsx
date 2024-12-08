import { Category } from "../components/Category";
import { SectionHeader } from "../components/SectionHeader";

export const ShopByCategory = () => {
  return (
    <section className="col-[1/5] mb-[56px] sm:col-[1/13] sm:mb-[64px] xl:col-[1/25] xl:mb-[80px]">
      <SectionHeader title={'Shop by category'} hasButtons={false} />

      <Category />
    </section>
  );
}