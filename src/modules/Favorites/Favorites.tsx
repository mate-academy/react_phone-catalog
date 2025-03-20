import { useParams } from "react-router-dom";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs"
import "./Favorites.scss"

export const Favorites = ()=> {
    const { category } = useParams();

    console.log(category);
    
    return (
        <div className="favorites">
            <div className="favorites__container">
                <Breadcrumbs/>
                <h1 className="favorites__title title">Favourites</h1>
            </div>
        </div>
    )
}