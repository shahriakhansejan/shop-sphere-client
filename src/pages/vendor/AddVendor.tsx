import { SubmitHandler, useForm } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";
import { useAddNewVendorMutation } from "../../redux/feature/vendors/vendorsApi";
import { useEffect } from "react";
import Swal from "sweetalert2";

type Inputs = {
  name: string;
  email: string;
  number: string;
  address: string;
};

const AddVendor = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const [addNewVendor, { data, isSuccess }] = useAddNewVendorMutation();
  console.log(data);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addNewVendor(data);
    reset();
  };
  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully added new Vendor",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [isSuccess]);

  return (
    <div className="my-12 bg-base-200 py-12">
      <h2 className="text-4xl text-center text-orange-500 mb-6 font-bold">
        Add new Vendor
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">
              Name <span className="text-red-500">*</span>
            </span>
          </label>
          <input
            type="text"
            placeholder="Type Vendor Name"
            className="input input-bordered"
            {...register("name", { required: true })}
          />

          {errors?.name && (
            <p className="text-red-500 text-xs">Name is Required</p>
          )}
        </div>
        <span className="flex gap-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">
                Email <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="email"
              placeholder="Type Email"
              className="input input-bordered"
              {...register("email", { required: true })}
            />
            {errors?.email && (
              <p className="text-red-500 text-xs">Email is Required</p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">
                Contact Number <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="number"
              placeholder="Enter contact number"
              className="input input-bordered"
              {...register("number", {
                required: "Contact Number is Required",
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: "Contact Number must be exactly 11 digits",
                },
              })}
            />
            {errors?.number && (
              <p className="text-red-500 text-xs">{errors.number.message}</p>
            )}
          </div>
        </span>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">
              Address <span className="text-red-500">*</span>
            </span>
          </label>
          <input
            type="address"
            placeholder="Enter vendor address"
            className="input input-bordered"
            {...register("address", { required: true })}
          />
        </div>
        {errors?.address && (
          <p className="text-red-500 text-xs">Address is Required</p>
        )}
        <div className="flex justify-end mt-6">
          <button className="btn btn-primary btn-lg">
            <IoMdAdd className="text-3xl" /> Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVendor;
