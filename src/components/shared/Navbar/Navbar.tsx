import { LuMenu } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router";
import { RootState } from "../../../redux/store";
import { removeUser } from "../../../redux/feature/users/userSlice";
import { useIsAdminQuery } from "../../../redux/feature/users/usersApi";

const Navbar = () => {
  const { name, email } = useSelector((state: RootState) => state.user);
  const disPatch = useDispatch();
  const { data } = useIsAdminQuery(email);

  const navMenu = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/sign-up">Sign Up</NavLink></li>
      <li><NavLink to="/sign-in">Sign In</NavLink></li>
    </>
  );
  const userNav = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/all-product">Products</NavLink></li>
      <li><NavLink to="/bookmarked">Bookmarked</NavLink></li>
      <li><NavLink to="/orders">My Order</NavLink></li>
    </>
  );

  const adminNav = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/admin/admin-home">Admin</NavLink></li>
      <li><NavLink to="/vendor/ledger">Vendor</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <LuMenu />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {email ? (data?.admin ? adminNav : userNav) : navMenu}
          </ul>
        </div>
        <a className="btn btn-ghost text-[#FF3811] font-bold text-2xl">ShopSphere</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{email ? (data?.admin ? adminNav : userNav) : navMenu}</ul>
      </div>
      <div className="navbar-end">
        {name && email ? (
          <button
            onClick={() => disPatch(removeUser())}
            className="btn btn-outline btn-error"
          >
            SignOut
          </button>
        ) : (
          <Link to="/sign-in">
            <button className="btn btn-outline btn-info">SignIn</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
