import { CiBookmarkPlus, CiShoppingTag } from "react-icons/ci";
import {
  useAddBookmarkMutation,
  useGetAProductQuery,
} from "../redux/feature/allProduct/allProductApi";
import { useNavigate, useParams } from "react-router";
import { FaBackward } from "react-icons/fa";
import { useEffect } from "react";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useGetAProductQuery(id);

  const navigate = useNavigate();
  const [addBookmark, { isSuccess }] = useAddBookmarkMutation();

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Successfully added to Bookmark",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [isSuccess]);

  if (isLoading) {
    <progress className="progress w-full p-6"></progress>;
  }
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-6">
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={product?.product_img}
            className="w-full lg:w-1/2 rounded-lg shadow-2xl"
          />
          <div className="w-full lg:w-1/2">
            <div className="flex justify-between mb-8">
              <button className="btn btn-outline">
                <CiShoppingTag />
                Buy
              </button>
              <button
                onClick={() => addBookmark(product)}
                className="btn btn-outline"
              >
                <CiBookmarkPlus />
                Bookmark
              </button>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              {product?.product_name}
            </h1>
            <p className="py-6">{product?.description}</p>
            <span className="flex items-center gap-4 text-xl font-semibold">
              <p>Price: </p>
              <p
                className={
                  product?.discount_price
                    ? "text-red-400 line-through"
                    : "text-red-600"
                }
              >
                {product?.product_price}
              </p>
              <p className="text-red-600">{product?.discount_price}</p>
            </span>
            <div className="text-end">
              <button
                onClick={() => navigate(-1)}
                className="btn btn-active mt-10"
              >
                <FaBackward />
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
