import React from "react";
import { PictureSlider } from "../../components/PictureSlider";
import './HomePage.scss'
import { getHotPriceProducts, getNewModels, getPhones, getTablets, getAccessories } from "../../components/api";
import { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { ProductSlider } from "../../components/PorductSlider";

export const HomePage: React.FC = () => {
  const [hotPricesProducts, setHotPricesProducts] = useState([]);
  const [newModels, setNewModels] = useState([]);


  const [phones, setPhones] = useState([])
  const [tablets, setTablets] = useState([])
  const [accessories, setAccessories] = useState([])
  
  useEffect(() => {
    getTablets().then((response) => {setTablets(response)})
    getPhones().then((response) => {setPhones(response)})
    getHotPriceProducts().then((response) => {setHotPricesProducts(response)})
    getNewModels().then((response) => {setNewModels(response)})
    getAccessories().then((response) => {setAccessories(response)})
  }, []
  )

  return (
    <div className="Page Page_gap_big">
      <PictureSlider imgArr={[
        "img/banners/Banner.png",
        "https://htmlcolorcodes.com/assets/images/colors/red-color-solid-background-1920x1080.png",
      ]}/>

      <section>
        <ProductSlider products={hotPricesProducts} title={'Hot prices'}/>
      </section>

      <section>
      <h1 >Shop by category</h1>
        <div className='is_flex items_centered'>
          <div>
            <div className="is_relative shop-by-category-link" style={{backgroundColor: '#FCDBC1'}}>
              <Link
                to="/phones"
              >
                <img
                  alt=""
                  className="is_left is_bottom"src="img/categoriesImgs/Phones.png"
                />
              </Link>
            </div>
            <h3>Phones</h3>
            <p className="is_gray">{phones.length} models</p>
          </div>
          <div>
            <div className="is_relative  shop-by-category-link" style={{backgroundColor: '#8D8D92'}}>
              <Link
                to="/tablets"
              >
                <img
                  alt=""
                  className="is_left is_bottom" src="img/categoriesImgs/Tablets.png"
                />
              </Link>
            </div>
            <h3>Tablets</h3>
            <p className="is_gray">{tablets.length} models</p>
          </div>
          <div>
            <div className="is_relative  shop-by-category-link" style={{backgroundColor: '#973D5F'}}>
              <Link
                to="/accessories"
              >
                <img
                  alt=""
                  className="is_left is_bottom" src="img/categoriesImgs/Accessories.png"
                />
              </Link>
            </div>
            <h3>Accessories</h3>
            <p className="is_gray">{accessories.length} models</p>
          </div>
        </div>
      </section>

      <section>
        <ProductSlider products={newModels} title={'Brand new models'}/>
      </section>
    </div>
  )
}
