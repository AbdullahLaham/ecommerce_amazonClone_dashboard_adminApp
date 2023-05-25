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

function App() {
  return (
    <div className="">
      <BrowserRouter>
      <Routes>
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/' element={<Login />} />
        <Route path='/admin' element={<MainLayout />} >
          <Route index element={<Dashboard />} />
          <Route path='coupon' element={<Coupon />} />
          <Route path='customers' element={<Customers />} />
          <Route path='product' element={<Product />} />
          <Route path='list-product' element={<ProductList />} />

          <Route path='brand' element={<Brand />} />
          <Route path='list-brand' element={<BrandList />} />
          <Route path='category' element={<Category />} />




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
