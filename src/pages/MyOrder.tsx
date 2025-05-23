import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useGetOrderQuery } from "../redux/feature/allProduct/allProductApi";
import { skipToken } from "@reduxjs/toolkit/query";
import OrderDetails from "../components/ClientComponent/BookmarkedElement/MyOrder/OrderDetails";

const MyOrder = () => {
  const { email } = useSelector((state: RootState) => state.user);
  const { data: orders } = useGetOrderQuery(email ? { email } : skipToken);

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-6">
      <div className="text-center my-8">
        <h4 className="text-lg font-semibold text-primary uppercase tracking-wider">
          --- Manage Your Orders ---
        </h4>
        <h1 className="text-4xl font-bold text-base-content mt-2">My Orders</h1>
        <div className="w-20 h-1 bg-primary mx-auto mt-2 rounded-full"></div>
      </div>

      <div className="tabs tabs-boxed">
        <input
          type="radio"
          name="my_tabs_2"
          className="tab checked:underline"
          aria-label="All"
          defaultChecked
        />
        <div className="tab-content border-base-300 bg-base-100 p-5">
          {orders
            ?.filter((order) => order?.status !== "bookmarked")
            ?.sort((a, b) => b._id.localeCompare(a._id))
            ?.map((order) => (
              <OrderDetails key={order._id} order={order} />
            ))}
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          className="tab checked:bg-primary checked:text-white"
          aria-label="Pending"
        />
        <div className="tab-content border-base-300 bg-base-100 p-5">
          {orders
            ?.filter((order) => order?.status === "pending")
            ?.sort((a, b) => b._id.localeCompare(a._id))
            ?.map((order) => (
              <OrderDetails key={order._id} order={order} />
            ))}
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          className="tab checked:bg-primary checked:text-white"
          aria-label="Confirm"
        />
        <div className="tab-content border-base-300 bg-base-100 p-5">
          {orders
            ?.filter((order) => order?.status === "confirmed")
            ?.sort((a, b) => b._id.localeCompare(a._id))
            ?.map((order) => (
              <OrderDetails key={order._id} order={order} />
            ))}
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          className="tab checked:bg-primary checked:text-white"
          aria-label="Delivered"
        />
        <div className="tab-content border-base-300 bg-base-100 p-5">
          {orders
            ?.filter((order) => order?.status === "delivered")
            ?.sort((a, b) => b._id.localeCompare(a._id))
            ?.map((order) => (
              <OrderDetails key={order._id} order={order} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
