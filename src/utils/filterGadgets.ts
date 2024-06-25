import { Pathname } from "../enums/Pathname";
import { Products } from "../types/ContextType/Products";

 export const filterGadgets = (loc: string, prod: Products[]) => {
    switch (loc) {
      case Pathname.phones:
      const phones = [...prod].filter(phone => phone.category === "phones");
        return {
          gadgetsLen: phones.length,
          gadgets: phones,
        };
      case Pathname.tablets:
        const tablets = [...prod].filter(phone => phone.category === "tablets");
        return {
          gadgetsLen: tablets.length,
          gadgets: tablets,
        };
      case Pathname.accessories:
        const accessories = [...prod].filter(phone => phone.category === "accessories");
        return {
          gadgetsLen: accessories.length,
          gadgets: accessories,
        };
      default:
        return {
          gadgetsLen: 0,
          gadgets: [],
        };
    }
  };