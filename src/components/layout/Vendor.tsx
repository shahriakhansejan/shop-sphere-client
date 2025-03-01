import { BiSolidPurchaseTag } from "react-icons/bi";
import { IoMdAddCircleOutline, IoMdHome } from "react-icons/io";
import {
  MdLocalLibrary,
  MdOutlinePayment,
  MdWorkHistory,
} from "react-icons/md";
import { RiHome7Fill } from "react-icons/ri";
import { Link, NavLink, Outlet } from "react-router";

const Vendor = () => {
  const vendorNav = (
    <>
      <li className="flex gap-2 items-center">
        {" "}
        <MdWorkHistory /> <NavLink to='/vendor/ledger'>Ledger</NavLink>
      </li>
      <li className="flex gap-2 items-center">
        {" "}
        <MdLocalLibrary /> <NavLink to='/vendor/all-vendor'>All Vendor</NavLink>
      </li>
      <li className="flex gap-2 items-center">
        {" "}
        <IoMdAddCircleOutline />
        <NavLink to="/vendor/add-vendor">Add Vendor</NavLink>{" "}
      </li>
      <li className="flex gap-2 items-center">
        {" "}
        <BiSolidPurchaseTag />{" "}
        <NavLink to="/vendor/purchase">Product Purchase</NavLink>
      </li>
      <li className="flex gap-2 items-center">
        {" "}
        <MdOutlinePayment /> <NavLink to="/vendor/payments">Payment</NavLink>
      </li>
    </>
  );
  return (
    <div className="max-w-7xl mx-auto bg-base-300">
      <div className="flex gap-3">
        {/* Sidebar */}
        <div className="w-64 px-4 py-8 h-screen overflow-y-scroll bg-orange-400">
          <h2 className="text-3xl mb-3 text-center font-bold text-[#151515]">
            ShopSphere
          </h2>
          <h2 className="mb-10 text-xl text-center font-semibold text-[#151515]">
            --- Vendor Panel ---
          </h2>
          <div className="overflow-y-scroll border-b pb-2">
            <ul className="text-[#151515] activeNav font-semibold flex flex-col gap-2">
              {vendorNav}
            </ul>
          </div>
          <ul className="mt-12 text-[#151515] flex flex-col gap-3 font-semibold">
            <li className="flex gap-2 items-center">
              {" "}
              <RiHome7Fill />
              <Link to="/admin/admin-home">Admin</Link>
            </li>
            <li className="flex gap-2 items-center">
              {" "}
              <IoMdHome />
              <Link to="/">Home</Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 h-screen overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Vendor;
