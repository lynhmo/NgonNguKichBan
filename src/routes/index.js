import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
        isShowFooter: true,
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true,
        isShowFooter: true,

    },
    {
        path: '/product',
        page: ProductsPage,
        isShowHeader: true,
        isShowFooter: true,
    },
    {
        path: '*',
        page: NotFoundPage,
        // isShowHeader: false,
        // 404 page 
    },
]