import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { SubmitHandler, useForm } from "react-hook-form";
import moment from "moment";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useAddCategoryMutation } from "../../../redux/feature/categories/categoriesApi";



type Inputs = {
    category_name: string;
  };

const AddCategory = () => {
const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const [addCategory, { isSuccess }] = useAddCategoryMutation();
  const { name, email } = useSelector((state: RootState) => state.user);

    //   form submit
      const onSubmit: SubmitHandler<Inputs> = (data) => {
        const newCategory = {
          category_name: data.category_name,
          created_by: name,
          email: email,
          created_date: moment().format("MM-DD-YYYY"),
          active: true,
        };
        console.log(newCategory);
        addCategory(newCategory);
        const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
        modal?.close();
      };
    
      useEffect(() => {
        if (isSuccess) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully added the Category",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
        }
      }, [isSuccess, reset]);



  return (
    <div className="modal-box">
      <div className="text-end">
        <form method="dialog">
          <button className="text-2xl">X</button>
        </form>
      </div>
      <h3 className="font-bold text-lg">Add a Category</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="my-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type Category Name"
            className="input input-bordered input-info w-full"
            {...register("category_name", { required: true })}
          />
          <button className="btn btn-success">Add</button>
        </div>
        {errors.category_name && (
          <span className="text-xs m-2 text-red-500">
            Category Name is required
          </span>
        )}
      </form>
    </div>
  );
};

export default AddCategory;
