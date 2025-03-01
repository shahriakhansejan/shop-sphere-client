import moment from "moment";
import {
  useGetCategoryQuery,
  useUpdateStatusMutation,
} from "../../redux/feature/categories/categoriesApi";
import { useEffect } from "react";
import Swal from "sweetalert2";
import AddCategory from "../../components/AdminComponent/CategoryElement/AddCategory";
import CategoryAction from "../../components/AdminComponent/CategoryElement/CategoryAction";

const ProductCategory = () => {
  const [updateStatus, { isSuccess: updateSuccess }] =
    useUpdateStatusMutation();

  const { data: categories, isLoading } = useGetCategoryQuery();

  //   updateStatus
  const handleUpdateStatus = ({
    id,
    active,
  }: {
    id: string;
    active: boolean;
  }) => {
    Swal.fire({
      title: "Update Status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatus({ id, active });
      }
    });
  };

  useEffect(() => {
    if (updateSuccess) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully Updated Status",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [updateSuccess]);

  if (isLoading) {
    return (
      <progress className="progress progress-primary w-full mx-4"></progress>
    );
  }

  return (
    <div className="my-12">
      <h2 className="text-4xl text-center text-sky-400 mb-6 font-bold">
        {" "}
        Add a New Category{" "}
      </h2>
      <div className="flex justify-end mb-2">
        <button
          onClick={() => {
            const modal = document.getElementById(
              "my_modal_1"
            ) as HTMLDialogElement;
            modal?.showModal();
          }}
          className="btn btn-info"
        >
          Add
        </button>
        <dialog id="my_modal_1" className="modal">
          <AddCategory />
        </dialog>
      </div>
      <div>
        <div className="overflow-x-auto bg-base-200 py-6">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Category_Id</th>
                <th>Category_Name</th>
                <th>Created_By</th>
                <th>Created_On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category, idx) => (
                <tr key={category._id}>
                  <th>{idx + 1}.</th>
                  <td>c{category.category_id}</td>
                  <td>{category.category_name}</td>
                  <td>
                    <span>Name: {category.created_by}</span> <br />
                    <span>@: {category.email}</span>
                  </td>
                  <td>
                    {moment(`${category.created_date}`, "MM-DD-YYYY").format(
                      "DD MMMM YY"
                    )}
                  </td>
                  <td>
                    <span className="flex items-center gap-3">
                      <CategoryAction category={category} />
                      {category.active ? (
                        <button
                          onClick={() =>
                            handleUpdateStatus({
                              id: category._id,
                              active: false,
                            })
                          }
                          title="Make Inactive?"
                          className="btn btn-sm btn-success"
                        >
                          Active
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleUpdateStatus({
                              id: category._id,
                              active: true,
                            })
                          }
                          title="Make Active?"
                          className="btn btn-sm btn-danger"
                        >
                          Inactive
                        </button>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
