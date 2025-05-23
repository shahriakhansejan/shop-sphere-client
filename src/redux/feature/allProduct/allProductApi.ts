import moment from "moment";
import baseApi from "../api/baseApi";

interface AllProduct {
  _id: string;
  product_name: string;
  category: string;
  product_price: string;
  discount_price: string;
  quantity: number;
  description: string;
  product_img: string;
  author_email: string;
  created_at: string;
}

interface Order {
  _id: string;
  customer_name: string;
  phone: string;
  author_email: string;
  product_name: string;
  product_id: string;
  product_img: string;
  category: string;
  product_price: string;
  discount_price: string;
  quantity: number;
  total_price: number;
  address: string;
  status: string;
  created_at: string;
}

export const allProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query<AllProduct[],{ selectCategory: string; searchText: string }>({
      query: ({ selectCategory, searchText }) =>
        `/all-product?selectCategory=${selectCategory}&searchText=${searchText}`,
    }),
    getAProduct: builder.query({
      query: (id) => `/all-product/${id}`,
    }),
    addBookmark: builder.mutation({
      query: (product) => ({
        url: "/orders",
        method: "POST",
        body: {
          customer_name: "",
          phone: "",
          author_email: localStorage.getItem("userEmail"),
          product_name: product.product_name,
          product_id: product._id,
          product_img: product.product_img,
          category: product.category,
          product_price: product.product_price,
          discount_price: product.discount_price,
          quantity: "",
          total_price: "",
          address: "",
          status: "bookmarked",
          created_at: moment().format(),
        },
      }),
      invalidatesTags: ["Order"],
    }),
    getOrder: builder.query<Order[], { email: string }>({
      query: ({ email }) => `/orders?email=${email}`,
      providesTags: ["Order"],
    }),
    removeBookmark: builder.mutation<void, string>({
      query: (id) => ({
        url: `/bookmarks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
    addBuyData: builder.mutation({
      query: (buyData) => ({
        url: "/order",
        method: "PATCH",
        body: buyData,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useGetAProductQuery,
  useAddBookmarkMutation,
  useGetOrderQuery,
  useRemoveBookmarkMutation,
  useAddBuyDataMutation,
} = allProductApi;
