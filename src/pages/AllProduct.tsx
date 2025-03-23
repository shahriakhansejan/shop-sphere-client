import { TbCoinTaka } from "react-icons/tb";
import { useAddBookmarkMutation, useGetAllProductQuery } from "../redux/feature/allProduct/allProductApi";
import { Card } from "antd";
import { useGetCategoryQuery } from "../redux/feature/categories/categoriesApi";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import BuyModal from "../components/ClientComponent/BookmarkedElement/BuyModal";

const AllProduct = () => {
  const [selectCategory, setSelectCategory ] = useState<string>('all')

  const { data: Products, isLoading } = useGetAllProductQuery({ selectCategory });
  const { data: categories } = useGetCategoryQuery();
  const [addBookmark, {isSuccess}] = useAddBookmarkMutation();

  useEffect(()=>{
    if(isSuccess){
      Swal.fire({
        title: "Successfully added to Bookmark",
        icon: "success",
        draggable: true
      });
    }
  },[isSuccess])

  if(isLoading){
    <progress className="progress w-full p-6"></progress>
  }
  
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-6">
      <select
      onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>setSelectCategory(e.target.value)}
      defaultValue={selectCategory} className="select select-sm select-primary">
  <option value="all">All Category</option>
  {
    categories?.map(category => <option value={category.category_name} key={category._id}>{category.category_name}</option>)
  }
</select>
      <h3 className="text-3xl font-bold">all product {Products?.length}</h3>
      <div className="grid grid-cols-4 gap-4">
        {Products?.map((product) => (
          <Card
            key={product._id}
            cover={<img alt="example" src={product.product_img} />}
            actions={[<p><Link to={`/product-details/${product._id}`}>View Details</Link></p>, <p onClick={()=> addBookmark(product)}>Bookmark</p>]}
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
              <BuyModal product={product}/>
              </div>
              
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
