import React, { useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Swal from "sweetalert2";
import { useRemoveBookmarkMutation } from "../../../../redux/feature/allProduct/allProductApi";
import moment from "moment";

interface Order {
  _id: string;
  customer_name: string;
  phone: string;
  author_email: string;
  product_name: string;
  product_id: string;
  product_img: string;
  category: string;
  product_price: string;
  discount_price: string;
  quantity: number;
  total_price: number;
  address: string;
  status: string;
  created_at: string;
}

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {

  const [removeBookmark, { isSuccess }] = useRemoveBookmarkMutation();

  const handleCancel = ( id : string ) => {
    Swal.fire({
      title: "Cancel the Order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!"
    }).then((result) => {
      if (result.isConfirmed) {
        removeBookmark(id);
      }
    });
  }

  useEffect(()=> {
    if(isSuccess){
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Order cancelled",
        showConfirmButton: false,
        timer: 1500
      });
    }
  },[isSuccess])
  

  return (
    <div className="bg-base-200 mb-6 p-4 rounded">
      <div className="flex flex-col md:flex-row justify-between gap-6 items-center">
        <span className="flex gap-3 items-center w-full md:w-1/3">
          <img
            src={
              order.product_img ||
              "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            }
            alt={order.product_name}
            className="w-20 lg:w-24 h-20 lg:h-24 rounded-box"
          />
          <h1 className="text-xl font-bold">{order.product_name}</h1>
        </span>
        <div className="w-full md:w-2/3">
          <span className="flex justify-between gap-2">
            <p>
              Quantity: {order.quantity} <br />
            </p>
            <p className="flex flex-col items-center gap-1">
              <span>Price</span> <span>${order.total_price}</span>
            </p>
            <div>
            {order.status === "pending" ? (
              <button onClick={()=>handleCancel(order._id)}
               className="btn btn-sm text-xs capitalize btn-warning">
                {order.status} <IoIosArrowDown />
              </button>
            ) : order.status === "confirmed" ? (
              <p className="font-bold capitalize text-sky-500">
                {order.status}
              </p>
            ) : (
              <p className="font-bold capitalize text-green-500">
                {order.status}
              </p>
            )}
            <p className="text-xs mt-2 font-medium">{ moment(order.created_at).format('ll')}</p>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
