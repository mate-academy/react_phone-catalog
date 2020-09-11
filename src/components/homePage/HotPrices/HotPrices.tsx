import React from 'react';
import MiniSlider from "../MiniSlider/MiniSlider";

type Props = {
  gadgets: Gadget[];
};

const HotPrices: React.FC<Props> = ({ gadgets }) => {
  const hotPriceGadgets = gadgets
    .filter((gadget: Gadget) => gadget.discount !== 0)
    .sort((a: Gadget, b: Gadget) => (b.discount * b.price / 100) - (a.discount * a.price / 100));

  return (
    <MiniSlider gadgets={hotPriceGadgets} name="Hot prices"/>
  )
};

export default HotPrices;
