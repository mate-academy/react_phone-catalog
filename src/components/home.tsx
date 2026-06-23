import { ProductSlider } from "./productSlider";
import { Props } from "../types";
import { Card } from "./card";
 
export const Home = ({ products,phones }: Props) => (
    <div className="home">
        <h1 className="home_title">Welcome to Nice Gadgets Store!</h1>
        <ProductSlider products={ products } />
 
        <h2 className="home_subtitle">Brand new models</h2>
        <div className="home_products">
          {phones.slice(0, 4).map(phone => (
            <Card key={ phone.id } product={ phone } />
          ))}
        </div>
    </div>
)
