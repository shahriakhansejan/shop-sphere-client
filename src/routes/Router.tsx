import { Route, Routes } from "react-router";
import Root from "../components/layout/Root";
import Home from "../pages/Home";
import Admin from "../components/layout/Admin";
import AdminHome from "../pages/admin/AdminHome";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Products from "../pages/admin/Products";
import ProductCategory from "../pages/admin/ProductCategory";
import PrivateAdmin from "./PrivateAdmin";
import Users from "../pages/admin/Users";
import AddProduct from "../pages/admin/AddProduct";
import Vendor from "../components/layout/Vendor";
import VendorHome from "../pages/vendor/VendorHome";
import AddVendor from "../pages/vendor/AddVendor";
import ProductPurchase from "../pages/vendor/ProductPurchase";
import Ledger from "../pages/vendor/Ledger";
import Payment from "../pages/vendor/Payment";
import PaymentDetails from "../components/VendorComponent/LedgerElement/PaymentDetails";
import AllVendor from "../pages/vendor/AllVendor";

const Router = () => {
  return (
    <div>
      <Routes>
        {/* Root Layout */}
        <Route element={<Root />}>
          <Route index element={<Home />} />
          <Route path="/sign-in" element={<SignIn/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
        </Route>

        {/* Admin Layout */}
        <Route path="/admin" element={<PrivateAdmin><Admin /></PrivateAdmin> }>
          <Route path="admin-home" element={<AdminHome />} />
          <Route path="products" element={<Products />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="product-category" element={<ProductCategory/>}/>
          <Route path="users" element={<Users/>}/>
        </Route>

        {/* Vendor Layout */}
        <Route path="/vendor" element={<PrivateAdmin><Vendor/></PrivateAdmin>}>
          <Route path="ledger" element={<Ledger/>}/>
          <Route path="add-vendor" element={<AddVendor/>}/>
          <Route path="purchase" element={<ProductPurchase/>}/>
          <Route path="payments" element={<Payment/>}/>
          <Route path={`payment/:vendor_id`} element={<PaymentDetails/>}/>
          <Route path="all-vendor" element={<AllVendor/>}/>
        </Route>
      </Routes>
    </div>
  );
};

export default Router;
