import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useAddBuyDataMutation, useRemoveBookmarkMutation } from "../../../redux/feature/allProduct/allProductApi";
import Swal from "sweetalert2";

interface BuyModalProps {
  product: {
    _id: string;
    product_name: string;
    category: string;
    product_price: string;
    discount_price: string;
    quantity: number;
    description: string;
    product_img: string;
    author_email: string;
    at: string;
  };
}

type FormValues = {
  customer_name: string;
  phone: number;
  email: string;
  address: string;
};

const BuyModal: React.FC<BuyModalProps> = ({ product }) => {
  const handleCancel = (id: string) => {
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    modal?.close();
  };

  const handleModal = (id: string) => {
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    modal?.showModal();
  };

  const [totalPrice, setTotalPrice] = useState<number>(
    parseInt(
      product.discount_price ? product.discount_price : product.product_price
    )
  );
  const [quantity, setQuantity] = useState<number>(1);

  const handlePrice = (quantity: number) => {
    setQuantity(quantity);
    setTotalPrice(
      quantity *
        parseInt(
          product.discount_price
            ? product.discount_price
            : product.product_price
        )
    );
  };

  const { email } = useSelector((state: RootState) => state.user);
  const [addBuyData, {isSuccess}] = useAddBuyDataMutation();
  const [removeBookmark] = useRemoveBookmarkMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => {
    const buyData = {
      customer_name: data.customer_name,
      product_name: product.product_name,
      product_id: product._id,
      phone: data.phone,
      email: data.email,
      quantity: quantity,
      total_price: totalPrice,
      address: data.address,
      status: "pending",
      at: moment().format(),
    };
    addBuyData(buyData); 
    handleCancel(product._id)  
  });

  useEffect(()=>{
    if(isSuccess){
      // removeBookmark(product._id)
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Order Placed Successfully",
        showConfirmButton: false,
        timer: 1500
      });
      reset();
    }
  },[isSuccess, reset, product?._id, removeBookmark ])

  return (
    <div>
      <button
        onClick={() => handleModal(product._id)}
        className="btn btn-soft text-xs btn-warning btn-sm"
      >
        Buy
      </button>

      <dialog id={product._id} className="modal">
        <div className="modal-box max-w-3xl text-[#4169E1] w-11/12">
          <div className="text-end text-xl text-red-500">
            <button onClick={() => handleCancel(product._id)}>X</button>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">
              Product : {product.product_name}
            </h2>
            <div className="font-semibold">
              <form onSubmit={onSubmit}>
                <div className="flex flex-col gap-1 mb-4">
                  <label>Name</label>
                  <input
                    placeholder="Type Your Name"
                    type="text"
                    className="input input-primary"
                    {...register("customer_name", {
                      required: "Name is required",
                    })}
                  />
                  {errors?.customer_name && (
                    <p className="text-xs text-red-500">
                      {errors.customer_name.message}
                    </p>
                  )}
                </div>
                <span className="flex flex-col md:flex-row gap-4">
                  <div className="flex flex-col gap-1 mb-4 w-full">
                    <label>Phone</label>
                    <input
                      placeholder="Enter phone Number"
                      type="number"
                      className="input input-primary"
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9]{11}$/,
                          message: "Phone number must be 11 character",
                        },
                      })}
                    />
                    {errors?.phone && (
                      <p className="text-xs text-red-500">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 mb-4 w-full">
                    <label>Email</label>
                    <input
                      placeholder="Type your Email"
                      type="email"
                      defaultValue={email ?? ""}
                      className="input input-primary"
                      {...register("email", { required: "Email is required" })}
                    />
                    {errors?.email && (
                      <p className="text-xs text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </span>
                <span className="flex flex-col md:flex-row gap-4">
                  <div className="flex flex-col w-full gap-1 mb-4">
                    <label>Quantity</label>

                    <input
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handlePrice(Number(e.target.value) || 1)
                      }
                      defaultValue={1}
                      placeholder="Add quantity"
                      type="number"
                      className="input input-primary"
                    />
                  </div>
                  <div className="flex flex-col gap-1 mb-4">
                    <label>Price</label>
                    <h3 className="border border-primary py-2 px-6 rounded-lg text-lg">
                      {totalPrice}
                    </h3>
                  </div>
                </span>
                <div className="flex flex-col gap-1 mb-4">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="Enter your address"
                    className="input input-primary"
                    {...register("address", {
                      required: "Address is required",
                    })}
                  />
                  {errors?.address && (
                    <p className="text-xs text-red-500">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                <button className="btn btn-primary w-full">Place Order</button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default BuyModal;
