import { SubmitHandler, useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { useUpdateCategoryMutation } from "../../../redux/feature/categories/categoriesApi";
import { useEffect } from "react";
import Swal from "sweetalert2";

interface Category {
  _id: string;
  category_name: string;
}

type CategoryActionProps = {
  category: Category;
};

type Inputs = {
  updated_name: string;
  _id: string;
};

const CategoryAction: React.FC<CategoryActionProps> = ({ category }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const [updateCategory, { isSuccess }] = useUpdateCategoryMutation();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    updateCategory({ id: category._id, updated_name: data.updated_name });
    console.log({ id: category._id, updated_name: data.updated_name });
    
    const modal = document.getElementById( category._id ) as HTMLDialogElement;
    modal?.close();
    reset();
  };

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully Updated",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [isSuccess]);

  return (
    <div className="text-2xl flex gap-2">
      <button
        onClick={() => {
          const modal = document.getElementById(
            category._id
          ) as HTMLDialogElement;
          modal?.showModal();
        }}
        className="text-blue-400 hover:text-blue-500"
      >
        <FaEdit />
      </button>

      {/* modal */}
      <dialog id={category._id} className="modal">
        <div className="modal-box">
          <div className="text-end">
            <form method="dialog">
              <button className="text-2xl">X</button>
            </form>
          </div>
          <h3 className="font-bold text-lg">Update the Category</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="my-4">
            <div className="flex gap-2">
              <input
                type="text"
                defaultValue={category.category_name}
                placeholder="Type Category Name"
                className="input input-bordered input-info w-full"
                {...register("updated_name", { required: true })}
              />
              <button className="btn btn-warning">Update</button>
            </div>
            {errors.updated_name && (
              <span className="text-xs m-2 text-red-500">
                Category Name is required
              </span>
            )}
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default CategoryAction;
