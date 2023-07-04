import logo from './logo.svg';
import './App.css';
import MainLayout from './components/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Coupon from './pages/Coupon';
import Product from './pages/Product';
import ProductList from './pages/ProductList';
import Customers from './pages/Customers';
import BrandList from './pages/BrandList';
import Brand from './pages/Brand';
import Category from './pages/Category';
import CategoryList from './pages/CategoryList';
import ColorList from './pages/ColorList';
import Color from './pages/Color';
import Enquiries from './pages/Enquiries';
import BlogList from './pages/BlogList';
import BlogCatList from './pages/BlogCatList';
import Orders from './pages/Orders';
import Blog from './pages/Blog';
import BlogCategory from './pages/BlogCategory';
import CouponList from './pages/CouponList';
function App() {
  return (
    <div className="bg-[#f5f5f5]">
      <BrowserRouter>
      <Routes>
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/' element={<Login />} />
        <Route path='/admin' element={<MainLayout />} >
          <Route index element={<Dashboard />} />
          <Route path='coupon' element={<Coupon />} />
          <Route path='coupon/:id' element={<Coupon />} />
          <Route path='list-coupon' element={<CouponList />} />
          <Route path='customers' element={<Customers />} />
          <Route path='product' element={<Product />} />
          <Route path='list-product' element={<ProductList />} />

          <Route path='brand' element={<Brand />} />
          <Route path='brand/:id' element={<Brand />} />
          
          <Route path='list-brand' element={<BrandList />} />
          <Route path='category' element={<Category />} />
          <Route path='category/:id' element={<Category />} />
          <Route path='list-category' element={<CategoryList />} />
          <Route path='color' element={<Color />} />
          <Route path='color/:id' element={<Color />} />
          <Route path='list-color' element={<ColorList />} />
          <Route path='enquiries' element={<Enquiries />} />
          <Route path='blog' element={<Blog />} />
          <Route path='blog-list' element={<BlogList />} />
          <Route path='blog-category-list' element={<BlogCatList />} />
          <Route path='orders' element={<Orders />} />
          <Route path='list-category' element={<CategoryList />} />
          <Route path='list-brnad' element={<BrandList />} />
          <Route path='blog-category' element={<BlogCategory />} />

          


          {/* <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='store' element={<Store />} />
          <Route path='blogs' element={<Blogs />} />
          <Route path='compare-product' element={<CompareProduct />} />
          <Route path='wishlist' element={<Wishlist />} />
          <Route path='cart' element={<Cart />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignupPage />} />
          
          <Route path='blog-details/:id' element={<SingleBlog />} />
          <Route path='product/:id' element={<SingleProduct />} />
          <Route path='privacy-policy' element={<PrivacyPolicy />} />
          <Route path='refund-policy' element={<RefundPolicy />} />
          <Route path='shipping-policy' element={<ShippingPolicy />} />
          <Route path='terms-conditions' element={<TermAndConditions />} />
          <Route path='checkout' element={<Checkout />} /> */}

        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
