import { TbCoinTaka } from "react-icons/tb";
import {
  useAddBookmarkMutation,
  useGetAllProductQuery,
} from "../redux/feature/allProduct/allProductApi";
import { Card } from "antd";
import { useGetCategoryQuery } from "../redux/feature/categories/categoriesApi";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import BuyModal from "../components/ClientComponent/BookmarkedElement/Buy/BuyModal";
import { FaSearch } from "react-icons/fa";

const AllProduct = () => {
  const [ searchText, setSearchText ] = useState<string>("all")
  const [selectCategory, setSelectCategory] = useState<string>("all");
  const { data: Products, isLoading } = useGetAllProductQuery({
    selectCategory, searchText
  });
  const { data: categories } = useGetCategoryQuery();
  const [addBookmark, { isSuccess }] = useAddBookmarkMutation();

  console.log(searchText);
  

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

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-6">
      <div className="text-center my-8">
        <h4 className="text-lg font-semibold text-primary uppercase tracking-wider">
          --- Take as Your Need ---
        </h4>
        <h1 className="text-4xl font-bold text-base-content mt-2">
          All Products
        </h1>
        <div className="w-20 h-1 bg-primary mx-auto mt-2 rounded-full"></div>
      </div>

      <div className="flex justify-between">
      <select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setSelectCategory(e.target.value)
        }
        defaultValue={selectCategory}
        className="select select-sm select-primary"
      >
        <option value="all">All Category</option>
        {categories?.map((category) => (
          <option value={category.category_name} key={category._id}>
            {category.category_name}
          </option>
        ))}
      </select>

      <form className="join">
  <input onChange={(e)=> setSearchText(e.target.value)} className="input input-sm input-bordered border-primary join-item" placeholder="Search" />
  <button className="btn btn-sm btn-primary join-item rounded-r-full"><FaSearch /></button>
</form>
      </div>

      {/* additional part */}
      {isLoading && <progress className="progress w-full my-4 p-6"></progress>}

      {Products?.length === 0 && (
        <p className="text-center text-3xl font-semibold text-gray-500 mt-4">
          No item to show.....
        </p>
      )}

      {/* data part */}
      <div className="grid grid-cols-4 mt-2 gap-4">
        {Products?.map((product) => (
          <Card
            key={product._id}
            cover={<img alt="example" src={product.product_img} />}
            actions={[
              <p>
                <Link to={`/product-details/${product._id}`}>View Details</Link>
              </p>,
              <p onClick={() => addBookmark(product)}>Bookmark</p>,
            ]}
          >
            <div>
              <h2 className="text-xl font-semibold">{product.product_name}</h2>

              <div className="flex justify-between items-center">
                <span className="flex gap-4 items-center text-lg font-medium">
                  <p className="text-xl">
                    <TbCoinTaka />
                  </p>
                  <p
                    className={
                      product.discount_price
                        ? "text-red-400 line-through"
                        : "text-red-600"
                    }
                  >
                    {product.product_price}
                  </p>
                  <p className="text-red-600">{product.discount_price}</p>
                </span>
                <BuyModal product={product} productId={product._id} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
