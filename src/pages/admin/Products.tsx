import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { useGetProductsQuery } from "../../redux/feature/products/productsApi";
import moment from "moment";
import { useGetCategoryQuery } from "../../redux/feature/categories/categoriesApi";
import { useState } from "react";
import ProductsAction from "../../components/AdminComponent/ProductsElement/ProductsAction";
import { FaSearch } from "react-icons/fa";

const Products = () => {
  const [currentCategory, setCurrentCategory] = useState<string>("all");
  const [searchText, setSearchText] = useState<string | null>("");

  const { data: products } = useGetProductsQuery({
    currentCategory,
    searchText,
  });
  const { data: categories, isLoading } = useGetCategoryQuery();

  const handleSubmit = (text: string | null) => {
    setSearchText(text);
  };

  if (isLoading) {
    return (
      <progress className="progress progress-primary w-full mx-4"></progress>
    );
  }

  return (
    <div className="my-12">
      <h2 className="text-4xl text-center text-sky-400 mb-6 font-bold">
        All Products
      </h2>
      <div className="mt-8">
        <div className="flex justify-between mb-1">
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const searchInput = form.elements.namedItem(
                "search"
              ) as HTMLInputElement;
              handleSubmit(searchInput.value);
            }}
            className="join"
          >
            <input
              onChange={(e) => setSearchText(e.target.value)}
              name="search"
              className="input input-bordered input-sm join-item"
              placeholder="Search here..."
            />
            <button
              type="submit"
              className="btn join-item btn-sm rounded-r-full"
            >
              <FaSearch />
            </button>
          </form>
          <select
            defaultValue={currentCategory}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setCurrentCategory(e.target.value)
            }
            className="select select-primary select-sm"
          >
            <option value="all">All Category</option>
            {categories
              ?.filter((opt) => opt.active)
              .map((opt) => (
                <option value={opt.category_name} key={opt._id}>
                  {opt.category_name}
                </option>
              ))}
          </select>
        </div>
        <div className="bg-base-200 h-screen overflow-y-scroll py-6">
          <table className="table">
            {/* head */}
            <thead className="sticky top-0">
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Discount Price</th>
                <th>Author Email</th>
                <th>Quantity</th>
                <th>Created at</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products?.length ? (
                products?.map((product, idx) => (
                  <tr key={product._id}>
                    <td>{idx + 1}.</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div
                          className="avatar tooltip tooltip-right"
                          data-tip={product.description}
                        >
                          <div className="mask mask-squircle h-16 w-16">
                            <img src={product.product_img} alt="Product" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            {product.product_name}
                          </div>
                          <div className="text-sm opacity-50">
                            {product.category}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="flex items-center gap-1">
                        <FaBangladeshiTakaSign /> {product.product_price}
                      </span>
                    </td>
                    <td>
                      <span className="flex items-center gap-1">
                        <FaBangladeshiTakaSign />{" "}
                        {product?.discount_price
                          ? product.discount_price
                          : "___"}
                      </span>
                    </td>
                    <td>{product.author_email}</td>
                    <td>{product.quantity}</td>
                    <td>
                      {moment(`${product.created_at}`, "MM-DD-YYYY").format(
                        "DD MMMM YY"
                      )}
                    </td>
                    <td>
                      <ProductsAction product={product} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center py-12">
                    <h2 className="text-3xl font-bold">No item to Show.....</h2>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
