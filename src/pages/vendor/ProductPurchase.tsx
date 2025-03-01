import { useForm } from "react-hook-form";
import { BiPurchaseTag } from "react-icons/bi";
import { useGetAllProductsQuery } from "../../redux/feature/products/productsApi";
import { useAddPurchaseInfoMutation, useGetVendorQuery } from "../../redux/feature/vendors/vendorsApi";
import { useEffect } from "react";
import Swal from "sweetalert2";

type Inputs = {
    product: string;
    vendor: string;
    quantity: string;
    unit_price: string;
    note: string;
}

const ProductPurchase = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<Inputs>()

      const { data: products } = useGetAllProductsQuery();
      const { data: vendors } = useGetVendorQuery();
      const [addPurchaseInfo, {isSuccess}] = useAddPurchaseInfoMutation();
      
      

      const onSubmit = handleSubmit((data) => {
        addPurchaseInfo(data);
        reset();
      })

      useEffect(() => {
          if (isSuccess) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Successfully Purchased",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }, [isSuccess]);

  return (
    <div className="my-12 bg-base-200 pt-12">
      <h2 className="text-4xl text-center text-orange-500 mb-6 font-bold">
        Purchase Product
      </h2>
      <form onSubmit={onSubmit} className="card-body">
        <span className="flex gap-2">
        <div className="form-control w-full">
            <label className="label">
              <span className="label-text">
                Product <span className="text-red-500">*</span>
              </span>
            </label>
            <select
              {...register("product", { required: true })}
              defaultValue={"default"}
              className="select select-primary"
            >
              <option disabled value={"default"}>
                Select a product
              </option>
              {
                products?.map(product => <option key={product._id} value={product._id}> 
                    {product.product_name}
                </option>)
              }
            </select>
            {errors?.product && (
              <p className="text-red-500 text-xs">Required</p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">
                Select Vendor <span className="text-red-500">*</span>
              </span>
            </label>
            <select
              {...register("vendor", { required: true })}
              defaultValue={"default"}
              className="select select-primary"
            >
              <option disabled value={"default"}>
                Select a Vendor
              </option>
              {
                vendors?.map(vendor=> <option value={vendor.vendor_id} key={vendor._id}>
                        V{vendor.vendor_id}_
                        {vendor.name}
                </option>)
              }
            </select>
            {errors?.vendor && (
              <p className="text-red-500 text-xs">Required</p>
            )}
          </div>
        </span>
        <span className="flex gap-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">
              Quantity <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="number"
              defaultValue={1}
              placeholder="Add quantity"
              className="input input-bordered"
              {...register("quantity", { required: true })}
            />
            {errors?.quantity && (
              <p className="text-red-500 text-xs">Product Price is Required</p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Unit Price</span>
            </label>
            <input
              type="number"
              placeholder="Enter price per unit"
              className="input input-bordered"
              {...register("unit_price",{ required: true })}
            />
            {errors?.unit_price && (
              <p className="text-red-500 text-xs">Unit Price is Required</p>
            )}
          </div>
        </span>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">
              Add a note
            </span>
          </label>
          <textarea
            placeholder="Type a Note"
            className="textarea textarea-bordered"
            {...register("note")}
          />
        </div>
        <div className="flex justify-end mt-6">
          <button className="btn btn-warning btn-lg">
          <BiPurchaseTag className="text-3xl" /> Purchase
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductPurchase;
