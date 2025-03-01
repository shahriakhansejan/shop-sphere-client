import { BiSolidCategory } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { IoMdAddCircleOutline, IoMdHome } from "react-icons/io";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { RiHome7Fill } from "react-icons/ri";
import { Link, NavLink, Outlet } from "react-router";

const Admin = () => {
  const adminNav = (
    <>
      <li className="flex gap-2 items-center"> <FaHome /> 
        <NavLink to="/admin/admin-home">Admin Home</NavLink>{" "}
      </li>
      <li className="flex gap-2 items-center"> <MdOutlineProductionQuantityLimits />
        <NavLink to="/admin/products">Products</NavLink>{" "}
      </li>
      <li className="flex gap-2 items-center"> <IoMdAddCircleOutline />
        <NavLink to="/admin/add-product">Add-Product</NavLink>{" "}
      </li>
      <li className="flex gap-2 items-center"> <BiSolidCategory />
        <NavLink to="/admin/product-category">Product Category</NavLink>{" "}
      </li>
      <li className="flex gap-2 items-center"> <HiUsers /> 
        <NavLink to="/admin/users">All Users</NavLink>{" "}
      </li>
    </>
  );
  return (
    <div className="max-w-7xl bg-base-300 mx-auto">
      <div className="flex gap-3">
        {/* Sidebar */}
        <div className="w-64 px-4 py-8 h-screen overflow-y-scroll bg-blue-400">
          <h2 className="text-3xl mb-3 text-center font-bold text-[#151515]">ShopSphere</h2>
          <h2 className="mb-10 text-xl text-center font-semibold text-[#151515]">--- Admin Panel ---</h2>
          <div className="overflow-y-scroll border-b pb-2">
            <ul className="text-[#151515] activeNav font-semibold flex flex-col gap-2">
              {adminNav}
            </ul>
          </div>
          <ul className="mt-12 text-[#151515] flex flex-col gap-3 font-semibold">
          <li className="flex gap-2 items-center"> <RiHome7Fill />
            <Link to='/vendor/ledger'>Vendor</Link></li>
          <li className="flex gap-2 items-center"> <IoMdHome />
            <Link to='/'>Home</Link></li>
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

export default Admin;
