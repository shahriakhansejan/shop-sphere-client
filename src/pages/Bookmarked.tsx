import { useSelector } from "react-redux";
import {
  useGetBookmarkQuery,
  useRemoveBookmarkMutation,
} from "../redux/feature/allProduct/allProductApi";
import { RootState } from "../redux/store";
import { skipToken } from "@reduxjs/toolkit/query";
import Swal from "sweetalert2";
import { useEffect } from "react";
import moment from "moment";
import BuyModal from "../components/ClientComponent/BookmarkedElement/BuyModal";

const Bookmarked = () => {
  const { email } = useSelector((state: RootState) => state.user);
  const { data: bookmarks } = useGetBookmarkQuery(
    email ? { email } : skipToken
  );

  const [removeBookmark, { isSuccess }] = useRemoveBookmarkMutation();

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Remove from Bookmark?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeBookmark(id);
      }
    });
  };

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Removed from Bookmark",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [isSuccess]);
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-6">
      <h3>All bookmarked {bookmarks?.length}</h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Action</th>
              <th>Bookmarked At</th>
            </tr>
          </thead>
          <tbody>
            {bookmarks?.map((bookmark, idx) => (
              <tr key={bookmark._id}>
                <th>{idx + 1}.</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-16 w-16">
                      <img src={bookmark.product_img} alt="Product" />
                    </div>
                  </div>
                </td>

                <td>
                  {bookmark.product_name}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {bookmark.category}
                  </span>
                </td>
                <td>
                  <span
                    className={
                      bookmark.discount_price
                        ? "text-red-400 line-through"
                        : "text-red-600"
                    }
                  >
                    {bookmark.product_price}
                  </span>
                  <br />
                  <span className="text-red-600">
                    {bookmark.discount_price}
                  </span>
                </td>
                <th>
                  <span className="flex gap-4">
                    <BuyModal product={bookmark}/>
                    <button
                      onClick={() => handleRemove(bookmark._id)}
                      className="btn btn-error btn-sm text-xs"
                    >
                      Remove
                    </button>
                  </span>
                </th>
                <td>{moment(bookmark.at).format("LL")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookmarked;
