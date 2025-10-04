import './banner.scss'

export const Banner = () => {
    return (
        <div className="banner">
            <div className="banner__leftside">
                <div className="banner__leftside__arrow banner__leftside__arrow--left"></div>
            </div>
            <img className='banner__img' src="../../../public/img/banner/banner.png" alt="banner image" />
            <div className="banner__rightside">
                <div className="banner__rightside__arrow banner__rightside__arrow--right"></div>
            </div>
        </div>
    );
}
