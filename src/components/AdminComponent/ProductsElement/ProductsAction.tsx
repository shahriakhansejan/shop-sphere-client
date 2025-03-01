import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { useGetCategoryQuery } from "../../../redux/feature/categories/categoriesApi";
import axios from "axios";
import { useDeleteProductMutation, useUpdateProductMutation } from "../../../redux/feature/products/productsApi";
import { useEffect } from "react";
import Swal from "sweetalert2";

interface Product {
  _id: string;
  product_name: string;
  category: string;
  product_price: string;
  discount_price: string;
  description: string;
  product_img: string;
}

type ProductsActionProps = {
  product: Product;
};

type Inputs = {
  product_name: string;
  category: string;
  product_price: string;
  discount_price: string;
  description: string;
  product_img: string;
  image: string;
};

const imgBB_API = import.meta.env.VITE_imgBB_API;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${imgBB_API}`;

const ProductsAction: React.FC<ProductsActionProps> = ({ product }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const { data: categories } = useGetCategoryQuery();

  const [ updateProduct, {isSuccess} ] = useUpdateProductMutation();

  const [ deleteProduct, { isSuccess: isDelete } ] = useDeleteProductMutation();
  
  
  const onSubmit = handleSubmit(async (data) => {
    let imgUrl;

    if (data.image.length) {
      const imgFile = { image: data.image[0] };
      const res = await axios.post(img_hosting_api, imgFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      imgUrl = res.data.data.display_url;
    } 
    else {
      imgUrl = product.product_img;
    }

    const updateProductData = {
      product_name: data.product_name,
      product_img: imgUrl,
      category: data.category,
      product_price: data.product_price,
      discount_price: data.discount_price,
      description: data.description,
    };

    updateProduct({id: product._id, updateProductData })
    const modal = document.getElementById(product._id) as HTMLDialogElement;
      modal?.close();
    reset();
  });

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


    const handleDelete = ( id : string ) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          deleteProduct(id);
        }
      });
    }

    useEffect(() => {
      if (isDelete) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Deleted Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }, [isDelete]);

  return (
    <div className="text-2xl flex gap-2">
      <button
        onClick={() => {
          const modal = document.getElementById(
            product._id
          ) as HTMLDialogElement;
          modal?.showModal();
        }}
        className="text-blue-400 hover:text-blue-500"
      >
        <FaEdit />
      </button>
      <button
      onClick={()=> handleDelete(product._id)}
      className="text-red-500 hover:text-red-400">
        <MdDeleteForever />
      </button>

      <dialog id={product._id} className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div className="text-end">
            <form method="dialog">
              <button className="text-2xl">X</button>
            </form>
          </div>
          <h3 className="font-bold text-center text-3xl mb-4 text-sky-400">
            Update the Product
          </h3>

          <form onSubmit={onSubmit} className="card-body">
            <span className="flex gap-2">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    Product Name <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  defaultValue={product.product_name}
                  type="text"
                  placeholder="Type Product Name"
                  className="input input-bordered"
                  {...register("product_name", { required: true })}
                />

                {errors?.product_name && (
                  <p className="text-red-500 text-xs">
                    Product Name is Required
                  </p>
                )}
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    Product Category <span className="text-red-500">*</span>
                  </span>
                </label>
                <select
                  {...register("category", { required: true })}
                  defaultValue={product.category}
                  className="select select-primary"
                >
                  <option disabled value={"default"}>
                    Select a Category
                  </option>
                  {categories
                    ?.filter((opt) => opt.active)
                    .map((opt) => (
                      <option value={opt.category_name} key={opt._id}>
                        {opt.category_name}
                      </option>
                    ))}
                </select>
                {errors?.category && (
                  <p className="text-red-500 text-xs">
                    Category Name is Required
                  </p>
                )}
              </div>
            </span>
            <span className="flex gap-2">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    Product Price <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  defaultValue={product.product_price}
                  type="number"
                  placeholder="Enter Price"
                  className="input input-bordered"
                  {...register("product_price", { required: true })}
                />
                {errors?.product_price && (
                  <p className="text-red-500 text-xs">
                    Product Price is Required
                  </p>
                )}
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Discount Price</span>
                </label>
                <input
                  defaultValue={product.discount_price}
                  type="number"
                  placeholder="Enter discount price"
                  className="input input-bordered"
                  {...register("discount_price")}
                />
              </div>
            </span>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">
                  Product Description <span className="text-red-500">*</span>
                </span>
              </label>
              <textarea
                defaultValue={product.description}
                placeholder="Product Description"
                className="textarea textarea-bordered"
                {...register("description", { required: true })}
              />
              {errors?.description && (
                <p className="text-red-500 text-xs">Description is Required</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Image</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered max-w-sm file-input-primary w-full"
                {...register("image")}
              />
            </div>
            <div className="flex justify-end mt-6">
              <button className="btn btn-primary btn-lg">
                <GrUpdate className="text-3xl" /> Update
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ProductsAction;
