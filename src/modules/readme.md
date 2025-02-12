.imgBox {
    @include setSize (100%, 100%);
    background-image: url('/public/img/banners/banner_1.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;

    @media (max-width: 1199px) {
        background-image: url('/public/img/banners/banner_tablet.svg');
    }
}