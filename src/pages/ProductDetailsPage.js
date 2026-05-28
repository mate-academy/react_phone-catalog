import { jsx as _jsx } from "react/jsx-runtime";
import { useParams } from 'react-router-dom';
export const ProductDetailsPage = () => {
    const { productId } = useParams();
    return _jsx("h1", { children: productId });
};
