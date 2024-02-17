import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '../../pages/Root/Root';
import HomePage from '../../pages/Home/Home';
import LoginPage from '../../pages/Login/LoginPage';
import PasswordReset from '../Login/PasswordReset';
import NewPassword from '../Login/NewPassword';
import SignupPage from '../../pages/Login/SignupPage';
import VerifyEmail from '../Signup/VerifyEmail';
import ClientRoute from '../UserProfile/ClientRoute';
import ClientPage from '../../pages/Login/ClientPage';
import OrderHistory from '../UserProfile/OrderHistory';
import InquiryHistory from '../UserProfile/InquiryHistory';
import DistributorRoute from '../Distributor/DistributorRoute';
import DistributorPage from '../../pages/Distributor/DistributorPage';
import SalesHistory from '../Distributor/SalesHistory';
import AdminRoute from '../Admin/AdminRoute';
import AdminPage from '../../pages/Admin/AdminPage';
import OrderData from '../Admin/Orders/OrderData';
import InquiryData from '../Admin/Inquiries/InquiryData';
import UserData from '../Admin/Users/UserData';
import SurveyData from '../Admin/Surveys/SurveyData';
import ProductData from '../Admin/Products/ProductData';
import Root from '../RootProductInfo/Root';
import AccessoriesPage from '../../pages/ProductsInfo/AccessoriesPage';
import CookwareSetsPage from '../../pages/ProductsInfo/CookwareSetsPage';
import WaterFiltersPage from '../../pages/ProductsInfo/WaterFiltersPage';
import ShopPage from '../../pages/Shop/ShopPage';
import ProductDetailPage from '../../pages/Shop/ProductDetailPage';
import ContactPage from '../../pages/Contact/ContactPage';
import Cart from '../Cart/Cart';
import Checkout from '../Cart/Checkout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    id: 'root',
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'password-reset', element: <PasswordReset /> },
      { path: 'new-password/:token', element: <NewPassword /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'verify-email/:token', element: <VerifyEmail /> },
      {
        path: 'user-profile',
        element: <ClientRoute />,
        children: [
          {
            path: '',
            element: <ClientPage />,
            children: [
              { path: '', element: <OrderHistory /> },
              { path: 'inquiries', element: <InquiryHistory /> },
            ],
          },
        ],
      },
      {
        path: 'distributor-profile',
        element: <DistributorRoute />,
        children: [
          {
            path: '',
            element: <DistributorPage />,
            children: [{ path: '', element: <SalesHistory /> }],
          },
        ],
      },
      {
        path: 'admin-profile',
        element: <AdminRoute />,
        children: [
          {
            path: '',
            element: <AdminPage />,
            children: [
              { path: '', element: <OrderData /> },
              { path: 'all-inquiries', element: <InquiryData /> },
              { path: 'all-users', element: <UserData /> },
              { path: 'all-surveys', element: <SurveyData /> },
              { path: 'all-products', element: <ProductData /> },
            ],
          },
        ],
      },
      {
        path: 'product-info',
        element: <Root />,
        children: [
          { path: 'accessories', element: <AccessoriesPage /> },
          { path: 'cookwaresets', element: <CookwareSetsPage /> },
          { path: 'waterfilters', element: <WaterFiltersPage /> },
        ],
      },
      { path: 'shop', element: <ShopPage /> },
      { path: 'shop/:productId', element: <ProductDetailPage /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'contact', element: <ContactPage /> },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
