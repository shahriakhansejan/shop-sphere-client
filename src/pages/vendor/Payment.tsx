import { useEffect, useState } from "react";
import {
  useAddCashInMutation,
  useGetPaymentHistoryQuery,
  useGetVendorQuery,
} from "../../redux/feature/vendors/vendorsApi";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";

type Inputs = {
  vendor_id: string;
  note: string;
  cash_in: string;
};

const Payment = () => {
  const [currentVendor, setCurrentVendor] = useState<string>("");
  const { data: vendors } = useGetVendorQuery();
  const { data: payments } = useGetPaymentHistoryQuery(currentVendor);
  const [ addCashIn, {isSuccess} ] = useAddCashInMutation();
  

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addCashIn(data)
    reset()
  };

  useEffect(()=> {
    if(isSuccess){
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Payment Successful",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }, [isSuccess])

  return (
    <div className="my-12 bg-base-200 p-6">
      <h2 className="text-4xl text-center text-orange-500 my-12 font-bold">
        Make Payment
      </h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <span className="flex gap-2">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Select Vendor</span>
              </label>
              <select
                {...register("vendor_id", { required: true })}
                defaultValue=""
                className="select select-warning w-full"
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                  setCurrentVendor(event.target.value);
                }}
              >
                <option value="" disabled>
                  Select One
                </option>
                {vendors?.map((vendor) => (
                  <option value={vendor.vendor_id} key={vendor._id}>
                    V{vendor.vendor_id}_{vendor.name}
                  </option>
                ))}
              </select>
              {errors.vendor_id && (
                <span className="text-sm text-red-500">Select one</span>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">
                  Select Your Payment as Purchase
                </span>
              </label>
              <select
                {...register("cash_in", { required: true })}
                defaultValue=""
                className="select select-warning w-full"
              >
                <option value="" disabled>
                  Select One
                </option>
                {payments?.map((price, idx) => (
                  <option
                    key={idx}
                    value={JSON.stringify({
                      total_price: price.total_price,
                      product: price.product,
                      productId : price._id
                    })}
                  >
                    {price.total_price}
                  </option>
                ))}
              </select>
              {errors.cash_in && (
                <span className="text-sm text-red-500">Select one</span>
              )}
            </div>
          </span>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Add a Note</span>
            </label>
            <textarea
              {...register("note")}
              className="textarea textarea-warning"
              placeholder="Add Note..."
            ></textarea>
          </div>
          <div className="mt-4">
            <button className="btn btn-warning">Make Payment</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;
