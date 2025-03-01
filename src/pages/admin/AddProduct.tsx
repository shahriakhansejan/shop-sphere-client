import { IoMdAdd } from "react-icons/io";
import { useGetCategoryQuery } from "../../redux/feature/categories/categoriesApi";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import moment from "moment";
import { useAddNewProductMutation } from "../../redux/feature/products/productsApi";
import Swal from "sweetalert2";
import { useEffect } from "react";

type Inputs = {
  product_name: string;
  category: string;
  product_price: string;
  discount_price: string;
  description: string;
  image: string;
};

const imgBB_API = import.meta.env.VITE_imgBB_API;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${imgBB_API}`

const AddProduct = () => {
  const { data: categories } = useGetCategoryQuery();
  const {email} = useSelector((state: RootState)=> state.user);
  const [addNewProduct, {isSuccess}] = useAddNewProductMutation();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = handleSubmit(async (data) => {
    const imgFile = {image: data.image[0]}
    const res = await axios.post(img_hosting_api, imgFile, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
    if(res.data.success){
        const newProduct = {
            product_name: data.product_name,
            product_img: res.data.data.display_url,
            category: data.category,
            product_price: data.product_price,
            discount_price: data.discount_price,
            quantity : 0,
            description: data.description,
            author_email: email,
            created_at: moment().format("MM-DD-YYYY")
        }
       addNewProduct(newProduct);
       reset();
    }
  });

  useEffect(() => {
      if (isSuccess) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully added the Product",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }, [isSuccess]);

  return (
    <div className="bg-base-200 mx-3 my-12 pt-12">
      <h2 className="text-4xl text-center text-sky-400 mb-6 font-bold">
        Add a Product
      </h2>
      <form onSubmit={onSubmit} className="card-body">
        <span className="flex gap-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">
                Product Name <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="Type Product Name"
              className="input input-bordered"
              {...register("product_name", { required: true })}
            />

            {errors?.product_name && (
              <p className="text-red-500 text-xs">Product Name is Required</p>
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
              defaultValue={"default"}
              className="select select-primary"
            >
              <option disabled value={"default"}>
                Select a Category
              </option>
              {categories?.filter(opt => opt.active).map((opt) => (
                <option value={opt.category_name} key={opt._id}>
                  {opt.category_name}
                </option>
              ))}
            </select>
            {errors?.category && (
              <p className="text-red-500 text-xs">Category Name is Required</p>
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
              type="number"
              placeholder="Enter Price"
              className="input input-bordered"
              {...register("product_price", { required: true })}
            />
            {errors?.product_price && (
              <p className="text-red-500 text-xs">Product Price is Required</p>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Discount Price</span>
            </label>
            <input
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
            <span className="label-text">
              Product Image <span className="text-red-500">*</span>
            </span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered max-w-sm file-input-primary w-full"
            {...register("image", { required: true })}
          />
        </div>
        <div className="flex justify-end mt-6">
          <button className="btn btn-primary btn-lg">
            <IoMdAdd className="text-3xl" /> Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
